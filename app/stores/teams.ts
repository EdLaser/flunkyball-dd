import { defineStore } from "pinia";
import { toast } from "vue-sonner";

interface TeamWithid {
  publicID: string;
  name: string;
}

export const useTeamsStore = defineStore("Teams", () => {
  const allTeamsWithIds = ref<TeamWithid[]>([]);
  const loadingTeams = ref(false);

  const fetchAllTeams = async () => {
    loadingTeams.value = true;
    try {
      const teams = await $fetch("/api/teams/all-teams", {
        method: "GET",
        query: {
          onlyIds: true,
        },
      });
      if (Array.isArray(teams)) {
        allTeamsWithIds.value = teams.map(
          (team: { publicID: string; name: string }) => ({
            publicID: team.publicID,
            name: team.name,
          })
        );
      } else {
        toast.error("Unexpected response format for Teams");
      }
    } catch (error) {
      toast.error("Failed to fetch teams. Please try again later.");
      throw error;
    } finally {
      loadingTeams.value = false;
    }
  };
  return {
    allTeamsWithIds,
    fetchAllTeams,
    loadingTeams,
  };
});
