export default defineEventHandler(async (event) => {
  const body = await readBody(event);

    if (!body || !body.email || !body.password) {
      throw createError({ statusCode: 400, message: "Invalid request body" });
    }

    const { email, password } = body;
})
