import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

import Navbar from './Navbar';

export function Layout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);



  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>

  );
}