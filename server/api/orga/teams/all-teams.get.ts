export default defineEventHandler(async (event) => {
  const allTeams = await usePrisma(event).teams.findMany({
    select: {
      name: true,
      slogan: true,
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
    },
  });

  return (
    allTeams.map((team) => ({
      name: team.name ?? "",
      slogan: team.slogan ?? "",
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
    })) ?? []
  );
});
