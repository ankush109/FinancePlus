import { useMutation } from "@tanstack/react-query";
import { API } from "../client";
import { ENDPOINTS } from "../endpoints";

export const deleteUser = async (user_id: number) => {
  const response = await API.delete(ENDPOINTS.DELETE(user_id));
  return response.data;
};

export const useDeleteMutation = () => {
  return useMutation({
    mutationFn: deleteUser,
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });
};
