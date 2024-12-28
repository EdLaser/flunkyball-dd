export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn, user, session } = useUserSession();

  if (!user.value || !loggedIn || !session.value.isStaff) {
    return navigateTo({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
