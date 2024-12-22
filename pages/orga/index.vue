<template>
  <div class="min-h-screen bg-background">
    <header class="bg-primary text-primary-foreground shadow-md">
      <div class="container mx-auto py-6 px-4">
        <h1 class="text-3xl font-bold">Flunkyball Organization Dashboard</h1>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Turniere" :value="totalTournaments" :icon="Trophy" />
        <StatCard title="Aktive Teams" :value="totalTeams ?? 0" :icon="Users" />
        <StatCard
          title="Kommende Turniere"
          :value="pastAndUpcomingTournaments?.upcomingTournaments ?? 0"
          :icon="Calendar"
        />
        <StatCard
          title="Spielorte"
          :value="locations?.length ?? 0"
          :icon="MapPin"
        />
      </div>

      <div class="grid gap-6 mt-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Letzte Turniere</CardTitle>
            <CardDescription>Die letzten 5 Turniere</CardDescription>
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
        <!-- NuxtLink replaces next/link -->
        <NuxtLink to="/tournaments/create">
          <Button>Create New Tournament</Button>
        </NuxtLink>
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
import { Button } from "@/components/ui/button";
import TournamentList from "@/components/TournamentList.vue";
import TeamList from "@/components/TeamList.vue";
import StatCard from "@/components/StatCard.vue";

const { data: pastAndUpcomingTournaments } = await useFetch(
  "/api/orga/total-tournaments"
);
const { data: recentTournaments } = await useFetch(
  "/api/orga/recent-tournaments"
);
const { data: totalTeams } = await useFetch("/api/orga/total-teams");
const { data: locations } = await useFetch("/api/orga/locations");

const totalTournaments = computed(
  () =>
    (pastAndUpcomingTournaments.value?.upcomingTournaments ?? 0) +
    (pastAndUpcomingTournaments.value?.pastTournaments ?? 0)
);
</script>
