export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn, user } = useUserSession();

  if (!user.value || !loggedIn) {
    return navigateTo({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
