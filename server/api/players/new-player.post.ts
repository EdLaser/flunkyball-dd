export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.firstName || !body.lastName || !body.slogan) {
    throw createError({ statusCode: 400, message: "Missing required fields" });
  }

  const player = await usePrisma().players.create({
    data: {
      first_name: body.firstName,
      last_name: body.lastName,
      slogan: body.slogan,
    },
  });

  if (player) {
    const details = await usePrisma().players.findUnique({
      select: {
        first_name: true,
        last_name: true,
        slogan: true,
        public_id: true,
        phone: true,
      },
      where: {
        id: player.id,
      },
    });
    if (details) {
      return {
        firstName: details.first_name,
        lastName: details.last_name,
        slogan: details.slogan,
        publicID: details.public_id,
        phone: details.phone,
      };
    } else {
      throw createError({
        statusCode: 500,
        message: "Failed to create player",
      });
    }
  } else {
    throw createError({ statusCode: 500, message: "Failed to create player" });
  }
});
