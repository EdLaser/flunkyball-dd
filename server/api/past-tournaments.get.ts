import { getPastTournaments } from "../utils/tournament";

export default defineEventHandler(async (event) => {
  const pastTournaments = getPastTournaments(event);

  return pastTournaments;
});
