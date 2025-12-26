export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body || !body.email || !body.password) {
    throw createError({
      statusCode: 400,
      message: "Username and Password are required.",
    });
  } else if (!body.publicID) {
    throw createError({
      statusCode: 400,
      message: "Public-ID is required",
    });
  } else {
    const { email, password, publicID } = body;

    const hashedPassword = await hashPassword(password);

    const newUser = await usePrisma().users.create({
      data: {
        email: email,
        hashed_password: hashedPassword,
        players: {
          connect: {
            public_id: publicID,
          },
        },
      },
      select: {
        players: {
          select: {
            first_name: true,
            public_id: true,
          },
        },
      },
    });

    await setUserSession(event, {
      user: {
        firstName: newUser.players.first_name,
        publicID: newUser.players.public_id || "",
      },
    });
    return "OK"
  }
});
