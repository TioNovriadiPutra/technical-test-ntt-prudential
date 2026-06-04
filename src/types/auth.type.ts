export type LoginInput = {
  username: string;
  password: string;
};

export type LoginDTO = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenDTO = {
  accessToken: string;
  refreshToken: string;
};
