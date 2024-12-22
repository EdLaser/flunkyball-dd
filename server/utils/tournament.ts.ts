export const transfromTournamentDate = (tournamentDate: string | Date) => {
  return new Date(tournamentDate).toLocaleString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getTournamentDetails = async (title: string, event: any) => {
  const tournamentDetails = await usePrisma(event).tournaments.findUnique({
    select: {
      title: true,
      description: true,
      tournament_date: true,
      location: true,
      tournament_registrations: {
        select: {
          teams: {
            select: {
              name: true,
              slogan: true,
              players: {
                select: {
                  first_name: true,
                  last_name: true,
                },
              },
            },
          },
        },
      },
      stages: {
        select: {
          stage_name: true,
          groups: {
            select: {
              group_name: true,
            },
          },
          matches: {
            select: {
              teams_matches_away_team_idToteams: {
                select: {
                  name: true,
                },
              },
              teams_matches_home_team_idToteams: {
                select: {
                  name: true,
                },
              },
              teams_matches_match_winnerToteams: {
                select: {
                  name: true,
                },
              },
              groups: {
                select: {
                  group_name: true,
                },
              },
            },
          },
        },
      },
    },
    where: {
      title: title,
    },
  });

  const tournaments = {
    title: tournamentDetails?.title,
    description: tournamentDetails?.description,
    location: tournamentDetails?.location,
    tournamentDate: transfromTournamentDate(
      tournamentDetails?.tournament_date ?? ""
    ),
    tournamentRegistrations:
      tournamentDetails?.tournament_registrations.map((registration) => {
        return {
          name: registration.teams.name,
          slogan: registration.teams.slogan,
          players: registration.teams.players.map((player) => {
            return {
              firstName: player.first_name,
              lastName: player.last_name,
            };
          }),
        };
      }) ?? [],
    stages: tournamentDetails?.stages.map((stage) => {
      return {
        stageName: stage.stage_name,
        matches: stage.matches.map((match) => {
          return {
            awayTeam:
              match.teams_matches_away_team_idToteams.name ?? "Anonymus",
            homeTeam:
              match.teams_matches_home_team_idToteams.name ?? "Anonymus",
            winner: match.teams_matches_match_winnerToteams.name,
            groupName: match.groups?.group_name,
          };
        }),
      };
    }),
  };

  return tournaments ?? {};
};

export const getUpcomingTournaments = async (event: any) => {
  const tournaments = await usePrisma(event).tournaments.findMany({
    select: {
      title: true,
      description: true,
      price: true,
      tournament_date: true,
      location: true,
    },
    where: {
      tournament_date: {
        gte: new Date(),
      },
    },
  });

  const transformed = tournaments.map((tournament) => {
    return {
      title: tournament.title,
      description: tournament.description,
      price: tournament.price,
      tournamentDate: transfromTournamentDate(tournament.tournament_date ?? ""),
      location: tournament.location,
    };
  });

  return transformed ?? [];
};

export const getPastTournaments = async (event: any) => {
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
        tournamentDate: transfromTournamentDate(
          tournament.tournament_date ?? ""
        ),
        price: tournament.price,
        winner: winner ?? "No winner",
      };
    });
    return tournaments;
  } else {
    return [];
  }
};
