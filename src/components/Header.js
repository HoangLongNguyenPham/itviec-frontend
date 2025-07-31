import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">ITviec</h1>
        <nav className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-600 font-bold" : "text-gray-600 hover:text-red-600"
            }
          >
            Jobs
          </NavLink>

          <NavLink
            to="/companies"
            className={({ isActive }) =>
              isActive ? "text-red-600 font-bold" : "text-gray-600 hover:text-red-600"
            }
          >
            Companies
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-red-600 font-bold" : "text-gray-600 hover:text-red-600"
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
        </nav>
      </div>
    </header>
  );
}

export default Header;
