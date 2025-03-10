import { useQuery } from "@tanstack/react-query";

import { ENDPOINTS } from "../endpoints";
import { API, AUTH_API } from "../client";

export const getUserDetails = async () => {
    const response = await AUTH_API.get(ENDPOINTS.GET_LOGGED_USER())
    return response.data;
  };
  
  
  export const useGetUserDetailsQuery = () =>
    useQuery({
      queryKey: ["get-user-details"],
      queryFn: () => getUserDetails(),
      select: (data) => {
        const res = data;
        return res;
      },
    });
  