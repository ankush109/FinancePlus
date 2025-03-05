export const ENDPOINTS = {
  REGISTER: () => `/auth/register`,
  LOGIN: () => `/auth/login`,
  UPDATE: () => `/user/user-details`,
  DELETE: (user_id: number) => `/user/${user_id}`,
  GETALLUSERS:() => `/user/get-users`,
  GETUSERBYID:(user_id:number) => `/user/${user_id}`,
  UPDATEUSER:(user_id:number) => `/user/${user_id}`,
  GETGENDERS:() => `/user/get-genders`
};
