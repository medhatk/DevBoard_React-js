import { NavLink  } from "react-router";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand fw-bold">
          DevBoard
        </NavLink>

        <div className="navbar-nav ms-auto">
          <NavLink to="/" className="nav-link">
            Dashboard
          </NavLink>

          <NavLink to="/tasks" className="nav-link">
            Tasks
          </NavLink>

          <NavLink to="/snippets" className="nav-link">
            Snippets
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;