import { GroupWithTeams } from "~/types/Stages";

export class GroupService {
  static generateMatches(groupsWithTeams: GroupWithTeams[]) {
    const matches = [];
    for (const group of groupsWithTeams) {
      const teams = group.teams;
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          matches.push({
            homeTeam: teams[i],
            awayTeam: teams[j],
          });
        }
      }
    }
    return matches;
  }
}
