import { TournamentSerice } from "~/server/services/TournamentService";
import { tournamentTitleSchema } from "~/server/utils/request-schemas.ts";

export default defineEventHandler(async (event) => {
  const { data, success } = await getValidatedRouterParams(
    event,
    tournamentTitleSchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid tournament title",
    });
  }

  const tournament = await usePrisma(event).tournaments.findUnique({
    where: {
      title: data.title,
    },
    select: {
      status: true,
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

  const teams = TournamentSerice.calculateTotalTeams(
    tournament._count.tournament_registrations
  );

  const registrations = tournament.tournament_registrations.map((team) => {
    return {
      name: team.teams.name,
      public_id: team.teams.public_id,
      players: team.teams.players
    };
  });

  return {
    teams,
    registrations,
  };
});
