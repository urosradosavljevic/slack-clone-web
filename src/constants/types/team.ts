import { Channel } from "./channel";
import { User } from "./user";

export interface TeamsArray {
  teams: Array<Team>;
}

export interface Team {
  id: number;
  name: string;
  channels: Array<Channel>;
  admin: boolean;
}
