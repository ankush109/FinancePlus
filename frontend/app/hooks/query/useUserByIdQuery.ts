import { useQuery } from "@tanstack/react-query";

import { ENDPOINTS } from "../endpoints";
import { API } from "../client";

export const getUserByID = async (user_id:number) => {
    const response = await API.get(ENDPOINTS.GETUSERBYID(user_id))
    return response.data;
  };
  
  
  export const useGetUserByIdQuery = (user_id:number) =>
    useQuery({
      queryKey: ["user-details",user_id],
      queryFn: () => getUserByID(user_id),
      select: (data) => {
        const res = data;
        return res;
      },
    });
  