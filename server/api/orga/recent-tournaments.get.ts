export default defineEventHandler(async (event) => {
  const msotRecentTournaments = await usePrisma(event).tournaments.findMany({
    select: {
      title: true,
      tournament_date: true,
      status: true,
    },
    where: { tournament_date: { lte: new Date() } },
    orderBy: {
      tournament_date: "desc",
    },
    take: 5,
  });
});
