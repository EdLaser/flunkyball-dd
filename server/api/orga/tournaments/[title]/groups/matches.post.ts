import { GroupService } from "@@/server/services/GroupService";
import { handleTournamentParameter } from "@@/server/utils/request-schemas";

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
      group_id: true,
      is_finalized: true,
      group_registrations: {
        select: {
          teams: {
            select: {
              id: true,
              public_id: true,
              name: true,
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
      stage_id: true,
    },
  });
  const transformedGroupStage = groupStage.map((group) => ({
    group: group.group_name,
    groupId: group.group_id,
    isFinalized: group.is_finalized,
    stageId: group.stage_id,
    teams: group.group_registrations.map((registration) => ({
      publicID: registration.teams.public_id,
      id: registration.teams.id,
      name: registration.teams.name,
      players: registration.teams.players.map((player) => ({
        firstName: player.first_name,
        lastName: player.last_name,
      })),
    })),
  }));

  const calculatedGroupMatches = GroupService.generateMatches(
    transformedGroupStage
  );
  if (
    !calculatedGroupMatches.every(
      (match) => match.homeTeam.id && match.awayTeam.id
    )
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid match data",
    });
  }
  const batch = await usePrisma(event).matches.createMany({
    data: calculatedGroupMatches.map((match) => ({
      home_team_id: match.homeTeam.id,
      away_team_id: match.awayTeam.id,
      stage_id: match.stageId,
      group_id: match.groupdId,
    })),
  });

  return batch.count;
});
