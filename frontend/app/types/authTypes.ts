// types/authTypes.ts
export interface User {
  id: number;
  name: string;
  email: string;
  
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
