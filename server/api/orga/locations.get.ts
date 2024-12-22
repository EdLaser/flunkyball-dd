export default defineEventHandler(async (event) => {
  const distinctVenues = await usePrisma(event).tournaments.findMany({
    select: {
      location: true,
    },
    distinct: ["location"],
  });

  return distinctVenues;
});
