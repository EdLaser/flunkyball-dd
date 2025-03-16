<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="shadow-md bg-primary text-primary-foreground">
      <div class="container px-4 py-6 mx-auto">
        <h1 class="text-3xl font-bold">{{ tournament?.title }}</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container px-4 py-8 mx-auto space-y-4">
      <Card>
        <CardHeader> <CardTitle> Actions </CardTitle> </CardHeader>
        <CardContent>
          <div class="flex flex-wrap gap-4">
            <Button
              variant="outline"
              @click="calculateStage('group')"
            >
              <Swords class="w-4 h-4 mr-2" /> Gruppenphase generieren
            </Button>
            <Button
              variant="outline"
              @click="createStage('group')"
              v-if="!hasGroupPhase"
            >
              <Swords class="w-4 h-4 mr-2" /> Gruppenphase erstellen
            </Button>
            <Button variant="outline">
              <Trophy class="w-4 h-4 mr-2" /> Finalspiele erstellen
            </Button>
          </div>
        </CardContent>
      </Card>

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
                  <span>{{ tournament?.tournamentDate }}</span>
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

          <StagesGroupStageCard
            :groupsWithTeams="groupsWithTeams"
            :isFinal="hasGroupPhase"
          />

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
                  <TeamAvatar :team="team" />
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
import { Calendar, MapPin, Users, Swords, Trophy } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GroupWithTeams } from "~/types/Stages";

const route = useRoute();

useHead({
  title: `Turnier Details: ${decodeURIComponent(route.params.title as string)}`,
});

definePageMeta({
  title: "Turnier Details",
  description: "Details zum Turnier",
});

const nuxtApp = useNuxtApp();

const groupsWithTeams = ref<Array<GroupWithTeams>>([]);

const {
  data: tournament,
  status,
  error,
  refresh,
} = await useFetch(() => `/api/tournament-details/${route.params.title}`, {
  getCachedData(key) {
    // TODO: Fix this to displayed the time when the data was cached
    return getCachedDataOrFetch(key, nuxtApp);
  },
});

console.log("Tournament Data:", tournament.value);

const hasGroupPhase = computed(() => {
  if (!tournament.value?.stages) return false;
  return tournament.value.stages.some((stage) => stage.stageName === "group");
});

const calculateStage = async (stage: string) => {
  const response = await $fetch(
    `/api/orga/tournaments/${route.params.title as string}/stages-generate`,
    {
      method: "POST",
      body: {
        stage,
      },
    }
  );

  groupsWithTeams.value = response;
};

const createStage = async (stage: string) => {
  const response = await $fetch(
    `/api/orga/tournaments/${route.params.title as string}/stage`,
    {
      method: "POST",
      body: {
        stage,
      },
    }
  );

  console.log(response);
};

const getStage = async (stage: string) => {
  const response = await $fetch(
    `/api/orga/tournaments/${route.params.title as string}/stages`,
    {
      query: {
        stage,
      },
    }
  );

  console.log(response);
};
</script>
