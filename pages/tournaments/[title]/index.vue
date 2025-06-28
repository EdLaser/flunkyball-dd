<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="shadow-md bg-primary text-primary-foreground">
      <div class="container px-4 py-6 mx-auto">
        <h1 class="text-3xl font-bold">{{ tournament?.title }}</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container px-4 py-8 mx-auto">
      <div class="grid gap-6 md:grid-cols-3">
        <!-- Left Column (2/3) -->
        <div class="space-y-6 md:col-span-2">
          <!-- Tournament Details -->
          <Card>
            <CardHeader>
              <CardTitle class="flex justify-between">
                Turnier Details
                <TournamentStatusBadge
                  v-if="tournament?.status"
                  :status="tournament.status"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="mb-4 text-muted-foreground">
                {{ tournament?.description }}
              </p>
              <div class="flex flex-col space-y-2">
                <div class="flex items-center">
                  <Calendar class="w-4 h-4 mr-2 text-primary" />
                  <span>{{
                    new Date(tournament?.tournamentDate?? '').toLocaleString(
                      "de-DE",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  }}</span>
                </div>
                <div class="flex items-center">
                  <MapPin class="w-4 h-4 mr-2 text-primary" />
                  <span>{{ tournament?.location }}</span>
                </div>
                <div class="flex items-center">
                  <Users class="w-4 h-4 mr-2 text-primary" />
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

          <StagesGroupStageCard />
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
                v-auto-animate
                v-if="
                  tournament?.tournamentRegistrations &&
                  tournament?.tournamentRegistrations.length > 0
                "
              >
                <li
                  v-for="team in tournament.tournamentRegistrations.slice(
                    0,
                    showMoreTeams
                      ? tournament.tournamentRegistrations.length
                      : 8
                  )"
                  :key="team.name ?? team.slogan + team.players"
                  class="flex items-center space-x-2"
                >
                  <Avatar>
                    <AvatarFallback>
                      {{ team.name?.substring(0, 2).toUpperCase() ?? "AN" }}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <NuxtLink
                      :to="`/teams/${encodeURIComponent(team.publicID ?? '')}`"
                      class="font-semibold text-primary"
                    >
                      {{ team.name }}
                    </NuxtLink>
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
                <li>
                  <Button
                    class="text-sm text-primary hover:underline"
                    variant="link"
                    @click="toggleShowMoreTeams()"
                  >
                    {{ showMoreTeams ? "Weniger" : "Weitere" }} Teams anzeigen
                  </Button>
                </li>
              </ul>
              <p v-else>Keine Teams angemeldet.</p>
            </CardContent>
          </Card>

          <ClientOnly>
            <Card v-if="isTournamentInFuture">
              <CardContent class="pt-6">
                <TeamRegisterTeamForTournamentDialog
                  :tournamentTitle="tournament?.title ?? ''"
                />
              </CardContent>
            </Card>
          </ClientOnly>
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
import { useToggle } from "@vueuse/core";
import { vAutoAnimate } from "@formkit/auto-animate";

const route = useRoute();

const [showMoreTeams, toggleShowMoreTeams] = useToggle(false);

const tournamentTitle = route.params.title as string;

const groupStageStore = useGroupStageStore();

useHead({
  title: `Turnier Details: ${decodeURIComponent(tournamentTitle)}`,
});

onMounted(() => {
  groupStageStore.fetchGroupStage();
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
} = await useFetch(() => `/api/tournament-details/${tournamentTitle}`);

const isTournamentInFuture = computed(() => {
  if (!tournament.value?.tournamentDate) return false;
  console.log(new Date(tournament.value.tournamentDate), new Date());
  return new Date(tournament.value.tournamentDate) > new Date();
});
</script>
