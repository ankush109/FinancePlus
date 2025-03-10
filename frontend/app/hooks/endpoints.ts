import { Gender } from "../types/FormSchema";

export const ENDPOINTS = {
  REGISTER: () => `/auth/register`,
  LOGIN: () => `/auth/login`,
  GET_LOGGED_USER: () => `/user/user-details`,
  UPDATE: () => `/user/user-details`,
  DELETE: (user_id: number) => `/user/${user_id}`,
  GETALLUSERS:(sort:string|null,gender:Gender,searchTerm:string,pageOffset:number) => `/user/get-users?sort=${sort}&gender=${gender}&search=${searchTerm}&page=${pageOffset}`,
  GETUSERBYID:(user_id:number) => `/user/${user_id}`,
  UPDATEUSER:(user_id:number) => `/user/${user_id}`,
  GETGENDERS:() => `/user/get-genders`,
  FORGOT_PASSWORD:() => `/user/forgot-password`,
  RESET_PASSWORD:(token:string) => `/user/reset-password/${token}`,
};
