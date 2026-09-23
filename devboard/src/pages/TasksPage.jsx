import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (task) => setTasks(prev => [...prev, task]);
  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));
  const editTask = (updatedTask) => setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  const updateTaskStatus = (id, status) => setTasks(prev => prev.map(t => t.id === id ? {...t, status} : t));

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteTask(id);
    }
  };

  const toDoTasks = tasks.filter(t => t.status === "To Do");
  const inProgressTasks = tasks.filter(t => t.status === "In Progress");
  const doneTasks = tasks.filter(t => t.status === "Done");

  return (
    <div className="container py-4">
      <h2>Tasks</h2>
      <p>Manage your development tasks.</p>

      <TaskForm
        onAddTask={addTask}
        onEditTask={editTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />

      {tasks.length === 0 && !editingTask ? (
        <div className="text-center py-5 border rounded bg-light mt-4">
          <h4>Nothing ToDo Now </h4>
          <p className="text-muted">Empty State - Add your first Task</p>
        </div>
      ) : (
        <div className="row mt-4">
          <div className="col-md-4">
            <h5 className="text-center p-2 bg-secondary text-white rounded">To Do ({toDoTasks.length})</h5>
            {toDoTasks.map(task => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={setEditingTask} onStatusChange={updateTaskStatus} />
            ))}
          </div>
          <div className="col-md-4">
            <h5 className="text-center p-2 bg-warning rounded">In Progress ({inProgressTasks.length})</h5>
            {inProgressTasks.map(task => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={setEditingTask} onStatusChange={updateTaskStatus} />
            ))}
          </div>
          <div className="col-md-4">
            <h5 className="text-center p-2 bg-success text-white rounded">Done ({doneTasks.length})</h5>
            {doneTasks.map(task => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={setEditingTask} onStatusChange={updateTaskStatus} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
