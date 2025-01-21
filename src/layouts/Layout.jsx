import { Outlet } from "react-router-dom";

import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import useTheme from "@/hooks/stores/useTheme";
import ThemeToggle from "@/components/ThemToggle";

export function Layout() {

  const { theme } = useTheme()
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto px-4 py-8 container">
        <Outlet />
      </main>
      <ThemeToggle />
      <Toaster theme={theme} richColors />
    </div>
  );
}
