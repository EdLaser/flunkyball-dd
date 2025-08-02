<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="shadow-md bg-primary text-primary-foreground">
      <div class="container px-4 py-6 mx-auto">
        <h1 class="text-3xl font-bold">Gruppenphase {{ title }}</h1>
      </div>
    </header>
    <main class="container px-4 py-8 mx-auto space-y-4">
      <div class="flex gap-2 overflow-x-auto">
        <Button variant="outline" @click="generateFinals">
          Finalspiele generieren <Crown />
        </Button>
        <Button
          variant="outline"
          v-if="!matches?.some((group) => group.matches.length)"
          @click="generateMatches"
        >
          Spiele generieren <Hammer />
        </Button>
      </div>
      <Tabs default-value="matches">
        <TabsList class="w-full">
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
              :group-id="group.groupId"
              v-for="group in matches"
              :key="group.groupName"
            />
          </div>
        </TabsContent>
        <TabsContent value="ranking">
          <OverviewRannkingPerGroup :group-with-ranking="rankedTeams" />
        </TabsContent>
      </Tabs>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { Swords, Trophy, Hammer, Crown } from "lucide-vue-next";
import type { RealtimeChannel } from "@supabase/supabase-js";

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
  data: matches,
  status,
  error,
  refresh,
} = await useFetch(() => `/api/orga/tournaments/${title}/groups/matches`);

const supabaseClient = useSupabaseClient();
const realtimeChannel = ref<null | RealtimeChannel>(null);

onMounted(() => {
  // Real time listener for new workouts
  realtimeChannel.value = supabaseClient
    .channel("public:collaborators")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "matches" },
      (payload) => {
        refresh();
      }
    );

  realtimeChannel.value.subscribe();
});

onBeforeUnmount(() => {
  if (realtimeChannel.value) {
    realtimeChannel.value.unsubscribe();
  }
});

const rankedTeams = computed(() => {
  if (!matches.value) return [];

  // Aggregate teams per group
  return matches.value.map((group) => {
    const teamsMap = new Map<string, Team>();

    group.matches.forEach((match) => {
      // Home team
      if (match.homeTeam?.name) {
        if (!teamsMap.has(match.homeTeam.name)) {
          teamsMap.set(match.homeTeam.name, {
            name: match.homeTeam.name,
            publicID: match.homeTeam.publicId ?? "",
            wins: 0,
            matches: 1,
          });
        } else {
          teamsMap.get(match.homeTeam.name)!.matches++;
        }
      }
      // Away team
      if (match.awayTeam?.name) {
        if (!teamsMap.has(match.awayTeam.name)) {
          teamsMap.set(match.awayTeam.name, {
            name: match.awayTeam.name,
            publicID: match.awayTeam.publicId ?? "",
            wins: 0,
            matches: 1,
          });
        } else {
          teamsMap.get(match.awayTeam.name)!.matches++;
        }
      }
      // Winner
      if (match.winnerTeam?.name) {
        const winnerTeam = teamsMap.get(match.winnerTeam.name);
        if (winnerTeam) {
          winnerTeam.wins++;
        }
      }
    });

    return {
      groupName: group.groupName,
      groupId: group.groupId,
      teams: Array.from(teamsMap.values()),
    };
  });
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

const generateFinals = async () => {
  try {
    await $fetch(`/api/orga/tournaments/${title}/stages-generate`, {
      method: "POST",
      body: {
        stage: "finals",
      },
    });
    await refresh();
  } catch (err) {
    console.error("Error generating finals:", err);
  }
};
</script>
