import React, { useContext, useState } from "react";
import TaskContext from "../context/TaskContext";

function Dashboard() {
  const { tasks, addTask, markCompleted, deleteTask, editTask } = useContext(TaskContext);
  const [sortBy, setSortBy] = useState("priorityHigh");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editReminder, setEditReminder] = useState("");
  const [newTask, setNewTask] = useState({ title: "", category: "Work", priority: "1", dueDate: "", reminder: "" });

  const handleEditClick = (task) => {
    setEditingTask(task.id);
    setEditText(task.title);
    setEditCategory(task.category);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate);
    setEditReminder(task.reminder);
  };

  const handleSaveEdit = (taskId) => {
    editTask(taskId, {
      title: editText,
      category: editCategory,
      priority: editPriority,
      dueDate: editDueDate,
      reminder: editReminder,
    });
    setEditingTask(null);
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.dueDate) return;
    addTask(newTask);
    setNewTask({ title: "", category: "Work", priority: "1", dueDate: "", reminder: "" });
  };

  const filteredTasks = tasks.filter(task => categoryFilter === "All" || task.category === categoryFilter)
    .sort((a, b) => b.priority - a.priority);

  return (
    <div className="p-4 max-w-lg mx-auto w-full">
      <h2 className="text-xl font-bold text-center mb-4">Task List</h2>

      {/* Add Task Form */}
      <div className="mb-4 border p-4 rounded bg-gray-100">
        <input type="text" placeholder="Task Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="border p-2 w-full rounded mb-2" />
        <select value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="School">School</option>
          <option value="Shopping">Shopping</option>
          <option value="Health">Health</option>
        </select>
        <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} className="border p-2 w-full rounded mb-2" />
        <input type="text" placeholder="Reminder (e.g., 30m, 1h)" value={newTask.reminder} onChange={(e) => setNewTask({ ...newTask, reminder: e.target.value })} className="border p-2 w-full rounded mb-2" />
        <button onClick={handleAddTask} className="bg-green-500 text-white p-2 rounded w-full">Add Task</button>
      </div>

      {/* Sorting & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <select className="w-full sm:w-auto border p-2 rounded" onChange={(e) => setSortBy(e.target.value)}>
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
            <div key={task.id} className="border p-3 rounded shadow-md bg-white">
              {editingTask === task.id ? (
                <div>
                  <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="border p-2 w-full rounded mb-2" />
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
                  <input type="date" value={editDueDate} onChange={(e) => setEditDueDate(e.target.value)} className="border p-2 w-full rounded mb-2" />
                  <input type="text" placeholder="Reminder" value={editReminder} onChange={(e) => setEditReminder(e.target.value)} className="border p-2 w-full rounded mb-2" />
                  <button onClick={() => handleSaveEdit(task.id)} className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
                  <button onClick={() => setEditingTask(null)} className="bg-gray-500 text-white px-3 py-1 rounded ml-2">Cancel</button>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold">{task.title}</h3>
                  <p className="text-sm">{task.category}</p>
                  <p className="text-sm">Reminder: {task.reminder || "None"}</p>
                  <button onClick={() => handleEditClick(task)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
