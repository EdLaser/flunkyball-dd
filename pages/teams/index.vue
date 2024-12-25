<template>
  <div class="bg-background container mx-auto px-4 py-8 min-h-screen">
    <h1 class="text-3xl font-bold text-primary mb-6">Teams</h1>
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
