export default defineEventHandler(async (event) => {
  const totalTeams = await usePrisma().teams.count();

  return totalTeams;
});
