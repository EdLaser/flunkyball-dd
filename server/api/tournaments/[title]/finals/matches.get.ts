export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);

  const finalMatches = await usePrisma().stages.findMany({
    where: {
      tournaments: {
        title,
      },
      sequence: {
        gte: 2
      }
    },
    select: {
      stage_name: true,
      sequence: true,
      matches: {
        select: {
          match_id: true,
          teams_matches_home_team_idToteams: {
            select: {
              id: true,
              public_id: true,
              name: true,
            },
          },
          teams_matches_away_team_idToteams: {
            select: {
              id: true,
              public_id: true,
              name: true,
            },
          },
          teams_matches_match_winnerToteams: {
            select: {
              id: true,
              public_id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return finalMatches;
});
