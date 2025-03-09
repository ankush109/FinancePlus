import { useMutation } from "@tanstack/react-query";
import { API, AUTH_API } from "../client";
import { ENDPOINTS } from "../endpoints";

export const ForgotPassword = async (email: string) => {
  const response = await AUTH_API.post(ENDPOINTS.FORGOT_PASSWORD(), { email });
  return response.data;
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: ForgotPassword,
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });
};
