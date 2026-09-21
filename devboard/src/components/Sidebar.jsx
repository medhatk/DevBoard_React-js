import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Code2,
  Sun,
  UserCircle,
  MoreVertical,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          DB
        </div>

        <span>DevBoard</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" end>
        Dashboard
        </NavLink>
        <NavLink to="/tasks">
        Tasks
        </NavLink>
        <NavLink to="/snippets">
        Snippets
        </NavLink>
        </nav>
    </aside>
  );
}

export default Sidebar;