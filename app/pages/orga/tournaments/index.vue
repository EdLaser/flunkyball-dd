<template>
  <div class="bg-background container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Flunkyball Turniere</h1>

    <Card>
      <CardHeader>
        <CardTitle>Turnier Management</CardTitle>
        <CardDescription class="flex justify-between">
          Hier kannst du alle Turniere verwalten.
          <RefreshButton
            variant="outline"
            @click="refresh"
            :loading="status === 'pending'"
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TournamentTable v-if="tournaments" :data="tournaments" />
      </CardContent>
    </Card>
    <div class="flex justify-end w-full mt-6">
      <NewTournamentDialog />
    </div>
  </div>
</template>

<script setup lang="ts">
import NewTournamentDialog from "~/components/tournament/NewTournamentDialog.vue";
import TournamentTable from "~/components/tournament/TournamentTable.vue";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

useHead({
  title: "Turniere (Orga)",
});

definePageMeta({
  middleware: "auth",
  title: "Tunriere (Orga)",
  name: "Turniere (Orga)",
  breadcrumb: [
    {
      text: "Tournaments",
      href: "/orga/tournaments",
    },
  ],
  layout: "dashboard",
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});

const {
  data: tournaments,
  status,
  refresh,
} = await useFetch("/api/tournaments/all-tournaments", {
  transform: (data) =>
    data.map((tournament) => ({
      ...tournament,
      tournamentDate: new Date(tournament.tournamentDate),
    })),
});
</script>
