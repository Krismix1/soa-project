export interface LoginResponse {
  access_token: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
}
