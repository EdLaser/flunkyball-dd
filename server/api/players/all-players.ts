import { z } from "zod";

const getPlayersQuery = z.object({
  top: z.coerce.number().optional(),
  onlyIds: z
    .string()
    .optional()
    .refine((val) => val === "true"),
});

export default defineEventHandler(async (event) => {
  const { data } = await getValidatedQuery(event, getPlayersQuery.safeParse);
  if (data?.onlyIds) {
    const players = await usePrisma(event).players.findMany({
      select: {
        public_id: true,
        first_name: true,
        last_name: true,
      },
    });
    return players.map((player) => ({
      publicID: player.public_id ?? "",
      firstName: player.first_name ?? "",
      lastName: player.last_name ?? "",
    }));
  }

  const players = await usePrisma(event).players.findMany({
    select: {
      first_name: true,
      last_name: true,
      public_id: true,
      slogan: true,
      avatar_link: true,
      teams: {
        select: {
          name: true,
          _count: {
            select: {
              matches_matches_away_team_idToteams: true,
              matches_matches_home_team_idToteams: true,
              matches_matches_match_winnerToteams: true,
            },
          },
        },
      },
    },
    where: {
      public_id: {
        not: null,
      },
    },
    orderBy: {
      first_name: "asc",
    },
  });

  return players.map((player) => ({
    firstName: player.first_name ?? "",
    lastName: player.last_name ?? "",
    slogan: player.slogan ?? "",
    publicID: player.public_id ?? "",
    playsIn: player.teams?.name ?? null,
    matchesPlayed:
      (player.teams?._count?.matches_matches_away_team_idToteams ?? 0) +
      (player.teams?._count?.matches_matches_home_team_idToteams ?? 0),
    wins: player.teams?._count?.matches_matches_match_winnerToteams ?? 0,
    avatarLink: player.avatar_link,
  }));
});
