import { z } from "zod";

const topSchema = z.object({
  top: z.coerce.number().optional(),
});

export default defineEventHandler(async (event) => {
  const { data } = await getValidatedQuery(event, topSchema.safeParse);
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
      _count: {
        select: {
          matches_matches_match_winnerToteams: true,
        },
      },
    },
    orderBy: {
      matches_matches_match_winnerToteams: {
        _count: "desc",
      },
    },
    ...(data?.top ? { take: data.top } : {}),
  });

  return (
    allTeams.map((team) => ({
      name: team.name ?? "",
      slogan: team.slogan ?? "",
      publicID: team.public_id ?? "",
      players: team.players.map((player) => ({
        firstName: player.first_name ?? "",
        lastName: player.last_name ?? "",
        slogan: player.slogan ?? "",
      })),
      registeredTournaments: team.tournament_registrations,
      wins: team._count.matches_matches_match_winnerToteams,
    })) ?? []
  );
});
