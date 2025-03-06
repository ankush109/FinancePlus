import { useQuery } from "@tanstack/react-query";

import { ENDPOINTS } from "../endpoints";
import { API } from "../client";
import { Gender } from "@/app/types/FormSchema";

export const getAllUsers = async (sort:string|null,gender:Gender,searchTerm:string) => {
    const response = await API.get(ENDPOINTS.GETALLUSERS(sort,gender,searchTerm))
    return response.data;
  };
  
  
  export const useGetAllUsersQuery = (sort:string|null,gender:Gender,searchTerm:string) =>
    useQuery({
      queryKey: ["get-all-users"],
      queryFn: () => getAllUsers(sort,gender,searchTerm),
      select: (data) => {
        const res = data;
        return res;
      },
    });
  