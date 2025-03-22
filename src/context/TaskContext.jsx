import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Function to add a new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Function to mark a task as completed
  const markCompleted = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const editTask = (taskId, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };
  

  // 🔔 Check tasks every minute for reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      tasks.forEach((task) => {
        const taskDue = new Date(task.dueDate);
        const timeDifference = taskDue - now;

        // Show a reminder 10 minutes before the task is due
        if (timeDifference > 0 && timeDifference < 10 * 60 * 1000) {
          toast.warn(`Reminder: "${task.title}" is due soon!`, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, markCompleted, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
