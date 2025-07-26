import { defineStore } from "pinia";

export const useMatchesStore = defineStore("Matches", () => {
  const route = useRoute();

  const matches = ref([]);

  const generateMatches = () => {
    try {
      const response = $fetch(
        `/api/orga/tournaments/${route.params.title}/groups/matches`
      );
      return response;
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };
  return { matches, generateMatches };
});
