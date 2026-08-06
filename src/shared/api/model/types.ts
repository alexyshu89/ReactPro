export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  name: string;
  avatarPath: string;
  about: string;
  phone: string;
  roles: string[];
  likes: string[];
  favoritesPost: string[];
}
