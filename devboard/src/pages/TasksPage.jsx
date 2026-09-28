import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDownWideNarrow, Check, GitBranch, Pencil, RotateCcw, Tag, Trash2 } from "lucide-react";
import TaskForm from "../components/TaskForm";
import FormModal from "../components/FormModal";
import { useTasks } from "../context/TaskContext";

const filters = ["All", "To Do", "In Progress", "Done"];

const TasksPage = () => {
  const { tasks, addTask, editTask: updateTask, deleteTask, updateTaskStatus } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("recent");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("new") === "true" || location.state?.openForm) {
      setEditingTask(null);
      setShowForm(true);
      navigate("/tasks", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const openForm = () => {
      setEditingTask(null);
      setShowForm(true);
    };
    window.addEventListener("open-new-task-form", openForm);
    return () => window.removeEventListener("open-new-task-form", openForm);
  }, []);

  const handleAddTask = (task) => {
    addTask(task);
    setShowForm(false);
  };

  const handleEditTask = (task) => {
    updateTask(task.id, task);
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNew = () => {
    setEditingTask(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) deleteTask(id);
  };

  const completedCount = tasks.filter((task) => task.status === "Done").length;
  const activeCount = tasks.filter((task) => task.status === "In Progress").length;
  const visibleTasks = useMemo(() => {
    const filteredTasks = activeFilter === "All" ? [...tasks] : tasks.filter((task) => task.status === activeFilter);
    if (sortOrder === "title") return filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
    return filteredTasks.reverse();
  }, [tasks, activeFilter, sortOrder]);

  return (
    <div className="tasks-page">
      <header className="tasks-page-heading">
        <div>
          <h1>Tasks</h1>
          <p>{tasks.length} {tasks.length === 1 ? "task" : "tasks"} · {completedCount} completed</p>
        </div>
        <span className="tasks-active-summary"><i /> {activeCount} in progress</span>
      </header>

      {showForm && (
        <FormModal title={editingTask ? "Edit task" : "New task"} onClose={handleCancel}>
          <TaskForm
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            editingTask={editingTask}
            onCancel={handleCancel}
          />
        </FormModal>
      )}

      <div className="tasks-toolbar">
        <div className="task-filter-tabs" role="tablist" aria-label="Filter tasks by status">
          {filters.map((filter) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              className={activeFilter === filter ? "active" : ""}
              key={filter}
              onClick={() => setActiveFilter(filter)}
            >{filter}</button>
          ))}
        </div>
        <div className="tasks-toolbar-actions">
          <div className="task-sort-control">
            <button type="button" className="task-toolbar-button" onClick={() => setShowSortOptions((open) => !open)} aria-expanded={showSortOptions}>
              <ArrowDownWideNarrow /> Sort
            </button>
            {showSortOptions && (
              <div className="task-sort-menu">
                <button type="button" onClick={() => { setSortOrder("recent"); setShowSortOptions(false); }}>Recently added</button>
                <button type="button" onClick={() => { setSortOrder("title"); setShowSortOptions(false); }}>Title A–Z</button>
              </div>
            )}
          </div>
          {!showForm && <button type="button" className="task-add-inline" onClick={handleNew}>+ New task</button>}
        </div>
      </div>

      <section className="task-list" aria-label="Tasks">
        {visibleTasks.length ? visibleTasks.map((task) => {
          const isDone = task.status === "Done";
          const statusClass = task.status === "In Progress" ? "in-progress" : isDone ? "done" : "todo";

          return (
            <article className={`task-list-item ${isDone ? "task-is-done" : ""}`} key={task.id}>
              <button
                type="button"
                className={`task-list-check ${isDone ? "checked" : ""}`}
                aria-label={`Mark ${task.title} as ${isDone ? "To Do" : "Done"}`}
                onClick={() => updateTaskStatus(task.id, isDone ? "To Do" : "Done")}
              >{isDone && <Check />}</button>
              <div className="task-list-main">
                <div className="task-list-title-line">
                  <h2>{task.title}</h2>
                </div>
                {task.description && <p className="task-list-description">{task.description}</p>}
                <div className="task-list-meta">
                  {task.tag && <span className="task-tag"><Tag />{task.tag}</span>}
                  <span className={`task-status ${statusClass}`}>{task.status || "To Do"}</span>
                  {task.repoUrl && <a className="task-repository" href={task.repoUrl} target="_blank" rel="noreferrer"><GitBranch />{task.repoUrl.replace(/^https?:\/\//, "")}</a>}
                </div>
              </div>
              <div className="task-row-actions">
                <button type="button" aria-label={`Change status for ${task.title}`} title="Cycle task status" onClick={() => updateTaskStatus(task.id, task.status === "To Do" ? "In Progress" : task.status === "In Progress" ? "Done" : "To Do")}><RotateCcw /></button>
                <button type="button" aria-label={`Edit ${task.title}`} title="Edit task" onClick={() => handleEdit(task)}><Pencil /></button>
                <button type="button" aria-label={`Delete ${task.title}`} title="Delete task" onClick={() => handleDelete(task.id)}><Trash2 /></button>
              </div>
            </article>
          );
        }) : (
          <div className="tasks-empty-state">
            <div className="tasks-empty-icon"><Check /></div>
            <h2>{tasks.length ? "No tasks in this view" : "No tasks yet"}</h2>
            <p>{tasks.length ? "Choose another status filter to see your tasks." : "Add a task to start planning your work."}</p>
            {!tasks.length && !showForm && <button type="button" onClick={handleNew}>+ Add your first task</button>}
          </div>
        )}
      </section>
    </div>
  );
};

export default TasksPage;
