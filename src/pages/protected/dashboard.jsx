import React from "react";
import { useUser } from "../../hooks/queries/useUser";

export function Dashboard() {
  const { data: profile, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto p-4 max-w-md">
      <h1 className="mb-4 font-bold text-2xl">Welcome to the Home Page</h1>

      {profile && (
        <div className="bg-white shadow p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="rounded-full w-20 h-20 object-cover"
            />
            <div>
              <h2 className="font-semibold text-xl">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
              <p className="text-gray-500 capitalize">Role: {profile.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
