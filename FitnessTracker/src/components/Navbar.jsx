import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">FitTrack MVP</div>

        <nav className="navlinks" aria-label="Primary navigation">
          <NavLink to="/" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
            Home
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
            Explore
          </NavLink>
          <NavLink to="/builder" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
            Builder
          </NavLink>
          <NavLink to="/log" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
            Log
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
            Progress
          </NavLink>
        </nav>
      </div>
    </header>
  );
}