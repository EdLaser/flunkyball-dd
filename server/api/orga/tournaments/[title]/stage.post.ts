import { stageSchema } from "~/server/utils/request-schemas";

export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);
  const { data, success } = await readValidatedBody(
    event,
    stageSchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid stage",
    });
  }

  const tourament = await usePrisma(event).tournaments.findUnique({
    where: {
      title,
    },
    select: {
      id: true,
    },
  });

  if (!tourament) {
    throw createError({
      statusCode: 404,
      statusMessage: "Tournament not found",
    });
  }
  const { stage } = data;

  const createdStage = await usePrisma(event).stages.create({
    data: {
      stage_name: stage,
      sequence: stage === "group" ? 1 : 2,
      tournament_id: tourament.id,
    },
  });
  return createdStage;
});
