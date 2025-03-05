import { useMutation } from "@tanstack/react-query";
import { API, AUTH_API } from "../client";
import { ENDPOINTS } from "../endpoints";

export const updateUser = async ({ user_id, userData }: { user_id: any; userData: any }) => {
  const response = await API.patch(ENDPOINTS.UPDATEUSER(user_id), userData);
  return response.data;
};

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
};
