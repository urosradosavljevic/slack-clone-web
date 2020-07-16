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
  url: string;
  filetype: string;
  createdAt: string;
}
