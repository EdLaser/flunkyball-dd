import { getTournamentDetails } from "~/server/utils/tournament.ts";

export default defineEventHandler(async (event) => {
  const title = getRouterParam(event, "title");
  const decodedTitle = decodeURI(title ?? "");
  
  const tournamentDetails = await getTournamentDetails(decodedTitle, event);

  return tournamentDetails;
});
