import { useQuery } from "@tanstack/react-query";

import { ENDPOINTS } from "../endpoints";
import { API } from "../client";
import { Gender } from "@/app/types/FormSchema";

export const getAllUsers = async (sort:string|null,gender:Gender,searchTerm:string,pageOffset:number) => {
    const response = await API.get(ENDPOINTS.GETALLUSERS(sort,gender,searchTerm,pageOffset))
    return response.data;
  };
  
  
  export const useGetAllUsersQuery = (sort:string|null,gender:Gender,searchTerm:string,pageOffset:number) =>
    useQuery({
   queryKey: ["get-all-users", sort, gender, searchTerm, pageOffset],
      queryFn: () => getAllUsers(sort,gender,searchTerm,pageOffset),
      select: (data) => {
        const res = data;
        return res;
      },
    });
  