import { z } from "zod";
import { updateInputSchema } from "./FormSchema";

export interface User {
  id: number;
  name: string;
  email: string;
  
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading :boolean
  error:any
}

export interface EditUserFormProps {
  userId: number;
  userData: z.infer<typeof updateInputSchema>;
}