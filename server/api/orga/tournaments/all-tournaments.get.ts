import { formatLocation } from "~/server/utils/locations";

export default defineEventHandler(async (event) => {
  const tournaments = await usePrisma(event).tournaments.findMany({
    select: {
      title: true,
      status: true,
      description: true,
      locations: {
        select: {
          name: true,
          street: true,
          city: true,
          postal_code: true,
          description: true,
          directions: true,
          house_number: true,
        },
      },
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
      location: formatLocation(tournament.locations),
      tournamentDate: tournament.tournament_date,
    })) ?? []
  );
});
