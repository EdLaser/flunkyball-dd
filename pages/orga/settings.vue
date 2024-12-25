<template>
  <div></div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  title: "Einstellungen",
  name: "Einstellungen",
  breadcrumb: [
    {
      text: "Settings",
      href: "/orga/settings",
    },
  ],
  layout: "dashboard",
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});
</script>
