import { useMutation } from "@tanstack/react-query";
import { API } from "../client";
import { ENDPOINTS } from "../endpoints";

export const updateUser = async (userData: any) => {
  const response = await API.patch(ENDPOINTS.UPDATE(), userData);
  return response.data;
};

export const useUpdateMutation = () => {
  return useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });
};
