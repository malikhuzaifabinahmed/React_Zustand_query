import React from "react";
import { useUser } from "../../hooks/queries/useUser";

export function Dashboard() {
  const { data: profile, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto p-4 max-w-md">
      <h1 className="mb-4 font-bold text-2xl text-foreground">Welcome to the Home Page</h1>

      {profile && (
        <div className="bg-card text-card-foreground shadow p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="rounded-full w-20 h-20 object-cover"
            />
            <div>
              <h2 className="font-semibold text-xl text-foreground">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
              <p className="text-muted-foreground capitalize">Role: {profile.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
