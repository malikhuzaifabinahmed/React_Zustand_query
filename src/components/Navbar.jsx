import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { useUser } from "@/hooks/queries/useUser";

export default function Navbar() {
  const navigate = useNavigate();
  const { data } = useUser();
  const handleLogout = async () => {
    await authService.logout();
  };
  return (
    <header className="border-b bg-background">
      <nav className="flex justify-between items-center mx-auto px-4 py-6 container">
        <Link to="/" className="font-bold text-xl text-foreground">
          My App
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/contact" className="text-foreground hover:text-muted">
            Contact
          </Link>
          <Link to="/about" className="text-foreground hover:text-muted">
            About
          </Link>
          {data && (
            <>
              <div className="relative group">
                <span className="cursor-pointer text-foreground">
                  Welcome, {data?.name || "User"}
                </span>

                <div className="group-hover:block right-0 absolute hidden bg-popover text-popover-foreground shadow-lg rounded-md w-48">
                  <button
                    onClick={handleLogout}
                    className="hover:bg-muted disabled:opacity-50 px-4 py-2 w-full text-left text-destructive text-sm"
                  >
                    {"Logout"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
