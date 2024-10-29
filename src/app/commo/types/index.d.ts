export interface User {
  username: string;
  image: {
    png: string;
  };
}

export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
}
