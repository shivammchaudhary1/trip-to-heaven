export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: string;
  isActive?: boolean;
}

export interface IUserExt extends IUser {
  timestamps: string;
  versionKey: string;
}

export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}
