export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body || !body.email || !body.password) {
      throw createError({ statusCode: 400, message: "Invalid request body" });
    }

    const { email, password } = body;

    const possibleUser = await usePrisma(event).users.findUnique({
      select: {
        hashed_password: true,
        players: {
          select: {
            first_name: true,
            public_id: true,
          },
        },
      },
      where: {
        email: email,
      },
    });

    if (!possibleUser) {
      throw createError({
        statusCode: 400,
        message: "Wrong password / user combination",
      });
    } else {
      const isCorrectPassword = await verifyPassword(
        possibleUser.hashed_password,
        password
      );
      if (isCorrectPassword) {
        await setUserSession(event, {
          user: {
            firstName: possibleUser.players.first_name,
            publicID: possibleUser.players.first_name,
          },
        });
        return new Response(null, { status: 200 });
      } else {
        throw createError({
          statusCode: 400,
          message: "Wrong password / user combination",
        });
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});
