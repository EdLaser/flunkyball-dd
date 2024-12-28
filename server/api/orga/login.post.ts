import { getSatffForLogin } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body || !body.email || !body.password) {
    throw createError({ statusCode: 400, message: "Invalid request body" });
  }

  const { email, password } = body;

  const possibleStaff = await getSatffForLogin(email, event);

  if (!possibleStaff) {
    throw createError({
      statusCode: 400,
      message: "Wrong password / user combination",
    });
  } else {
    const isCorrectPassword = await verifyPassword(
      possibleStaff.hashed_password,
      password
    );

    if (isCorrectPassword) {
      await setUserSession(event, {
        user: {
          firstName: possibleStaff.first_name,
          publicID: possibleStaff.public_id,
        },
        secure: {
          isStaff: true,
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
