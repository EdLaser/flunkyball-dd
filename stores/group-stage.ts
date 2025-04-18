import { defineStore } from "pinia";
import type { GroupWithTeams } from "~/types/Stages";

export const useGroupStageStore = defineStore("GroupStage", () => {
  const route = useRoute();

  const groupStage = ref<GroupWithTeams[]>([]);
  const latestError = ref<string | null>(null);
  const loadingGroupStage = ref(false);

  const fetchGroupStage = async () => {
    loadingGroupStage.value = true;
    try {
      const response = await $fetch(
        `/api/orga/tournaments/${route.params.title as string}/groups`
      );
      groupStage.value = response.map((group) => {
        return {
          group: group.group_name,
          isFinalized: group.is_finalized,
          teams: group.group_registrations.map((registration) => {
            return {
              publicID: registration.teams.public_id,
              name: registration.teams.name,
              players: registration.teams.players.map((player) => {
                return {
                  firstName: player.first_name,
                  lastName: player.last_name,
                };
              }),
            };
          }),
        };
      });
    } catch (error) {
      if (error instanceof Error) {
        latestError.value = error.message;
      } else {
        latestError.value = "An unknown error occurred";
      }
      return;
    } finally {
      loadingGroupStage.value = false;
    }
  };

  const calculateGroupStage = async () => {
    try {
      const response = await $fetch(
        `/api/orga/tournaments/${route.params.title as string}/stages-generate`,
        {
          method: "POST",
          body: {
            stage: "group",
          },
        }
      );
      groupStage.value = response;
    } catch (error) {
      if (error instanceof Error) {
        latestError.value = error.message;
      } else {
        latestError.value = "An unknown error occurred";
      }
      return;
    }
  };

  const createGroupStage = async () => {
    try {
      const response = await $fetch(
        `/api/orga/tournaments/${route.params.title as string}/stage`,
        {
          method: "POST",
          body: {
            stage: "group",
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        latestError.value = error.message;
      } else {
        latestError.value = "An unknown error occurred";
      }
      return;
    }
  };

  const confirmGroupStage = async (finalize?: boolean) => {
    try {
      const response = await $fetch(
        `/api/orga/tournaments/${route.params.title as string}/groups`,
        {
          method: "POST",
          query: {
            finalize,
          },
          ...(finalize ? {} : { body: groupStage.value }),
        }
      );
      if (response === groupStage.value.length) {
        await fetchGroupStage();
      }
    } catch (error) {
      if (error instanceof Error) {
        latestError.value = error.message;
      } else {
        latestError.value = "An unknown error occurred";
      }
      return;
    }
  };

  return {
    groupStage,
    latestError,
    loadingGroupStage,
    fetchGroupStage,
    calculateGroupStage,
    confirmGroupStage,
    createGroupStage,
  };
});
