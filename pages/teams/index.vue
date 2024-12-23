<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Teams</h1>
    <Card>
      <CardHeader>
        <CardTitle>Alle Teams</CardTitle>
        <CardDescription>Übersicht über alle FLunkyball Teams</CardDescription>
      </CardHeader>
      <CardContent>
        <TeamList />
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: "Teams",
  breadcrumb: [
    {
      text: "Teams",
      href: "/orga/teams",
    },
  ],
});
</script>
