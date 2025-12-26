export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const tournmanet = await usePrisma().tournaments.create({
    data: {
      title: body.title,
      description: body.description,
      tournament_date: body.tournament_date,
      price: body.price,
      locations: {
        connect: {
          name: body.location,
        },
      },
    },
  });
  if (tournmanet) {
    setResponseStatus(event, 201);
    return tournmanet;
  } else {
    throw createError({
      statusCode: 500,
      message: "Error creating tournament",
    });
  }
});
