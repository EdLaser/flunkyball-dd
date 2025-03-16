import { z } from "zod";
import { TournamentSerice } from "~/server/services/TournamentService";
import { handleTournamentParameter } from "~/server/utils/request-schemas.ts";

const stageSchema = z.object({
  stage: z.enum(["group", "finals"]),
});

export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);

  const { data, success } = await readValidatedBody(
    event,
    stageSchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid stage title",
    });
  }

  const [teams, needsDivision] = await $fetch(
    `/api/orga/tournaments/${title}/teams`
  );

  const { stage } = data;

  if (stage === "group") {
    return TournamentSerice.calculateGroupPhase([teams, needsDivision]);
  } else {
    return "OK";
  }
});
