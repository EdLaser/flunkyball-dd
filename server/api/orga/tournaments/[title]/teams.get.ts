import { TournamentSerice } from "@@/server/services/TournamentService";
import { tournamentTitleSchema } from "@@/server/utils/request-schemas";

export default defineEventHandler(async (event) => {
  const { data, success } = await getValidatedRouterParams(
    event,
    tournamentTitleSchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid tournament title",
    });
  }

  const { registrations, stages } = await $fetch(
    `/api/orga/tournaments/${data.title}/registrations`
  );

  const teams = TournamentSerice.calculateTotalTeams(registrations.length);

  return {
    teams,
    registrations,
    stages,
  };
});
