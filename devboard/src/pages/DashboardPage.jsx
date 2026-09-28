import { Link } from "react-router-dom";
import {
  Check,
  Circle,
  CircleCheck,
  Code2,
  ListTodo,
  MoveRight,
} from "lucide-react";
import { useTasks } from "../context/TaskContext";
import { useSnippets } from "../context/SnippetContext";

const statusClass = {
  "To Do": "todo",
  "In Progress": "in-progress",
  Done: "done",
};

function DashboardPage() {
  const { tasks, updateTaskStatus } = useTasks();
  const { snippets } = useSnippets();
  const doneCount = tasks.filter((task) => task.status === "Done").length;
  const inProgressCount = tasks.filter((task) => task.status === "In Progress").length;
  const todoCount = tasks.filter((task) => task.status === "To Do").length;
  const completionRate = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;
  const languagesCount = new Set(snippets.map((snippet) => snippet.language).filter(Boolean)).size;
  const recentTasks = [...tasks].slice(-4).reverse();
  const recentSnippets = [...snippets].slice(-4).reverse();

  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? "Good morning" : greetingHour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="dashboard-page">
      <header className="dashboard-heading">
        <div className="eyebrow">PERSONAL OVERVIEW <span /> Local data</div>
        <h1>{greeting}</h1>
        <p>Here's what's on your plate</p>
      </header>

      <section className="dashboard-stats" aria-label="Overview">
        <article className="dashboard-stat-card">
          <div className="dashboard-stat-top"><span>Total tasks</span><ListTodo /></div>
          <div className="dashboard-stat-bottom"><strong>{tasks.length}</strong><span>{todoCount} to do</span></div>
        </article>
        <article className="dashboard-stat-card">
          <div className="dashboard-stat-top"><span>Completed</span><CircleCheck /></div>
          <div className="dashboard-stat-bottom"><strong>{doneCount}<small> / {tasks.length}</small></strong><span className="completion-pill">{completionRate}% completion</span></div>
        </article>
        <article className="dashboard-stat-card">
          <div className="dashboard-stat-top"><span>Snippets saved</span><Code2 /></div>
          <div className="dashboard-stat-bottom"><strong>{snippets.length}</strong><span>{languagesCount} {languagesCount === 1 ? "language" : "languages"}</span></div>
        </article>
      </section>

      <section className="sprint-card" aria-label="Task progress">
        <div className="sprint-heading"><strong>Task progress</strong><span>{doneCount} of {tasks.length} tasks completed</span></div>
        <div className="progress-track" role="img" aria-label={`${completionRate}% of tasks completed`}>
          {tasks.length > 0 && <>
            <span className="progress-segment todo-segment" style={{ width: `${(todoCount / tasks.length) * 100}%` }} />
            <span className="progress-segment active-segment" style={{ width: `${(inProgressCount / tasks.length) * 100}%` }} />
            <span className="progress-segment done-segment" style={{ width: `${(doneCount / tasks.length) * 100}%` }} />
          </>}
        </div>
        <div className="progress-legend">
          <span><i className="legend-dot todo-dot" />To Do ({todoCount})</span>
          <span><i className="legend-dot active-dot" />In Progress ({inProgressCount})</span>
          <span><i className="legend-dot done-dot" />Done ({doneCount})</span>
        </div>
      </section>

      <div className="dashboard-lists">
        <section className="dashboard-list-section">
          <div className="dashboard-list-heading">
            <h2>Recent tasks <span>{recentTasks.length}</span></h2>
            <Link to="/tasks">View all <MoveRight /></Link>
          </div>
          <div className="dashboard-list-card">
            {recentTasks.length ? recentTasks.map((task) => (
              <div className="dashboard-task-row" key={task.id}>
                <button
                  type="button"
                  className={`task-check ${task.status === "Done" ? "is-checked" : ""}`}
                  aria-label={`${task.status === "Done" ? "Mark" : "Mark"} ${task.title} as ${task.status === "Done" ? "To Do" : "Done"}`}
                  onClick={() => updateTaskStatus(task.id, task.status === "Done" ? "To Do" : "Done")}
                >{task.status === "Done" && <Check />}</button>
                <span className={`dashboard-task-title ${task.status === "Done" ? "is-done" : ""}`}>{task.title}</span>
                <div className="dashboard-row-badges">
                  {task.tag && <span className="tag-pill">{task.tag}</span>}
                  <span className={`status-pill ${statusClass[task.status] || "todo"}`}>{task.status || "To Do"}</span>
                </div>
              </div>
            )) : <div className="dashboard-empty"><Circle /><span>No tasks yet</span><Link to="/tasks?new=true">Add your first task</Link></div>}
          </div>
        </section>

        <section className="dashboard-list-section">
          <div className="dashboard-list-heading">
            <h2>Recent snippets <span>{recentSnippets.length}</span></h2>
            <Link to="/snippets">View all <MoveRight /></Link>
          </div>
          <div className="dashboard-list-card">
            {recentSnippets.length ? recentSnippets.map((snippet) => (
              <div className="dashboard-snippet-row" key={snippet.id}>
                <Code2 />
                <span className="dashboard-snippet-title">{snippet.title}</span>
                {snippet.language && <span className="language-pill">{snippet.language}</span>}
              </div>
            )) : <div className="dashboard-empty"><Code2 /><span>No snippets yet</span><Link to="/snippets">Save your first snippet</Link></div>}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;
