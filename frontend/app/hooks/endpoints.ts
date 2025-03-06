import { Gender } from "../types/FormSchema";

export const ENDPOINTS = {
  REGISTER: () => `/auth/register`,
  LOGIN: () => `/auth/login`,
  UPDATE: () => `/user/user-details`,
  DELETE: (user_id: number) => `/user/${user_id}`,
  GETALLUSERS:(sort:string|null,gender:Gender,searchTerm:string) => `/user/get-users?sort=${sort}&gender=${gender}&search=${searchTerm}`,
  GETUSERBYID:(user_id:number) => `/user/${user_id}`,
  UPDATEUSER:(user_id:number) => `/user/${user_id}`,
  GETGENDERS:() => `/user/get-genders`
};
