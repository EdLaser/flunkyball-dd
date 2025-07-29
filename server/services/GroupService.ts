import { InternalGroupWithTeams } from "@@/shared/types/Groups";

export class GroupService {
  static generateMatches(groupsWithTeams: InternalGroupWithTeams[]) {
    const matches = [];
    for (const group of groupsWithTeams) {
      const teams = group.teams;
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          matches.push({
            groupdId: group.groupId,
            stageId: group.stageId,
            homeTeam: teams[i],
            awayTeam: teams[j],
          });
        }
      }
    }
    return matches;
  }
}
