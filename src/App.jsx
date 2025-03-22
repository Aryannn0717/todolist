import { React }  from "react";
import { TaskProvider } from "./context/TaskContext";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <TaskProvider>
      <ToastContainer />
      <Dashboard />
    </TaskProvider>
  );
}

export default App;