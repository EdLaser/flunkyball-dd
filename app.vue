<template>
  <div
    class="transition-colors duration-300 bg-background transition-transform"
    :class="colorMode.preference"
    style="font-family: 'Fustat', sans-serif"
  >
    <NuxtLayout>
      <Toaster />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
const router = useRouter();
const route = useRoute();
const colorMode = useColorMode();

const { user, loggedIn } = useUserSession();

onMounted(() => {
  watch(loggedIn, (nowLoggedIn, wasLoggedIn) => {
    if (wasLoggedIn && !nowLoggedIn) {
      // user logged out
      router.push("/login");
    } else if (user && typeof route.query.redirect === "string") {
      // user logged in
      router.push(route.query.redirect);
    }
  });
});
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>
