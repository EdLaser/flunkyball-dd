import { protectedRoutes } from "~/server/utils/route-rules";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  if (protectedRoutes.some((route) => event.path.startsWith(route))) {
    if (!event.context.user) {
      const user = await serverSupabaseUser(event);
      if (!user) {
        return new Response("Unauthorized", { status: 401 });
      }
      event.context.user = user;
    }
  }
});
