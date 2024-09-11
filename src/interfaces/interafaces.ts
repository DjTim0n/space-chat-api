export interface IUser {
  username: string;
  password: string;
  avatarUrl?: string;
  isOnline?: boolean;
  lastActive?: Date;
}
