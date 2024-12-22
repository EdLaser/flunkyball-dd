<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  title: "Locations",
  breadcrumb: [
    {
      text: "Lcoations",
      href: "/orga/locations",
    },
  ],
  layout: "dashboard",
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});
</script>
