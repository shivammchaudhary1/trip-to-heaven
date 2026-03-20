export interface IUser {
  name: string;
  email: string;
  password: string;
  mobileNumber?: number;
  role?: string[];
  dateOfBirth?: Date;
  isMarried?: boolean;
  gender?: string;
  isActive?: boolean;
  profilePicture?: string;
  bio?: string;
  lastLogin?: Date;
  preferences?: {
    newsletter?: boolean;
    notifications?: boolean;
  };
}

export interface IUserExt extends IUser {
  timestamps: string;
  versionKey: string;
}

export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  role: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}
