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
    <div class="flex justify-end w-full mt-6">
      <AddTeamDialog />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TeamsTable from "~/components/team/TeamsTable.vue";
import AddTeamDialog from "~/components/team/AddTeamDialog.vue";

const nuxtApp = useNuxtApp();

definePageMeta({
  middleware: "auth",
  title: "Teams (Orga)",
  name: "Teams (Orga)",
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

const { data: teams } = await useFetch("/api/teams/all-teams", {
  getCachedData(key) {
    // TODO: Fix this to displayed the time when the data was cached
    return getCachedDataOrFetch(key, nuxtApp);
  },
});
</script>
