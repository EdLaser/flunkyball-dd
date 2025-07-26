import { toast } from "vue-sonner";
import { defineStore } from "pinia";

interface PlayerWithId {
  publicID: string;
  firstName: string;
  lastName: string;
}

export const usePlayersStore = defineStore("Players", () => {
  const allPlayersWithIds = ref<PlayerWithId[]>([]);
  const loadingPlayers = ref(false);

  const fetchAllPlayers = async () => {
    loadingPlayers.value = true;
    try {
      const players = await $fetch("/api/players/all-players", {
        method: "GET",
        query: {
          onlyIds: true,
        },
      });
      if (Array.isArray(players)) {
        allPlayersWithIds.value = players.map(
          (player: {
            publicID: string;
            firstName: string;
            lastName: string;
          }) => ({
            publicID: player.publicID,
            firstName: player.firstName,
            lastName: player.lastName,
          })
        );
      } else {
        toast.error("Unexpected response format for Players");
      }
    } catch (error) {
      toast.error("Failed to fetch players. Please try again later.");
      throw error;
    } finally {
      loadingPlayers.value = false;
    }
  };
  return {
    allPlayersWithIds,
    fetchAllPlayers,
    loadingPlayers,
  };
});
