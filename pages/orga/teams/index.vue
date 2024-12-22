<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Teams</h1>
    <Card>
      <CardHeader>
        <CardTitle>All Teams</CardTitle>
        <CardDescription>Manage and view all Flunkyball teams</CardDescription>
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
