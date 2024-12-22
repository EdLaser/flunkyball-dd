import { protectedRoutes } from "~/utils/route-rules";

export default defineEventHandler(async (event) => {
  if (protectedRoutes.some((route) => event.path.startsWith(route))) {
    if (!event.context.user) {
      return new Response("Unauthorized", { status: 401 });
    } else {
      
    }
  }
});
