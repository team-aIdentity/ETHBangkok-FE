export interface UserInfo {
  id: number;
  name: string;
  account: string;
  age: number;
  about: string;
  country: string;
  mbti: string;
  hobby: string;
  profileImage: string;
  competitions: Competition[];
  winningCompetitions: Competition[];
  likesGiven: Like[];
  likesReceived: Like[];
}

export interface Like {
  id: number;
  fromUser: UserInfo;
  toUser: UserInfo;
  competition: Competition;
  createdAt: Date;
}

export interface Competition {
  id: number;
  start_date: Date;
  end_date: Date;
  users: UserInfo[];
  winner: UserInfo;
  likes: Like[];
}
