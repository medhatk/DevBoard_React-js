import { createContext, useContext, useState } from "react";
import { getTasks, saveTasks } from "../utils/localStorage";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(getTasks);

  // Add Task
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      status: task.status || "To Do",
    };

    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Edit Task
  const editTask = (id, updatedData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, ...updatedData }
        : task
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Delete Task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Change Task Status
  const updateTaskStatus = (id, status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, status }
        : task
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        updateTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};