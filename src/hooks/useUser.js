import { useQuery } from '@tanstack/react-query';
import { authService } from '../services/authService';

export const useUser = () => useQuery({
  queryKey: ['profile'],
  queryFn: () => authService.getProfile(accessToken),
  enabled: !!accessToken,
});