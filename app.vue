<template>
  <NuxtLayout>
    <Toaster />
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
const router = useRouter();
const route = useRoute();

const user = useSupabaseUser();

onMounted(() => {
  watch(user, (user, prevUser) => {
    if (prevUser && !user) {
      // user logged out
      router.push("/login");
    } else if (user && typeof route.query.redirect === "string") {
      // user logged in
      router.push(route.query.redirect);
    }
  });
});
</script>
