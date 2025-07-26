<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { UserPlus, Handshake } from "lucide-vue-next";
import { toast } from "vue-sonner";

const props = defineProps<{
  teamName: string;
  teamPublicId: string;
}>();

const emits = defineEmits<{
  (e: "assigned", playerPublicId: string): void;
}>();

const playersStore = usePlayersStore();
const { allPlayersWithIds: players, loadingPlayers } =
  storeToRefs(playersStore);

const selectedPlayer = ref<string | undefined>(undefined);

callOnce("players", () => playersStore.fetchAllPlayers());

const assignToTeam = async () => {
  if (!selectedPlayer.value) return;

  try {
    const response = await $fetch(
      `/api/teams/${encodeURIComponent(props.teamPublicId)}/player`,
      {
        method: "PUT",
        body: { playerPublicID: [selectedPlayer.value] },
      }
    );

    if (response.success) {
      emits("assigned", selectedPlayer.value);
      selectedPlayer.value = undefined; // Reset selection after assignment
    } else {
      toast.error("Fehler beim Zuweisen des Spielers zum Team");
    }
  } catch (error: any) {
    if (error.data) {
      toast.error(error.data.message);
    } else {
      toast.error("Ein Fehler ist aufgetreten");
    }
  }
};
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline"> Spieler <UserPlus /> </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80 md:w-96 backdrop-blur-sm bg-white/40">
      <div class="grid space-y-4">
        <div class="flex flex-col items-center">
          <p class="text-lg text-center">
            Team: <strong>{{ props.teamName }}</strong>
          </p>
          <small class="text-center">{{ props.teamPublicId }}</small>
        </div>
        <span>
          Weise dem Team:
          <span class="font-bold">{{ props.teamName }}</span> Spieler zu
        </span>
        <Select v-model="selectedPlayer">
          <SelectTrigger>
            <SelectValue placeholder="Spieler wählen..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="player in players" :value="player.publicID">
                {{ player.firstName }} {{ player.lastName }}
                <strong>{{ player.publicID }}</strong>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button @click="assignToTeam">Zuweisen <Handshake /></Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
