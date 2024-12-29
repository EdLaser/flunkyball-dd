export default defineEventHandler(async (event) => {
  const players = await usePrisma(event).players.findMany({
    select: {
      first_name: true,
      last_name: true,
      public_id: true,
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
    firstName: player.first_name,
    lastName: player.last_name,
    publicID: player.public_id,
    playsIn: player.teams?.name ?? null,
    matchesPlayed:
      (player.teams?._count?.matches_matches_away_team_idToteams ?? 0) +
      (player.teams?._count?.matches_matches_home_team_idToteams ?? 0),
    wins: player.teams?._count?.matches_matches_match_winnerToteams ?? 0,
  }));
});
