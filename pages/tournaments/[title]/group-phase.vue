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
            v-if="matches?.some((group) => group.matches.length)"
          >
            <MatchGroupStageMatchesCard
              :matches="group.matches"
              :group="group.groupName"
              v-for="group in matches"
              :key="group.groupName"
            />
          </div>
          <div v-else>
            <p class="text-muted-foreground">
              Keine Spiele in dieser Gruppenphase gefunden.
            </p>
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
const title = useRoute().params.title as string;

useHead({
  title: `Gruppenphase: ${decodeURIComponent(title)}`,
});

definePageMeta({
  layout: "dashboard",
});

interface Team {
  name: string;
  publicID?: string;
  wins: number;
  matches: number;
}

const rankedTeams = computed(() => {
  if (!matches.value) return [] as Team[];

  const teamsMap = new Map<string, Team>();

  matches.value.forEach((group) => {
    group.matches.forEach((match) => {
      // Process home team
      if (match.homeTeam?.name) {
        if (!teamsMap.has(match.homeTeam.name)) {
          teamsMap.set(match.homeTeam.name, {
            name: match.homeTeam.name,
            publicID: match.homeTeam.publicId ?? "",
            wins: 0,
            matches: 1, // Count this match
          });
        } else {
          teamsMap.get(match.homeTeam.name)!.matches++;
        }
      }

      // Process away team
      if (match.awayTeam?.name) {
        if (!teamsMap.has(match.awayTeam.name)) {
          teamsMap.set(match.awayTeam.name, {
            name: match.awayTeam.name,
            publicID: match.awayTeam.publicId ?? "",
            wins: 0,
            matches: 1, // Count this match
          });
        } else {
          teamsMap.get(match.awayTeam.name)!.matches++;
        }
      }

      // Process winner team (if any)
      if (match.winnerTeam?.name) {
        const winnerTeam = teamsMap.get(match.winnerTeam.name);
        if (winnerTeam) {
          winnerTeam.wins++;
        }
      }
    });
  });

  return Array.from(teamsMap.values());
});

const {
  data: matches,
  status,
  error,
  refresh,
} = await useFetch(() => `/api/tournaments/${title}/groups/matches`);
</script>
