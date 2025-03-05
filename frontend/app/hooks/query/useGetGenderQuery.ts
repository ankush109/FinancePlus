import { useQuery } from "@tanstack/react-query";

import { ENDPOINTS } from "../endpoints";
import { API } from "../client";

export const getGender = async () => {
    const response = await API.get(ENDPOINTS.GETGENDERS())
    return response.data;
  };
  
  
  export const useGetGenderQuery = () =>
    useQuery({
      queryKey: ["get-genders"],
      queryFn: () => getGender(),
      select: (data) => {
        const res = data;
        return res;
      },
    });
  