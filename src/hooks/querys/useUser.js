import { useQuery } from '@tanstack/react-query';
import { authService } from '../../services/authService';
import Cookies from 'js-cookie';
export const useUser = () => useQuery({
  queryKey: ['profile'],
  queryFn: () => authService.getProfile(),
  enabled: !!Cookies.get('accessToken'),

});