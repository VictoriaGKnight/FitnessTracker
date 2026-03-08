import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">FitTrack</div>

        <nav className="navlinks" aria-label="Primary navigation">
          <NavLink to="/" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
            Home
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
            Explore
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/builder" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
                Builder
              </NavLink>
              <NavLink to="/log" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
                Log
              </NavLink>
              <NavLink to="/progress" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
                Progress
              </NavLink>
            </>
          )}
        </nav>

        <div className="navlinks">
          {isAuthenticated ? (
            <>
              <span className="navlink">👤 {user.username}</span>
              {isAdmin() && <span className="navlink">Admin</span>}
              <button className="btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}