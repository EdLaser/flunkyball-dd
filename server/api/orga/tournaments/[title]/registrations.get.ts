export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);

  const tournament = await usePrisma().tournaments.findUnique({
    where: {
      title: title,
    },
    select: {
      status: true,
      id: true,
      stages: {
        select: {
          stage_id: true,
          stage_name: true,
        },
      },
      tournament_registrations: {
        select: {
          teams: {
            select: {
              name: true,
              public_id: true,
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
      _count: {
        select: {
          tournament_registrations: true,
        },
      },
    },
  });

  if (!tournament) {
    throw createError({
      statusCode: 404,
      statusMessage: "Tournament not found",
    });
  }

  const registrations = tournament.tournament_registrations.map((team) => {
    return {
      name: team.teams.name,
      public_id: team.teams.public_id,
      players: team.teams.players,
    };
  });

  const stages = tournament.stages.map((stage) => {
    return {
      stage_id: stage.stage_id,
      stage_name: stage.stage_name,
    };
  });

  return {
    tournamentId: tournament.id,
    registrations,
    stages,
  };
});
