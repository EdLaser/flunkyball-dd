export default defineEventHandler(async (event) => {
  const allTeams = await usePrisma(event).teams.findMany({
    select: {
      name: true,
      slogan: true,
      public_id: true,
      players: {
        select: {
          first_name: true,
          last_name: true,
          slogan: true,
        },
      },
      tournament_registrations: {
        select: {
          tournaments: {
            select: {
              title: true,
            },
          },
        },
      },
      pre_registrations: {
        select: {
          tournaments: {
            select: {
              title: true,
            },
          },
        },
      },
      _count: {
        select: {
          matches_matches_match_winnerToteams: true,
        },
      },
    },
  });

  return (
    allTeams
      .map((team) => ({
        name: team.name ?? "",
        slogan: team.slogan ?? "",
        publicID: team.public_id ?? "",
        players: team.players.map((player) => ({
          firstName: player.first_name ?? "",
          lastName: player.last_name ?? "",
          slogan: player.slogan ?? "",
        })),
        registeredTournaments: [
          ...team.tournament_registrations.map(
            (registration) => registration.tournaments.title
          ),
          ...team.pre_registrations.map(
            (registration) => registration.tournaments.title
          ),
        ],
        wins: team._count.matches_matches_match_winnerToteams,
      }))
      .sort((a, b) => b.wins - a.wins) ?? []
  );
});
