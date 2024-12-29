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
  return team;
});
