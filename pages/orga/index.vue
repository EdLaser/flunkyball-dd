<template>
  <div class="min-h-screen bg-background">
    <header class="bg-primary text-primary-foreground shadow-md">
      <div class="container mx-auto py-6 px-4">
        <h1 class="text-3xl font-bold flex justify-between">
          Flunkyball Organization Dashboard
          <RefreshButton @click="refreshAll()" :loading="refreshAllPending" />
        </h1>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div class="flex flex-col">
          <RefreshButton
            class="col-span-2 rounded-b-none"
            @click="refreshTotalTournaments"
            :loading="statusTotalTournaments === 'pending'"
          />
          <StatCard
            class="rounded-t-none"
            title="Turniere"
            :value="totalTournaments"
            :icon="Trophy"
          />
        </div>
        <div class="flex flex-col">
          <RefreshButton
            class="col-span-2 rounded-b-none"
            @click="refreshTotalTeams"
            :loading="statusTotalTeams === 'pending'"
          />
          <StatCard
            class="rounded-t-none"
            title="Aktive Teams"
            :value="totalTeams ?? 0"
            :icon="Users"
          />
        </div>
        <div class="flex flex-col">
          <RefreshButton
            class="col-span-2 rounded-b-none"
            @click="refreshRecentTournaments"
            :loading="statusRecentTournaments === 'pending'"
          />
          <StatCard
            class="rounded-t-none"
            title="Kommende Turniere"
            :value="pastAndUpcomingTournaments?.upcomingTournaments ?? 0"
            :icon="Calendar"
          />
        </div>
        <div class="flex flex-col">
          <RefreshButton
            class="col-span-2 rounded-b-none"
            @click="refreshLocations"
            :loading="statusLocations === 'pending'"
          />
          <StatCard
            class="rounded-t-none"
            title="Spielorte"
            :value="locations?.length ?? 0"
            :icon="MapPin"
          />
        </div>
      </div>

      <div class="grid gap-6 mt-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Letzte Turniere</CardTitle>
            <CardDescription class="flex justify-between"
              >Die letzten 5 Turniere
              <RefreshButton
                @click="refreshRecentTournaments"
                :loading="statusRecentTournaments === 'pending'"
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TournamentList
              v-if="recentTournaments && recentTournaments.length > 0"
              :tournaments="recentTournaments"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Teams</CardTitle>
            <CardDescription>Highest ranked Flunkyball teams</CardDescription>
          </CardHeader>
          <CardContent>
            <TeamList />
          </CardContent>
        </Card>
      </div>

      <div class="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Key metrics for the organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              class="h-[300px] flex items-center justify-center bg-muted rounded-md"
            >
              <BarChart class="h-16 w-16 text-muted-foreground" />
              <span class="ml-4 text-muted-foreground"
                >Performance chart placeholder</span
              >
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="mt-8 flex justify-end">
        <NewTournamentDialog />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
  breadcrumb: [
    {
      text: "Dashboard",
      href: "/orga",
    },
  ],
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});

import { Trophy, Users, Calendar, MapPin, BarChart } from "lucide-vue-next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TournamentList from "@/components/TournamentList.vue";
import TeamList from "@/components/TeamList.vue";
import StatCard from "@/components/StatCard.vue";

const {
  data: pastAndUpcomingTournaments,
  status: statusTotalTournaments,
  refresh: refreshTotalTournaments,
} = await useFetch("/api/orga/tournaments/total-tournaments");

const {
  data: recentTournaments,
  status: statusRecentTournaments,
  refresh: refreshRecentTournaments,
} = await useFetch("/api/orga/tournaments/recent-tournaments");

const {
  data: totalTeams,
  status: statusTotalTeams,
  refresh: refreshTotalTeams,
} = await useFetch("/api/orga/teams/total-teams");

const {
  data: locations,
  status: statusLocations,
  refresh: refreshLocations,
} = await useFetch("/api/orga/locations");

const refreshAll = () => {
  refreshTotalTournaments();
  refreshRecentTournaments();
  refreshTotalTeams();
  refreshLocations();
};

const refreshAllPending = computed(
  () =>
    statusTotalTournaments.value === "pending" ||
    statusRecentTournaments.value === "pending" ||
    statusTotalTeams.value === "pending" ||
    statusLocations.value === "pending"
);

const totalTournaments = computed(
  () =>
    (pastAndUpcomingTournaments.value?.upcomingTournaments ?? 0) +
    (pastAndUpcomingTournaments.value?.pastTournaments ?? 0)
);
</script>
