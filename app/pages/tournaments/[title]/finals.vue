<template>
  <template>
    <div class="min-h-screen bg-background">
      <!-- Header -->
      <header class="shadow-md bg-primary text-primary-foreground">
        <div class="container px-4 py-6 mx-auto">
          <h1 class="text-3xl font-bold">Finalspiele {{ title }}</h1>
        </div>
      </header>

      <main class="container px-4 py-8 mx-auto space-y-4">
        <Tabs default-value="matches">
          <TabsList class="w-fit">
            <TabsTrigger class="text-2xl font-bold" value="matches">
              Spiele <Swords class="inline-flex" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="matches">
            <ClientOnly>
              <div
                v-if="finalMatches"
                class="space-y-4"
              >
                <div
                  v-for="finalMatch in finalMatches"
                  :key="finalMatch.stage_name"
                >
                  <h2 class="text-2xl font-bold mb-2">
                    {{ finalMatch.stage_name }}
                  </h2>
                  <MatchCard
                    class="mb-4"
                    v-for="match in finalMatch.matches"
                    :match-id="match.match_id"
                    :away-team-name="{
                      id: match.teams_matches_away_team_idToteams.id,
                      name: match.teams_matches_away_team_idToteams.name,
                    }"
                    :home-team-name="{
                      id: match.teams_matches_home_team_idToteams.id,
                      name: match.teams_matches_home_team_idToteams.name,
                    }"
                    :winner-team-name="
                      match.teams_matches_match_winnerToteams
                        ? {
                            id: match.teams_matches_match_winnerToteams.id,
                            name: match.teams_matches_match_winnerToteams.name,
                          }
                        : null
                    "
                  />
                </div>
              </div>
            </ClientOnly>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { Swords } from "lucide-vue-next";
const title = useRoute().params.title as string;

useHead({
  title: `Finale: ${decodeURIComponent(title)}`,
});

const { data: finalMatches } = await useFetch(
  () => `/api/tournaments/${title}/finals/matches`
);
</script>
