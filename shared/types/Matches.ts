export type Match = {
  matchId: string;
  homeTeam: {
    name: string;
    id: string;
  };
  awayTeam: {
    name: string;
    id: string;
  };
  winnerTeam: {
    name: string;
    id: string;
  } | null;
};
