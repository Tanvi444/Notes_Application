export type UserRegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type UserRegisterReturn = {
  accessToken: string;
};

export type UserLoginPayload = {
  email: string;
  password: string;
};

export type UserLoginReturn = {
  accessToken: string;
};

export type UserProfileReturn = {
  user: UserProfile;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};
