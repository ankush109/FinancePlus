export const ENDPOINTS = {
  REGISTER: () => `/auth/register`,
  LOGIN: () => `/auth/login`,
  UPDATE: () => `/user/user-details`,
  DELETE: (user_id: number) => `/user/${user_id}`,
};
