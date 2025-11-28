import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import useAuth from "@/hooks/stores/useAuth";

export const userQueryKey = "profile";

export const useUser = () => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: [userQueryKey],
    queryFn: () => authService.getProfile(),
    enabled: isAuthenticated,
  });
};
