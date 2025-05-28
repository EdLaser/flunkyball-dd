<template>
  <Card>
    <CardHeader>
      <CardTitle>Spiele {{ group }}</CardTitle>
    </CardHeader>
    <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 md:px-6">
      <span class="col-span-full">Teams: {{ teams.join(", ") }}</span>
      <MatchCard
        v-for="match in matches"
        :match-id="match.matchId"
        :home-team-name="match.homeTeam"
        :away-team-name="match.awayTeam"
        :winner-team-name="match.winnerTeam"
      />
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import type { Match } from "~/types/Matches";

const props = defineProps<{
  group: string;
  matches: Match[];
}>();

const teams = computed(() => {
  const teamSet = new Set<string>();
  props.matches.forEach((match) => {
    if (match.homeTeam?.name) teamSet.add(match.homeTeam.name);
    if (match.awayTeam?.name) teamSet.add(match.awayTeam.name);
  });
  return Array.from(teamSet).sort();
});
</script>
