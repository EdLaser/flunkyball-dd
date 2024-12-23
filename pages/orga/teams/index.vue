<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-foreground">Teams</h1>
    <Card>
      <CardHeader>
        <CardTitle>Alle Teams</CardTitle>
        <CardDescription>Anzeigen und bearbeiten aller Teams</CardDescription>
      </CardHeader>
      <CardContent>
        <TeamList />
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  title: "Teams",
  breadcrumb: [
    {
      text: "Teams",
      href: "/orga/teams",
    },
  ],
  layout: "dashboard",
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});
</script>
