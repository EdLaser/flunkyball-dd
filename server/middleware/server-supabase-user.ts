import { protectedRoutes } from "~/utils/route-rules";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  if (protectedRoutes.some((route) => event.path.startsWith(route))) {
    if (!event.context.user) {
      const user = await serverSupabaseUser(event);
      event.context.user = user;
    }
  }
});
