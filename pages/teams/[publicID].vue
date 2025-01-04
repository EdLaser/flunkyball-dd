<template>
  <div></div>
</template>

<script lang="ts" setup>
const route = useRoute();

useHead({
  title: `Team ${decodeURIComponent(route.params.publicID as string)}`,
});

const { data: team } = await useFetch(
  () => `/api/teams/${encodeURIComponent(route.params.publicID as string)}`
);
</script>
