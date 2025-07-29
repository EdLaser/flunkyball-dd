export type InternalGroupWithTeams = {
    group: string;
    groupId: string;
    stageId: string;
    isFinalized: boolean | null;
    teams: {
        id: string;
        name: string;
        publicID: string | null;
        players: { firstName: string; lastName: string | null }[];
    }[];
}