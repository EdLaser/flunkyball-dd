<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-primary">Teams</h1>
    <Card>
      <CardHeader>
        <CardTitle>Alle Teams</CardTitle>
        <CardDescription>Anzeigen und bearbeiten aller Teams</CardDescription>
      </CardHeader>
      <CardContent>
        <TeamsTable v-if="teams" :data="teams" />
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import TeamsTable from "~/components/team/TeamsTable.vue";

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

const { data: teams } = await useFetch("/api/orga/teams/all-teams");
</script>
