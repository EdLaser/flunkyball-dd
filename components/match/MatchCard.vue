<template>
  <Card>
    <CardContent>
      <div class="flex justify-between items-center mt-4">
        <div class="flex-1 text-left text-sm md:text-xl font-semibold">
          {{ awayTeamName.name }}
        </div>
        <div class="mx-2 text-lg">vs</div>
        <div class="flex-1 text-right text-sm md:text-xl font-semibold">
          {{ homeTeamName.name }}
        </div>
      </div>
      <div
        v-if="winnerTeamName"
        class="mt-4 text-center text-primary font-semibold text-xl flex items-center justify-center"
      >
        <Crown class="mr-2" />
        Winner: {{ winnerTeamName.name }}
      </div>
      <div v-else-if="session.isStaff" class="mt-4 flex items-center gap-4">
        <Select v-mode="selectedWInnerId">
          <SelectTrigger
            class="w-full rounded-full"
            :class="{ 'success-ring': showSuccess }"
          >
            <SelectValue placeholder="Select Winner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem :value="awayTeamName.id">
              {{ awayTeamName.name }}
            </SelectItem>
            <SelectItem :value="homeTeamName.id">
              {{ homeTeamName.name }}
            </SelectItem>
          </SelectContent>
        </Select>
        <InspiraConfettiButton
          :disabled="!selectedWInnerId"
          @click="crownWinner(props.matchId)"
          class="rounded-full bg-primary h-9 w-10 flex items-center justify-center text-white"
        >
          <Crown />
        </InspiraConfettiButton>
      </div>
      <div v-else class="mt-4 text-center text-gray-500">No winner yet</div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { Crown } from "lucide-vue-next";

const { session } = useUserSession();

const title = useRoute().params.title as string;

const selectedWInnerId = ref<string | null>(null);

const props = defineProps<MatchProps>();
interface TeamInfo {
  name: string;
  id: string;
}

interface MatchProps {
  matchId: string;
  awayTeamName: TeamInfo;
  homeTeamName: TeamInfo;
  winnerTeamName?: TeamInfo | null;
}

const showSuccess = ref(false);

const crownWinner = async (matchId: string) => {
  try {
    const result = await $fetch(
      `/api/orga/tournaments/${title}/groups/match-winner`,
      {
        method: "POST",
        body: {
          matchId,
          teamId: selectedWInnerId.value,
        },
      }
    );
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  } catch (error) {
    console.error("Error crowning winner:", error);
    // Optionally, handle the error (e.g., show a notification)
  }
};
</script>
<style scoped>
.success-ring {
  border-color: hsl(var(--primary));
  border-width: 2px;
  transition: border 0.3s ease-in-out;
}
</style>
