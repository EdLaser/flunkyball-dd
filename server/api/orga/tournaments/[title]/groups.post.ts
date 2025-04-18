import { z } from "zod";

const createGroupsSchema = z.array(
  z.object({
    group: z.string(),
    teams: z.array(
      z.object({
        name: z.string(),
        publicID: z.string(),
        players: z.array(
          z.object({
            firstName: z.string(),
            lastName: z.string(),
          })
        ),
      })
    ),
  })
);

const finalizeQuery = z.object({
  finalize: z.boolean().optional(),
});

export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);

  const { data: query } = await getValidatedQuery(
    event,
    finalizeQuery.safeParse
  );

  const { data: body, success: successBody } = await readValidatedBody(
    event,
    createGroupsSchema.safeParse
  );

  if (!successBody) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid group data",
    });
  }

  const { registrations, stages, tournamentId } = await $fetch(
    `/api/orga/tournaments/${title}/registrations`
  );
  const groupStageId = stages.find(
    (stage) => stage.stage_name === "group"
  )?.stage_id;

  if (!groupStageId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Group stage not found",
    });
  }

  if (registrations.length !== body.length) {
    // Find teams in data that aren't in registrations
    const missingTeams = body.flatMap((group) =>
      group.teams.filter(
        (team) => !registrations.some((reg) => reg.public_id === team.publicID)
      )
    );

    if (missingTeams.length > 0) {
      console.log(
        "Missing teams:",
        missingTeams.map((team) => team.name)
      );
      throw createError({
        statusCode: 400,
        statusMessage: `Found teams in groups that aren't registered: ${missingTeams
          .map((team) => team.name)
          .join(", ")}`,
      });
    }
  }
  try {
    const groupStage = await usePrisma(event).groups.createMany({
      data: body.map((group) => ({
        group_name: group.group,
        stage_id: groupStageId,
        tournament_id: tournamentId,
        is_finalized: query?.finalize,
      })),
    });
    return groupStage;
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create groups",
    });
  }
});
