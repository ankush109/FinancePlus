import { useMutation } from "@tanstack/react-query";
import { API, AUTH_API } from "../client";
import { ENDPOINTS } from "../endpoints";

export const ResetPassword = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  const response = await AUTH_API.post(ENDPOINTS.RESET_PASSWORD(token), {
    password,
  });
  return response.data;
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: ResetPassword,
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });
};
