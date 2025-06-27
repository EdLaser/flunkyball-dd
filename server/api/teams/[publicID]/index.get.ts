export default defineEventHandler(async (event) => {
  const publicID = getRouterParam(event, "publicID");
  const decodedId = decodeURIComponent(publicID ?? "");

  if (!publicID) {
    throw createError({
      statusCode: 400,
      message: "Public ID is required.",
    });
  }

  const team = await usePrisma(event).teams.findUnique({
    select: {
      name: true,
      slogan: true,
      public_id: true,
      players: {
        select: {
          first_name: true,
          last_name: true,
          public_id: true,
          slogan: true,
        },
      },
      _count: {
        select: {
          matches_matches_away_team_idToteams: true,
          matches_matches_home_team_idToteams: true,
          matches_matches_match_winnerToteams: true,
        },
      },
    },
    where: {
      public_id: decodedId,
    },
  });

  if (!team) {
    throw createError({
      statusCode: 404,
      message: "Team not found.",
    });
  }

  return {
    name: team?.name,
    slogan: team?.slogan,
    publicID: team?.public_id,
    wins: team?._count.matches_matches_match_winnerToteams,
    totalMatches:
      (team?._count?.matches_matches_away_team_idToteams ?? 0) +
      (team?._count?.matches_matches_home_team_idToteams ?? 0),
    players: team?.players.map((player) => ({
      firstName: player.first_name,
      lastName: player.last_name,
      publicID: player.public_id,
      slogan: player.slogan ?? "",
      playsIn: team?.public_id ?? "",
    })),
  };
});
