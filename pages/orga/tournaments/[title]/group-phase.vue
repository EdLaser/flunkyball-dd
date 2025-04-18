<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="shadow-md bg-primary text-primary-foreground">
      <div class="container px-4 py-6 mx-auto">
        <h1 class="text-3xl font-bold">{{ tournament?.title }}</h1>
      </div>
    </header>

    <main class="container px-4 py-8 mx-auto space-y-4"></main>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

useHead({
  title: `Gruppenphase: ${decodeURIComponent(route.params.title as string)}`,
});

const {
  data: tournament,
  status,
  error,
  refresh,
} = await useFetch(() => `/api/tournament-details/${route.params.title}`, {
  getCachedData(key, nuxtApp) {
    // TODO: Fix this to displayed the time when the data was cached
    return getCachedDataOrFetch(key, nuxtApp);
  },
});
</script>
