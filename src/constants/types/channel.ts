import { User } from "./user";

export interface Channel {
  id: number;
  name: string;
  users: Array<User>;
}
