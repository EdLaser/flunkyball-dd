<template>
  <div class="min-h-screen bg-background">
    <header class="shadow-md bg-primary text-primary-foreground">
      <div class="container px-4 py-6 mx-auto">
        <h1 class="text-3xl font-bold text-white">
          Flunkyball Organization Dashboard
        </h1>
      </div>
    </header>
    <Button
      v-if="!isSidebarOpen"
      class="absolute z-20 rounded-full bottom-4 md:bottom-6 left-8 md:left-10 ml-7"
      size="icon"
      @click="refreshAll()"
    >
      <RefreshCcw
        class="w-4 h-4"
        :class="{ 'animate-spin': refreshAllPending }"
      />
    </Button>
    <main class="container px-4 py-8 mx-auto">
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
        <Card class="h-fit">
          <CardHeader>
            <CardTitle>Letzte Turniere</CardTitle>
            <CardDescription class="flex justify-between">
              Die letzten 5 Turniere
              <RefreshButton
                @click="refreshRecentTournaments"
                size="icon"
                variant="outline"
                :loading="statusRecentTournaments === 'pending'"
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TournamentList
              v-if="recentTournaments && recentTournaments.length > 0"
              :tournaments="recentTournaments"
              :is-orga="true"
            />
          </CardContent>
        </Card>

        <Card class="h-fit">
          <CardHeader>
            <CardTitle>Top 5 Teams</CardTitle>
            <CardDescription>Beste Flunkyball Teams</CardDescription>
          </CardHeader>
          <CardContent>
            <TeamList :top="5" />
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
              <BarChart class="w-16 h-16 text-muted-foreground" />
              <span class="ml-4 text-muted-foreground">
                Performance chart placeholder
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="flex justify-end mt-8">
        <NewTournamentDialog />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Dashboard",
});

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

import {
  Trophy,
  Users,
  Calendar,
  MapPin,
  BarChart,
  RefreshCcw,
} from "lucide-vue-next";
import NewTournamentDialog from "~/components/tournament/NewTournamentDialog.vue";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TournamentList from "~/components/tournament/TournamentList.vue";
import TeamList from "~/components/team/TeamList.vue";
import StatCard from "@/components/StatCard.vue";

const nuxtApp = useNuxtApp();

const sideBarStore = useSideBarStore();

const { isSidebarOpen } = storeToRefs(sideBarStore);

const {
  data: pastAndUpcomingTournaments,
  status: statusTotalTournaments,
  refresh: refreshTotalTournaments,
} = await useFetch("/api/orga/tournaments/total-tournaments", {
  getCachedData(key) {
    // TODO: Fix this to displayed the time when the data was cached
    return getCachedDataOrFetch(key, nuxtApp);
  },
});

const {
  data: recentTournaments,
  status: statusRecentTournaments,
  refresh: refreshRecentTournaments,
} = await useFetch("/api/orga/tournaments/recent-tournaments", {
  getCachedData(key) {
    // TODO: Fix this to displayed the time when the data was cached
    return getCachedDataOrFetch(key, nuxtApp);
  },
});

const {
  data: totalTeams,
  status: statusTotalTeams,
  refresh: refreshTotalTeams,
} = await useFetch("/api/teams/total-teams", {
  getCachedData(key) {
    // TODO: Fix this to displayed the time when the data was cached
    return getCachedDataOrFetch(key, nuxtApp);
  },
});

const {
  data: locations,
  status: statusLocations,
  refresh: refreshLocations,
} = await useFetch("/api/orga/locations", {
  getCachedData(key) {
    // TODO: Fix this to displayed the time when the data was cached
    return getCachedDataOrFetch(key, nuxtApp);
  },
});

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
