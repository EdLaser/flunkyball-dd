export default defineEventHandler(async (event) => {
  const totalTeams = await usePrisma(event).teams.count();

  return totalTeams;
});
