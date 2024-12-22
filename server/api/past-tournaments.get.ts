import { getPastTournaments } from "../utils/tournament.ts";

export default defineEventHandler(async (event) => {
  const pastTournaments = getPastTournaments(event);

  return pastTournaments;
});
