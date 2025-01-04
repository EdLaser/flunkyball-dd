export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  const { location } = body;

  const newLocation = await usePrisma(event).locations.create({
    data: {
      name: location.name,
      street: location.street,
      city: location.city,
      postal_code: location.postal_code,
      description: location.description,
      directions: location.directions,
      house_number: location.house_number,
    },
  });

  if (!newLocation) {
    throw createError({
      statusCode: 500,
      message: "Something went wrong",
    });
  }
  setResponseStatus(event, 201);
  return "Created";
});
