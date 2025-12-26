export default defineEventHandler(async (event) => {
  const distinctLocations = await usePrisma().locations.findMany({
    select: {
      name: true,
      street: true,
      city: true,
      postal_code: true,
      description: true,
      directions: true,
      house_number: true,
    },
    distinct: ["name"],
  });

  return distinctLocations;
});
