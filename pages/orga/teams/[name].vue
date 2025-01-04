<template></template>
<script setup lang="ts">
useHead({
  title: `Team ${decodeURIComponent(useRoute().params.name as string)}`,
});

definePageMeta({
  middleware: "auth",
});
</script>
