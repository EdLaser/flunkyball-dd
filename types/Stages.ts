export type GroupWithTeams = {
  group: string;
  teams: {
    name: string;
    publicID: string | null;
    players: { firstName: string; lastName: string | null }[];
  }[];
  isFinalized: boolean | null;
};
