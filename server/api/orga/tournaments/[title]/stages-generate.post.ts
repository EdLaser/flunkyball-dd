import { GroupService } from "~/server/services/GroupService";
import { TournamentSerice } from "~/server/services/TournamentService";
import { handleTournamentParameter } from "~/server/utils/request-schemas";
import { GroupWithTeams } from "~/types/Stages";

export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);

  const { data, success } = await readValidatedBody(
    event,
    stageSchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid stage title",
    });
  }

  const { teams, registrations, stages } = await $fetch(
    `/api/orga/tournaments/${title}/teams`
  );

  const { stage } = data;

  if (stage === "group") {
    const groupPhase = TournamentSerice.calculateGroupPhase([
      teams[0],
      teams[1],
    ]);

    let groupStage = stages.find((stage) => stage.stage_name === "group");

    if (!groupStage) {
      groupStage = await usePrisma(event).stages.create({
        data: {
          stage_name: "group",
          sequence: 1,
          tournaments: {
            connect: {
              title,
            },
          },
        },
      });
    }

    const calculatedGroups: GroupWithTeams[] = groupPhase.map((group) => ({
      group: group.group,
      teams: [],
    }));

    while (registrations.length > 0) {
      // Get the max number of teams per group to ensure even distribution
      // Use maxTeams value from each group in groupPhase
      const groupMaxTeams = Object.fromEntries(
        groupPhase.map((group) => [group.group, group.teams])
      );

      // Find groups that haven't reached their max capacity
      const availableGroups = calculatedGroups.filter(
        (group) => group.teams.length < groupMaxTeams[group.group]
      );

      // If all groups are full, break out of the loop
      if (availableGroups.length === 0) break;

      // Pick a random group from available ones
      const randomGroupIndex = Math.floor(
        Math.random() * availableGroups.length
      );
      const selectedGroup = availableGroups[randomGroupIndex];

      // Find the actual index in calculatedGroups
      const actualGroupIndex = calculatedGroups.findIndex(
        (group) => group.group === selectedGroup.group
      );

      // Pick a random team from registrations
      const randomRegistrationIndex = Math.floor(
        Math.random() * registrations.length
      );
      const randomTeam = registrations.splice(randomRegistrationIndex, 1)[0];

      // Add the team to the selected group
      calculatedGroups[actualGroupIndex].teams.push({
        name: randomTeam.name,
        publicID: randomTeam.public_id,
        players: randomTeam.players.map((player) => ({
          firstName: player.first_name,
          lastName: player.last_name,
        })),
      });

      const matches = GroupService.generateMatches(calculatedGroups);

      await usePrisma(event).matches.createMany({
        data: matches.map((match) => ({
          home_team_id: "",
          away_team_id: "",
          stage_id: groupStage.stage_id,
          group_id: "",
        })),
      });
    }
    return calculatedGroups;
  } else {
    return [];
  }
});
