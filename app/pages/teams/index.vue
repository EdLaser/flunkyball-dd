<template>
  <div class="bg-background container mx-auto px-4 py-8 min-h-screen">
    <h1 class="text-3xl font-bold text-primary mb-6">Teams</h1>
    <Card>
      <CardHeader>
        <CardTitle class="flex justify-between">Alle Teams <TeamCreateTeamDialog /></CardTitle>
        <CardDescription>Übersicht über alle FLunkyball Teams</CardDescription>
      </CardHeader>
      <CardContent>
        <TeamList />
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Teams",
});

definePageMeta({
  title: "Teams",
  name: "Teams",
  breadcrumb: [
    {
      text: "Teams",
      href: "/orga/teams",
    },
  ],
});
</script>
