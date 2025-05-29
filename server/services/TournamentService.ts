const teamThresholds = [2, 4, 8, 16, 32, 46];

const groupAmount: {
  [key: number]: number;
} = {
  8: 4,
  16: 4,
  32: 8,
  46: 8,
};

export class TournamentSerice {
  /**
   * Calculates the total number of teams based on the given number of players.
   * Uses predefined team thresholds to determine the number of complete teams.
   *
   * @param {number} players - The total number of players.
   * @returns {[number, number]} An array where the first element is the number of complete teams
   *                             and the second element is the number of remaining players.
   */
  static calculateTotalTeams(players: number): [number, number] {
    for (let i = 0; i < teamThresholds.length; i++) {
      if (players >= teamThresholds[i] && players < teamThresholds[i + 1]) {
        return [teamThresholds[i], players - teamThresholds[i]];
      }
    }
    return [0, players];
  }

  static calculateGroupPhase([teams, needsDvision]: [number, number]): {
    group: string;
    teams: number;
  }[] {
    const groupPhase = [];
    const groupCount = groupAmount[teams] || 0;

    for (let i = 0; i < groupCount; i++) {
      groupPhase.push({
        group: `Gruppe ${String.fromCharCode(65 + i)}`,
        teams: Math.floor(teams / groupCount),
      });
    }

    if (needsDvision > 0) {
      const lastGroupIndex = groupPhase.length - 1;
      groupPhase[lastGroupIndex].teams += needsDvision;
    }

    return groupPhase;
  }

  static calculateFinalStages(teams: number): {
    stage: string;
    teams: number;
  }[] {
    const finalStages = [];
    const knockoutRounds = Math.log2(teams);

    for (let i = 0; i < knockoutRounds; i++) {
      finalStages.push({
        stage: `Knockout Round ${i + 1}`,
        teams: Math.pow(2, knockoutRounds - i),
      });
    }

    return finalStages;
  }
}
