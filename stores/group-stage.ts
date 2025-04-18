import { defineStore } from "pinia";
import type { GroupWithTeams } from "~/types/Stages";

export const useGroupStageStore = defineStore("GroupStage", () => {
  const route = useRoute();

  const groupStage = ref<GroupWithTeams[]>([]);
  const latestError = ref<string | null>(null);

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

  const confirmGroupStage = async () => {
    try {
      const response = await $fetch(
        `/api/orga/tournaments/${route.params.title as string}/groups`,
        {
          method: "POST",
          body: groupStage.value,
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

  return {
    groupStage,
    latestError,
    calculateGroupStage,
    confirmGroupStage,
    createGroupStage,
  };
});
