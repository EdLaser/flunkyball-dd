export default defineEventHandler(async (event) => {
  const tournaments = await usePrisma(event).tournaments.findMany({
    select: {
      title: true,
      status: true,
      description: true,
      location: true,
      price: true,
      tournament_date: true,
    },
  });

  return (
    tournaments.map((tournament) => ({
      title: tournament.title,
      status: tournament.status,
      description: tournament.description,
      price: tournament.price,
      location: tournament.location,
      tournamentDate: tournament.tournament_date,
    })) ?? []
  );
});
