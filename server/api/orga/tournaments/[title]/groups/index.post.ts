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
  finalize: z
    .string()
    .optional()
    .refine((val) => val === "true"),
});

export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);

  const { data: query } = await getValidatedQuery(
    event,
    finalizeQuery.safeParse
  );

  if (query?.finalize) {
    const { tournamentId } = await $fetch(
      `/api/orga/tournaments/${title}/registrations`
    );

    const finalized = await usePrisma().groups.updateMany({
      where: {
        tournament_id: tournamentId,
      },
      data: {
        is_finalized: true,
      },
    });

    return finalized.count;
  }

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
    let groupStage = [];
    for (let i = 0; i < body.length; i++) {
      const group = body[i];

      const createdGroup = await usePrisma().groups.create({
        data: {
          group_name: group.group,
          stage_id: groupStageId,
          tournament_id: tournamentId,
          group_registrations: {
            create: group.teams.map((team) => ({
              team_public_id: team.publicID,
              tournament_id: tournamentId,
            })),
          },
        },
      });
      groupStage.push(createdGroup);
    }
    return groupStage;
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create groups",
    });
  }
});
