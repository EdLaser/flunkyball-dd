export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const tournmanet = await usePrisma(event).tournaments.create({
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
    return new Response(JSON.stringify(tournmanet), { status: 201 });
  } else {
    return new Response(
      JSON.stringify({ message: "Error creating tournament" }),
      { status: 500 }
    );
  }
});
