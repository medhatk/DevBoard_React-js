import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("new") === "true" || location.state?.openForm) {
      setEditingTask(null);
      setShowForm(true);
     
      navigate("/tasks", { replace: true });
    }
  }, [location]);

  
  useEffect(() => {
    const openForm = () => {
      setEditingTask(null);
      setShowForm(true);
    };
    window.addEventListener("open-new-task-form", openForm);
    return () => window.removeEventListener("open-new-task-form", openForm);
  }, []);

  const addTask = (task) => {
    setTasks(prev => [...prev, task]);
    setShowForm(false);
  };
  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));
  const editTask = (updatedTask) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    setShowForm(false);
    setEditingTask(null);
  };
  const updateTaskStatus = (id, status) => setTasks(prev => prev.map(t => t.id === id ? {...t, status} : t));

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
    if (window.confirm("Are you sure you want to delete?")) deleteTask(id);
  };

  const toDoTasks = tasks.filter(t => t.status === "To Do");
  const inProgressTasks = tasks.filter(t => t.status === "In Progress");
  const doneTasks = tasks.filter(t => t.status === "Done");

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-0">Tasks</h2>
          <p className="text-muted mb-0">Manage your development tasks.</p>
        </div>
        {!showForm && (
          <button className="btn btn-primary" onClick={handleNew}>
            + New Task
          </button>
        )}
      </div>

      {showForm && (
        <TaskForm
          onAddTask={addTask}
          onEditTask={editTask}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          onCancel={handleCancel}
        />
      )}

      {tasks.length === 0 && !showForm ? (
        <div className="text-center py-5 border rounded bg-light mt-4">
          <h4> لا يوجد مهام حالية</h4>
          <p className="text-muted">اضغط علي new لأضافه مهام جديدة</p>
          <button className="btn btn-primary mt-2" onClick={handleNew}>+ New Task</button>
        </div>
      ) : (
        <div className="row mt-4">
          <div className="col-md-4">
            <h5 className="text-center p-2 bg-secondary text-white rounded">To Do ({toDoTasks.length})</h5>
            {toDoTasks.map(task => <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} onStatusChange={updateTaskStatus} />)}
          </div>
          <div className="col-md-4">
            <h5 className="text-center p-2 bg-warning rounded">In Progress ({inProgressTasks.length})</h5>
            {inProgressTasks.map(task => <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} onStatusChange={updateTaskStatus} />)}
          </div>
          <div className="col-md-4">
            <h5 className="text-center p-2 bg-success text-white rounded">Done ({doneTasks.length})</h5>
            {doneTasks.map(task => <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} onStatusChange={updateTaskStatus} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;