<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-primary text-primary-foreground shadow-md">
      <div class="container mx-auto py-6 px-4">
        <h1 class="text-3xl font-bold">{{ tournament?.title }}</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="grid gap-6 md:grid-cols-3">
        <!-- Left Column (2/3) -->
        <div class="md:col-span-2 space-y-6">
          <!-- Tournament Details -->
          <Card>
            <CardHeader>
              <CardTitle>Turnier Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground mb-4">
                {{ tournament?.description }}
              </p>
              <div class="flex flex-col space-y-2">
                <div class="flex items-center">
                  <Calendar class="mr-2 h-4 w-4 text-primary" />
                  <span>{{ tournament?.tournamentDate }}</span>
                </div>
                <div class="flex items-center">
                  <MapPin class="mr-2 h-4 w-4 text-primary" />
                  <span>{{ tournament?.location }}</span>
                </div>
                <div class="flex items-center">
                  <Users class="mr-2 h-4 w-4 text-primary" />
                  <span
                    >{{
                      tournament?.tournamentRegistrations?.length
                    }}
                    Teams</span
                  >
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Tournament Schedule -->
          <Card>
            <CardHeader>
              <CardTitle>Spiele</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                class="space-y-4"
                v-if="
                  tournament?.stages?.length && tournament?.stages?.length > 0
                "
              >
                <div
                  v-for="(stage, index) in tournament?.stages"
                  v-if="tournament?.stages"
                  :key="index"
                  class="w-full"
                >
                  <MatchCard
                    v-for="(match, index) in stage.matches"
                    :key="`${index}-${match.awayTeam}`"
                    :stageName="stage.stageName"
                    :awayTeamName="match.awayTeam"
                    :homeTeamName="match.homeTeam"
                    :winnerTeamName="match.winner"
                    :group="match.groupName"
                  />
                </div>
              </div>
              <p v-else>Keine Spiele vorhanden.</p>
            </CardContent>
          </Card>
        </div>

        <!-- Right Column (1/3) -->
        <div class="space-y-6">
          <!-- Participating Teams -->
          <Card>
            <CardHeader>
              <CardTitle>Teilnehmende Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <ul
                class="space-y-4"
                v-if="
                  tournament?.tournamentRegistrations &&
                  tournament?.tournamentRegistrations.length > 0
                "
              >
                <li
                  v-for="team in tournament?.tournamentRegistrations"
                  :key="team.name ?? team.slogan + team.players"
                  class="flex items-center space-x-2"
                >
                  <Avatar>
                    <AvatarFallback>
                      {{ team.name?.substring(0, 2).toUpperCase() ?? "AN" }}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p class="font-semibold">{{ team.name }}</p>
                    <p class="text-sm text-muted-foreground">
                      {{
                        team.players
                          .map(
                            (player) =>
                              `${player.firstName} ${player.lastName ?? ""}`
                          )
                          .join(", ")
                      }}
                    </p>
                  </div>
                </li>
              </ul>
              <p v-else>Keine Teams angemeldet.</p>
            </CardContent>
          </Card>

          <!-- Register Button -->
          <Card>
            <CardContent class="pt-6">
              <Button class="w-full">An Turnier Teilnehmen</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Import your Vue-compatible Lucide icons instead of 'lucide-react'
import { Calendar, MapPin, Users } from "lucide-vue-next";

// Import your UI components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const route = useRoute();

useHead({
  title: `Turnier Details: ${decodeURIComponent(
    route.params.title as string
  )}`,
});

definePageMeta({
  title: "Turnier Details",
  description: "Details zum Turnier",
});

const {
  data: tournament,
  status,
  error,
  refresh,
} = await useFetch(() => `/api/tournament-details/${route.params.title}`);

if (tournament.value == null) {
  await refresh();
}
</script>
