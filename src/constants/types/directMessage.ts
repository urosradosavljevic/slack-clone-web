export interface DirectMessage {
  id: number;
  text: string;
  team: {
    id: number;
  };
  receiver: {
    id: number;
    username: string;
  };
  sender: {
    id: number;
    username: string;
  };
  createdAt: string;
}
