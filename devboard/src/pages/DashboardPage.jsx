import { Import } from "lucide-react";
import { useTasks } from "../context/TaskContext";
import { useSnippets } from "../context/SnippetContext";

function DashboardPage() {
  const { tasks } = useTasks();
  const { snippets } = useSnippets();

  return (
    <div>
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back to DevBoard</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-label">Total Tasks</span>
          <strong className="stat-value">{tasks.length}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Total Snippets</span>
          <strong className="stat-value">{snippets.length}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">In Progress</span>
          <strong className="stat-value">0</strong>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;