import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNewClick = () => {
    if (location.pathname === "/tasks") {
      window.dispatchEvent(new Event("open-new-task-form"));
    } else if (location.pathname === "/snippets") {
      window.dispatchEvent(new Event("open-new-snippet-form"));
    } else {
      navigate("/tasks?new=true");
    }
  };

  return (
    <nav className="topbar">
      <div className="topbar-search">
        <input
          type="text"
          placeholder="Search tasks and snippets..."
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
