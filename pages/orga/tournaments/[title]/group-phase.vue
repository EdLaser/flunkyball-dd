<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="shadow-md bg-primary text-primary-foreground">
      <div class="container px-4 py-6 mx-auto">
        <h1 class="text-3xl font-bold">Gruppenphase {{ title }}</h1>
      </div>
    </header>

    <main class="container px-4 py-8 mx-auto space-y-4">
      <Tabs default-value="matches">
        <TabsList class="w-fit">
          <TabsTrigger class="text-2xl font-bold" value="matches">
            Spiele <Swords class="inline-flex" />
          </TabsTrigger>
          <TabsTrigger class="text-2xl font-bold" value="ranking">
            Ranking <Trophy class="inline-flex" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="matches">
          <div
            class="space-y-4"
            v-if="tournament?.some((group) => group.matches.length)"
          >
            <MatchGroupStageMatchesCard
              :matches="group.matches"
              :group="group.groupName"
              v-for="group in tournament"
              :key="group.groupName"
            />
          </div>
          <div v-else>
            <Button @click="generateMatches">
              Spiele generieren <Hammer />
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="ranking">
          <OverviewRankingTable :teams="rankedTeams" />
        </TabsContent>
      </Tabs>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { Swords, Trophy, Hammer } from "lucide-vue-next";

interface Team {
  name: string;
  publicID?: string;
  wins: number;
  matches: number;
}

const title = useRoute().params.title as string;

useHead({
  title: `Gruppenphase: ${decodeURIComponent(title)}`,
});

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const {
  data: tournament,
  status,
  error,
  refresh,
} = await useFetch(() => `/api/orga/tournaments/${title}/groups/matches`, {
  getCachedData(key, nuxtApp) {
    return getCachedDataOrFetch(key, nuxtApp);
  },
});

const rankedTeams = computed(() => {
  const rankedTeams = [] as Team[];
  tournament?.value?.map((group) => {
    for (let i = 0; i < group.matches.length; i++) {
      const match = group.matches[i];

      if (
        rankedTeams.findIndex((team) => team.name === match.homeTeam?.name) ===
        -1
      ) {
        rankedTeams.push({
          name: match.homeTeam?.name,
          publicID: match.homeTeam?.publicId ?? "",
          wins: 0,
          matches: 0,
        });
      } else {
        if (match.winnerTeam && match.winnerTeam.name) {
          const winnerTeamIndex = rankedTeams.findIndex(
            (team) => team.name === match.winnerTeam?.name
          );
          if (winnerTeamIndex === -1) {
            rankedTeams.push({
              name: match.winnerTeam.name,
              publicID: match.winnerTeam.publicId ?? "",
              wins: 1,
              matches: 1,
            });
          } else {
            rankedTeams[winnerTeamIndex].matches++;
            rankedTeams[winnerTeamIndex].wins++;
          }
        }
      }
    }
  }) || [];

  return rankedTeams;
});

const generateMatches = async () => {
  try {
    await $fetch(`/api/orga/tournaments/${title}/groups/matches`, {
      method: "POST",
    });
    await refresh();
  } catch (err) {
    console.error("Error generating matches:", err);
  }
};
</script>
