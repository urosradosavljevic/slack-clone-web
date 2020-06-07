export interface Message {
  id: number;
  text: string;
  channel: {
    id: number;
  };
  user: {
    id: number;
    username: string;
  };
  createdAt: string;
}
