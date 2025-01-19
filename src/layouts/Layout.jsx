import { Outlet } from "react-router-dom";

import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

export function Layout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto px-4 py-8 container">
        <Outlet />
      </main>
      <Toaster richColors />
    </div>
  );
}
