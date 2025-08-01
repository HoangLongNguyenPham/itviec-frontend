import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const fullName = localStorage.getItem("fullName"); // lấy fullName từ localStorage

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    navigate("/login");
  };

  return (
    <header className="shadow bg-gradient-to-r from-[#FFFBDE] via-[#91C8E4] via-[#749BC2] to-[#4682A9]">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">ITviec</h1>
        <nav className="space-x-6 flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-600 font-bold" : "text-gray-800 hover:text-red-600"
            }
          >
            Jobs
          </NavLink>

          <NavLink
            to="/companies"
            className={({ isActive }) =>
              isActive ? "text-red-600 font-bold" : "text-gray-800 hover:text-red-600"
            }
          >
            Companies
          </NavLink>

          {/* Link For Employers */}
          <NavLink
            to="/for-employers"
            className="text-gray-800 hover:text-red-600 font-medium"
          >
            For Employers
          </NavLink>

          {!fullName ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-red-600 font-bold" : "text-gray-800 hover:text-red-600"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-gray-900 font-medium">Hi, {fullName}</span>
              <button
                onClick={handleLogout}
                className="ml-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
