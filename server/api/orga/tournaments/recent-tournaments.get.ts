import { transfromTournamentDate } from "~/server/utils/tournament";

export default defineEventHandler(async (event) => {
  const recentTournaments = await usePrisma(event).tournaments.findMany({
    select: {
      title: true,
      tournament_date: true,
      status: true,
      description: true,
    },
    orderBy: {
      tournament_date: "asc",
    },
    take: 5,
  });

  return recentTournaments.map((tournament) => ({
    title: tournament.title,
    tournamentDate: transfromTournamentDate(tournament.tournament_date),
    status: tournament.status?.toString() ?? "unknown",
    description: tournament.description ?? "",
  }));
});
