<template>
  <div></div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: playerDetails } = await useFetch(
  () =>
    `/api/players/player-details/${encodeURIComponent(
      route.params.id as string
    )}`
);

console.log("Details Client", playerDetails.value);
</script>
