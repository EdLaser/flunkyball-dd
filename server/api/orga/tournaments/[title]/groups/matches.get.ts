export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);

  const groupStage = await usePrisma(event).groups.findMany({
    where: {
      tournaments: {
        title,
      },
      stages: {
        stage_name: "group",
      },
    },
    select: {
      group_name: true,
      matches: {
        select: {
          match_id: true,
          teams_matches_away_team_idToteams: {
            select: {
              name: true,
              id: true,
              public_id: true,
            },
          },
          teams_matches_home_team_idToteams: {
            select: {
              name: true,
              id: true,
              public_id: true,
            },
          },
          teams_matches_match_winnerToteams: {
            select: {
              name: true,
              id: true,
              public_id: true,
            },
          },
        },
      },
      stage_id: true,
    },
  });

  return groupStage.map((group) => {
    return {
      groupName: group.group_name,
      matches: group.matches.map((match) => ({
        matchId: match.match_id,
        homeTeam: {
          name: match.teams_matches_home_team_idToteams.name,
          id: match.teams_matches_home_team_idToteams.id,
          publicId: match.teams_matches_home_team_idToteams.public_id,
        },
        awayTeam: {
          name: match.teams_matches_away_team_idToteams.name,
          id: match.teams_matches_away_team_idToteams.id,
          publicId: match.teams_matches_away_team_idToteams.public_id,
        },
        winnerTeam: match.teams_matches_match_winnerToteams
          ? {
              name: match.teams_matches_match_winnerToteams.name,
              id: match.teams_matches_match_winnerToteams.id,
              publicId: match.teams_matches_match_winnerToteams.public_id,
            }
          : null,
      })),
      stageId: group.stage_id,
    };
  });
});
