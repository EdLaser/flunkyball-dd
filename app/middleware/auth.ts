export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user, session } = useUserSession();
  if (!user.value || !loggedIn || !session.value?.isStaff) {
    return navigateTo({
      path: "/login",
    });
  }
});
