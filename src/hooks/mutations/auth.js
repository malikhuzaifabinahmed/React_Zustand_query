import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";
export const loginKey = "login";

export const useLogin = (options) =>
  useMutation({
    mutationKey: loginKey,
    mutationFn: (credentials) => authService.login(credentials),
    ...options,
  });
