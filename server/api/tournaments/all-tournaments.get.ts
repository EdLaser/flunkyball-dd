import { formatLocation } from "@@/server/utils/locations";
// import { z } from "zod";

// const returnOnlyFields = z.object({
//   fields: z.array(z.string()).optional(),
// });

export default defineEventHandler(async (event) => {
  // const { data } = await getValidatedQuery(event, returnOnlyFields.safeParse);
  // const fields = data?.fields;

  // if (fields && fields.length > 0) {
  //   const tournaments = await usePrisma().tournaments.findMany({
  //     select: fields.reduce((acc: Record<string, boolean>, field) => {
  //       acc[field] = true;
  //       return acc;
  //     }, {}),
  //   });

  //   return tournaments ?? [];
  // }

  const tournaments = await usePrisma().tournaments.findMany({
    select: {
      id: true,
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
      id: tournament.id,
      title: tournament.title,
      status: tournament.status,
      description: tournament.description,
      price: tournament.price,
      location: formatLocation(tournament.locations),
      tournamentDate: tournament.tournament_date,
    })) ?? []
  );
});
