export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const tournmanet = await usePrisma(event).tournaments.create({
    data: {
      title: body.title,
      description: body.description,
      tournament_date: body.tournament_date,
      location: body.location,
      price: body.price,
    },
  });
  return tournmanet
    ? new Response("OK", { status: 200 })
    : new Response("Error", { status: 500 });
});
