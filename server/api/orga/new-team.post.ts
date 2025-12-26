export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.name || !body.slogan) {
    throw createError({
      statusCode: 400,
      message: "Name and Slogan are required",
    });
  }

  const team = await usePrisma().teams.create({
    data: {
      name: body.name,
      slogan: body.slogan,
    },
  });
  return team;
});
