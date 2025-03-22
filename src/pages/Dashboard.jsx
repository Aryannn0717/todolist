import React, { useContext, useState } from "react";
import TaskContext from "../context/TaskContext";

function Dashboard() {
  const { tasks, markCompleted, deleteTask } = useContext(TaskContext);
  const [sortBy, setSortBy] = useState("dueDateAsc");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  const handleEditClick = (task) => {
    setEditingTask(task.id);
    setEditText(task.title);
    setEditCategory(task.category);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate);
  };

  const handleSaveEdit = (taskId) => {
    editTask(taskId, {
      title: editText,
      category: editCategory,
      priority: editPriority,
      dueDate: editDueDate,
    });
    setEditingTask(null);
  };
  
  const filterAndSortTasks = () => {
    let filteredTasks = [...tasks];

    if (categoryFilter !== "All") {
      filteredTasks = filteredTasks.filter((task) => task.category === categoryFilter);
    }

    switch (sortBy) {
      case "dueDateAsc":
        filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case "dueDateDesc":
        filteredTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        break;
      case "priorityHigh":
        filteredTasks.sort((a, b) => b.priority - a.priority);
        break;
      case "priorityLow":
        filteredTasks.sort((a, b) => a.priority - b.priority);
        break;
      case "completed":
        filteredTasks = filteredTasks.filter((task) => task.completed);
        break;
      case "incomplete":
        filteredTasks = filteredTasks.filter((task) => !task.completed);
        break;
      default:
        break;
    }

    return filteredTasks;
  };

  const filteredTasks = filterAndSortTasks();

  return (
    <div className="p-4 max-w-lg mx-auto w-full">
      <h2 className="text-xl font-bold text-center mb-4">Task List</h2>

      {/* Sorting & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <select className="w-full sm:w-auto border p-2 rounded" onChange={(e) => setSortBy(e.target.value)}>
          <option value="dueDateAsc">Due Date (Asc)</option>
          <option value="dueDateDesc">Due Date (Desc)</option>
          <option value="priorityHigh">Priority (High)</option>
          <option value="priorityLow">Priority (Low)</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <select className="w-full sm:w-auto border p-2 rounded" onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="School">School</option>
          <option value="Shopping">Shopping</option>
          <option value="Health">Health</option>
        </select>
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <p className="text-center">No tasks available.</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`border p-3 rounded shadow-md bg-white ${
                task.completed ? "line-through bg-gray-100" : ""
              } ${new Date(task.dueDate) < new Date() ? "border-red-500" : ""}`}
            >
              {editingTask === task.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border p-1 w-full rounded"
                  />
                  <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="School">School</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health">Health</option>
                  </select>
                  <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                    <option value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                  </select>
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="border p-1 w-full rounded"
                  />
                  <button onClick={() => handleSaveEdit(task.id)} className="bg-blue-500 text-white p-1 rounded">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3 className="font-bold">{task.title}</h3>
                  <p className="text-sm">{task.category}</p>
                  <button onClick={() => handleEditClick(task)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}          

export default Dashboard;
