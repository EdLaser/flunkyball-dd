<template>
  <Card>
    <CardHeader>
      <CardTitle>Spiele {{ group }}</CardTitle>
    </CardHeader>
    <CardContent
      class="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 md:px-6"
    >
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
</script>
