import { getUserForLogin } from "../utils/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body || !body.email || !body.password) {
    throw createError({ statusCode: 400, message: "Invalid request body" });
  }

  const { email, password } = body;

  const possibleUser = await getUserForLogin(email, event);

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
        secure: {
          publicID: possibleUser.players.public_id ?? "",
        },
      });
      setResponseStatus(event, 200);
      return "OK";
    } else {
      throw createError({
        statusCode: 400,
        message: "Wrong password / user combination",
      });
    }
  }
});
