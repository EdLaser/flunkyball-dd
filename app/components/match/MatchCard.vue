<template>
  <Card>
    <CardContent>
      <div class="flex justify-between items-center mt-4">
        <div
          class="flex-1 text-left text-sm md:text-base lg:text-lg font-semibold"
        >
          {{ awayTeamName.name }}
        </div>
        <div class="mx-2 text-lg">vs</div>
        <div
          class="flex-1 text-right text-sm md:text-base lg:text-lg font-semibold"
        >
          {{ homeTeamName.name }}
        </div>
      </div>
      <div
        v-if="winnerTeamName && !editWinner"
        class="mt-4 text-center text-primary font-semibold text-lg flex items-center justify-center gap-2"
      >
        <Crown class="mr-2" />
        Winner: {{ winnerTeamName.name }}
        <Button
          v-if="session?.isStaff"
          variant="outline"
          size="icon"
          @click="toggleEditWinner()"
        >
          <Pencil />
        </Button>
      </div>
      <div v-else-if="session?.isStaff" class="mt-4 flex items-center gap-4">
        <Select v-model="selectedWinnerId">
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
        <ClientOnly>
          <Button
            :disabled="!selectedWinnerId"
            @click="crownWinner(props.matchId)"
            size="icon"
            variant="outline"
          >
            <Crown />
          </Button>
        </ClientOnly>
      </div>
      <div v-else class="mt-4 text-center text-gray-500">No winner yet</div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { useToggle } from "@vueuse/core";
import { Crown, Pencil } from "lucide-vue-next";

const { session } = useUserSession();

const props = defineProps<MatchProps>();
const title = useRoute().params.title as string;

const selectedWinnerId = ref(props.winnerTeamName?.id || "");

const [editWinner, toggleEditWinner] = useToggle(false);

interface TeamInfo {
  name: string;
  id: string;
}

interface MatchProps {
  matchId: string;
  awayTeamName: TeamInfo;
  homeTeamName: TeamInfo;
  winnerTeamName?: TeamInfo | null;
  isFinal?: boolean;
}

const showSuccess = ref(false);

const crownWinner = async (matchId: string) => {
  try {
    const result = await $fetch(
      `/api/orga/tournaments/${title}/${
        props.isFinal ? "finals" : "groups"
      }/match-winner`,
      {
        method: "POST",
        body: {
          matchId,
          teamId: selectedWinnerId.value,
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
  border-color: var(--primary);
  border-width: 2px;
  transition: border 0.3s ease-in-out;
}
</style>
