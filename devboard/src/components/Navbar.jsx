import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNewClick = () => {
    if (location.pathname === "/tasks") {
      window.dispatchEvent(new Event("open-new-task-form"));
    } else {
      navigate("/tasks?new=true");
    }
  };

  return (
    <nav className="topbar">
      <div className="topbar-search">
        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="topbar-actions">
        <button className="new-button" onClick={handleNewClick}>
          + New
        </button>
      </div>
    </nav>
  );
}

export default Navbar;