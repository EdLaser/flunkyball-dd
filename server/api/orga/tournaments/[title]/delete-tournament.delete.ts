export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);

  const deletedTournament = await usePrisma().tournaments.delete({
    where: {
      title: title,
    },
  });

  return deletedTournament.id
    ? {
        success: true,
        tournament: deletedTournament,
      }
    : {
        success: false,
        message: "Tournament deletion failed",
      };
});
