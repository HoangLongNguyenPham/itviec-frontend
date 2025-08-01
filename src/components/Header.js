import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const fullName = localStorage.getItem("fullName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    navigate("/login");
  };

  return (
    <header className="navbar navbar-expand-lg" style={{
      background: "linear-gradient(90deg, #91C8E4, #749BC2, #4682A9)"
    }}>
      <div className="container">
        {/* Logo */}
        <NavLink className="navbar-brand fw-bold fs-3 text-light" to="/">
          ITviec
        </NavLink>

        {/* Toggle button (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/">Jobs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/companies">Companies</NavLink>
            </li>
            <li className="nav-item">
              <a
                href="http://localhost:5000/api/v1/recruiters/register"
                className="nav-link text-light"
              >
                For Employers
              </a>
            </li>
          </ul>

          {/* Login/Logout */}
          <div className="d-flex align-items-center ms-3">
            {!fullName ? (
              <>
                <NavLink className="btn btn-outline-light me-2" to="/login">Login</NavLink>
                <NavLink className="btn btn-light" to="/register">Sign Up</NavLink>
              </>
            ) : (
              <>
                <span className="me-3 text-light">Hi, {fullName}</span>
                <button className="btn btn-light" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
