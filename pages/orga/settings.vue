<template>
  <div></div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  title: "Settings",
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
