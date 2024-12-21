import { usePrisma } from "~/utils/prisma";

export default defineEventHandler(async (event) => {
  const pastTournamentWinners = await usePrisma(event).tournaments.findMany({
    select: {
      title: true,
      tournament_date: true,
      price: true,
      stages: {
        select: {
          matches: {
            select: {
              teams_matches_match_winnerToteams: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        where: {
          stage_name: {
            equals: "Final",
          },
        },
      },
    },
    where: {
      tournament_date: {
        lt: new Date(),
      },
    },
  });

  if (pastTournamentWinners) {
    const tournaments = pastTournamentWinners.map((tournament) => {
      const winner =
        tournament.stages[0].matches[0].teams_matches_match_winnerToteams.name;
      return {
        title: tournament.title,
        tournament_date: tournament.tournament_date,
        price: tournament.price,
        winner: winner ?? "No winner",
      };
    });
    return tournaments;
  } else {
    return [];
  }
});
