import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Code2,
  Moon,
  Sun,
} from "lucide-react";
import logoIcon from "../assets/logo-icon.png";
import { useTheme } from "../context/ThemeContext";
function Sidebar() {
  const { theme, toggleTheme } = useTheme();
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
          <button className="sidebar-option" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} aria-pressed={theme === "dark"}>
            {theme === "dark" ? <Sun /> : <Moon />}
            <span>Appearance</span>
            <span className="theme-mode-label">{theme === "dark" ? "Dark" : "Light"}</span>
          </button>
        </div>
    </aside>
  );
}

export default Sidebar;
