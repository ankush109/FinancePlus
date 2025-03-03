import { useMutation } from "@tanstack/react-query";
import { API } from "../client";
import { ENDPOINTS } from "../endpoints";

export const login = async (userData: any) => {
  console.log(userData, "taskdata");
  const response = await API.post(ENDPOINTS.LOGIN(), userData);
  return response.data;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });
};
