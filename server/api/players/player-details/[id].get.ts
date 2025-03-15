export default defineEventHandler(async (event) => {
  const publicID = getRouterParam(event, "id");

  const decodedId = decodeURIComponent(publicID ?? "");

  const playerDetails = await usePrisma(event).players.findUnique({
    select: {
      first_name: true,
      last_name: true,
      slogan: true,
      phone: true,
      public_id: true,
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
      public_id: decodedId,
    },
  });

  const gamesPlayed = playerDetails?.teams
    ? playerDetails?.teams._count?.matches_matches_away_team_idToteams +
      playerDetails?.teams._count?.matches_matches_home_team_idToteams
    : 0;

  const transformed = {
    firstName: playerDetails?.first_name ?? "",
    lastName: playerDetails?.last_name ?? "",
    team: playerDetails?.teams?.name ?? "",
    slogan: playerDetails?.slogan ?? "",
    phone: playerDetails?.phone ?? "",
    publicID: playerDetails?.public_id ?? "",
    gamesPlayed: gamesPlayed,
    wins:
      playerDetails?.teams?._count?.matches_matches_match_winnerToteams ?? 0,
    avatarLink: playerDetails?.avatar_link,
  };

  return transformed;
});
