import { getTournamentDetails } from "~/server/utils/tournament.ts";

export default defineEventHandler(async (event) => {
  const title = getRouterParam(event, "title");

  const tournamentDetails = await getTournamentDetails(title ?? "", event);

  return tournamentDetails;
});
