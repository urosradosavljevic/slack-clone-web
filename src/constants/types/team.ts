import { Channel } from "./channel";

export interface TeamsArray {
  teams: Array<Team>;
}

export interface Team {
  id: number;
  name: string;
  channels: Array<Channel>;
  admin: boolean;
}
