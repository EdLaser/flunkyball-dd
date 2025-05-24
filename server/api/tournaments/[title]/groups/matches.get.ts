export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);
  return await $fetch(`/api/orga/tournaments/${title}/groups/matches`);
});
