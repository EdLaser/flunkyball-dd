<template>
  <div></div>
</template>

<script lang="ts" setup>
const route = useRoute();
const nuxtApp = useNuxtApp();

useHead({
  title: `Team ${decodeURIComponent(route.params.publicID as string)}`,
});

const { data: team } = await useFetch(
  () => `/api/teams/${encodeURIComponent(route.params.publicID as string)}`,
  {
    getCachedData(key) {
      // TODO: Fix this to displayed the time when the data was cached
      return getCachedDataOrFetch(key, nuxtApp);
    },
  }
);
</script>
