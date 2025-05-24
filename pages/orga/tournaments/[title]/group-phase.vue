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
            <Button @click="generateMatches"> Spiele generieren <Hammer /> </Button>
          </div>
        </TabsContent>
        <TabsContent value="ranking"> <OverviewRankingTable /> </TabsContent>
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
