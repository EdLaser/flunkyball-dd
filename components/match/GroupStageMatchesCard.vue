<template>
  <Card>
    <CardHeader>
      <CardTitle
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
      >
        Spiele {{ group }}
        <span class="text-xs md:text-sm font-normal">
          Teams: {{ teams.join(", ") }}</span
        >
      </CardTitle>
    </CardHeader>
    <CardContent class="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 md:px-6">
      <MatchCard
        v-for="match in matches"
        :match-id="match.matchId"
        :home-team-name="match.homeTeam"
        :away-team-name="match.awayTeam"
        :winner-team-name="match.winnerTeam"
      />
    </CardContent>
    <CardFooter
      class="flex justify-end"
      v-if="matches.every((match) => match.winnerTeam) && session.isStaff"
    >
      <Button @click="finishGroup(props.groupId)">
        Abschließen <PartyPopper class="inline h-4 w-4 ml-1" />
      </Button>
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import type { Match } from "~/types/Matches";
import { PartyPopper } from "lucide-vue-next";

const props = defineProps<{
  group: string;
  groupId: string;
  matches: Match[];
}>();

const title = useRoute().params.title as string;

const { session } = useUserSession();

const teams = computed(() => {
  const teamSet = new Set<string>();
  props.matches.forEach((match) => {
    if (match.homeTeam?.name) teamSet.add(match.homeTeam.name);
    if (match.awayTeam?.name) teamSet.add(match.awayTeam.name);
  });
  return Array.from(teamSet).sort();
});

const finishGroup = async (groupId: string) => {
  // Logic to finish the group stage matches
  console.log(`Finishing group ${groupId}`);

  try {
    const result = await $fetch(
      `/api/orga/tournaments/${title}/groups/finish`,
      {
        method: "POST",
        body: {
          groupId,
        },
      }
    );
  } catch (error) {
    console.error("Error finishing group:", error);
    // Handle error appropriately, e.g., show a notification
  }
};
</script>
