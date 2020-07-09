import { Team } from "./team";

export interface MeQuery {
  me: Array<User>;
}

export interface User {
  id: number;
  // name: string;
  username: string;
  email?: string;
  teams?: Array<Team>;
  __typename?: string;
}
