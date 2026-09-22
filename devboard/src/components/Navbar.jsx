import { NavLink  } from "react-router";

function Navbar() {
  return (
  <nav className="topbar">
    <div className="topbar-search">
      <input
        type="text"
        placeholder="Search..."
      />
    </div>

    <div className="topbar-actions">
      <button className="new-button">
        + New
      </button>
    </div>
  </nav>
);
}

export default Navbar;