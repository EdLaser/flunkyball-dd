<template>
  <div></div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: team } = await useFetch(
  () => `/api/teams/${encodeURIComponent(route.params.publicID as string)}`
);
console.log(team.value);
</script>
