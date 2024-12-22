<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  title: "Tournaments",
  breadcrumb: [
    {
      text: "Tournaments",
      href: "/orga/tournaments",
    },
  ],
  layout: "dashboard",
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});
</script>
