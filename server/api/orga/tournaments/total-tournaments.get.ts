export default defineEventHandler(async (event) => {
  const upcomingTournaments = await usePrisma().tournaments.count({
    where: { tournament_date: { gt: new Date() } },
  });

  const pastTournaments = await usePrisma().tournaments.count({
    where: { tournament_date: { lte: new Date() } },
  });
  return { pastTournaments, upcomingTournaments };
});
