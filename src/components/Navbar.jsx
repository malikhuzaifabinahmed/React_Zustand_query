import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { useUser } from "@/hooks/queries/useUser";
export default function Navbar() {
  const navigate = useNavigate();
  const { data } = useUser();
  console.log(data);
  const handleLogout = async () => {
    await authService.logout();
  };
  return (
    <header className="bg-white shadow">
      <nav className="flex justify-between items-center mx-auto px-4 py-6 container">
        <Link to="/" className="font-bold text-xl">
          My App
        </Link>
        <div className="flex items-center gap-4">
          {data && (
            <>
              <div className="relative group">
                <span className="cursor-pointer">
                  Welcome, {data?.name || "User"}
                </span>

                <div className="group-hover:block right-0 absolute hidden bg-white shadow-lg rounded-md w-48">
                  <button
                    onClick={handleLogout}
                    className="hover:bg-gray-100 disabled:opacity-50 px-4 py-2 w-full text-left text-red-600 text-sm"
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
