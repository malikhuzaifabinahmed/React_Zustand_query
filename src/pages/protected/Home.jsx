import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/useAuthStore';
import { authService } from '../../services/authService';

export function Home() {
  const { accessToken } = useAuthStore();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.getProfile(accessToken),
    enabled: !!accessToken,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>

      {profile && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
              <p className="text-gray-500 capitalize">Role: {profile.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}