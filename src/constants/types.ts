export interface TeamItem {
  id: number;
  name: string;
  owner?: {
    id: number;
    name: string;
  };
  channels: [
    {
      id: number;
      name: string;
    }
  ];
}

export interface AllTeamsArray {
  allTeams: Array<TeamItem>;
  inviteTeams?: Array<TeamItem>;
}
