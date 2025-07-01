import { defineStore } from "pinia";

interface Tournament {
  id: string;
  title: string;
  status: "in_progress" | "open" | "finished";
  description: string | null;
  price: string | null;
  location: string | null;
  tournamentDate: string;
}

const sortNextUpcomingTournaments = (a: Tournament, b: Tournament): number => {
  return (
    new Date(a.tournamentDate).getTime() - new Date(b.tournamentDate).getTime()
  );
};

export const useTournamentsStore = defineStore("Tournaments", () => {
  const tournaments = ref<Tournament[]>([]);

  const nextUpcomingTournament = computed(() => {
    const upcomingTournaments = tournaments.value
      .filter((tournament) => {
        return (
          tournament.status === "open" &&
          new Date(tournament.tournamentDate) > new Date()
        );
      })
      .sort(sortNextUpcomingTournaments);
    return upcomingTournaments.length > 0 ? upcomingTournaments[0] : null;
  });

  const fetchAllTournaments = async () => {
    try {
      const response = await $fetch("/api/tournaments/all-tournaments");
      tournaments.value = response;
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  return {
    tournaments,
    nextUpcomingTournament,
    fetchAllTournaments,
  };
});
