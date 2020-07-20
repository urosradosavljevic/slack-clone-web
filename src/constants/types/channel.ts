import { User } from "./user";

export interface Channel {
  id: number;
  name: string;
  dm: boolean;
  users: Array<User>;
}
