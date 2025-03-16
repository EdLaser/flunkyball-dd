import { getUpcomingTournaments } from "../utils/tournament";

export default defineEventHandler(async (event) => {
  const upcomingTournaments = await getUpcomingTournaments(event);

  return upcomingTournaments;
});
