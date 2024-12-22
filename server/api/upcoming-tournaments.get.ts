import { getUpcomingTournaments } from "../utils/tournament.ts";

export default defineEventHandler(async (event) => {
  const upcomingTournaments = await getUpcomingTournaments(event);

  return upcomingTournaments;
});
