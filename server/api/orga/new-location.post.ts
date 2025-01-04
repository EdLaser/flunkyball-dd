export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  const { location } = body;
});
