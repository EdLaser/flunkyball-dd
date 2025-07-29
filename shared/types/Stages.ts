export type GroupWithTeams = {
  group: string;
  isFinalized: boolean | null;
  teams: {
    name: string;
    publicID: string | null;
    players: { firstName: string; lastName: string | null }[];
  }[];
};
