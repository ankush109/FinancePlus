import { useQuery } from "@tanstack/react-query";

import { ENDPOINTS } from "../endpoints";
import { API } from "../client";

export const getAllUsers = async () => {
    const response = await API.get(ENDPOINTS.GETALLUSERS())
    return response.data;
  };
  
  
  export const useGetAllUsersQuery = () =>
    useQuery({
      queryKey: ["get-all-users"],
      queryFn: () => getAllUsers(),
      select: (data) => {
        const res = data;
        return res;
      },
    });
  