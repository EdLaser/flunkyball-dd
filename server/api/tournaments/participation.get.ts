export default defineEventHandler(async (event) => {
  const tournamentRegistrations = await usePrisma().tournaments.findMany({
    select: {
      title: true,
      _count: {
        select: { tournament_registrations: true },
      },
    },
  });

  return tournamentRegistrations.map((tournament) => ({
    title: tournament.title,
    registrations: tournament._count.tournament_registrations,
  }));
});
