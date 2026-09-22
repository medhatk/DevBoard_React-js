import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Code2,
  Sun,
} from "lucide-react";
import logoIcon from "../assets/logo-icon.png";
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <img src={logoIcon} alt="DevBoard" />
        </div>

        <span>DevBoard</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" end>
          <LayoutDashboard />
          <span> Dashboard</span>
        </NavLink>
        <NavLink to="/tasks">
          <CheckSquare />
          <span> Tasks</span>
        </NavLink>
        <NavLink to="/snippets">
          <Code2 />
          <span> Snippets</span>
        </NavLink>
        </nav>
        <div className="sidebar-bottom">
          <button className="sidebar-option">
            <Sun />
            <span>Appearance</span>
          </button>
        </div>
    </aside>
  );
}

export default Sidebar;
