import { protectedRoutes } from "~/server/utils/route-rules";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (protectedRoutes.some((route) => event.path.startsWith(route))) {
    if (!session.user && session.secure && !session.secure.isStaff) {
      throw createError({
        statusCode: 401,
        message: "Forbidden",
      });
    }
  }
});
