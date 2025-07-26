import { TournamentSerice } from "@@/server/services/TournamentService";
import { handleTournamentParameter } from "@@/server/utils/request-schemas";
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

  const { stage } = data;

  if (stage === "group") {
    const { teams, registrations, stages } = await $fetch(
      `/api/orga/tournaments/${title}/teams`
    );

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
      isFinalized: false,
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
    }
    return calculatedGroups;
  } else if (stage === "finals") {
    const groupStage = await $fetch(
      `/api/orga/tournaments/${title}/groups`
    );

    if (!groupStage || groupStage.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage:
          "No group stage found. Please finish the group stage first.",
      });
    }

    const advancingTeamsPerGroup = 2; // Assuming 2 teams advance from each group
    const amountOfGroups = groupStage.length;
    const finalStages = TournamentSerice.calculateFinalStages(
      amountOfGroups,
      advancingTeamsPerGroup
    );

    return finalStages
  }
});
