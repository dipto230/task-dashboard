import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, toggleComplete } from "../features/tasks/taskSlice";
import TaskList from "../components/TaskList";
import FilterButtons from "../components/FilterButtons";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const [filter, setFilter] = useState("all"); // all, completed, pending, overdue
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  // Filtering logic
  const getFilteredTasks = () => {
    const now = new Date();
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      case "overdue":
        return tasks.filter((task) => new Date(task.dueDate) < now && !task.completed);
      default:
        return tasks;
    }
  };

  const handleAddTask = (newTask) => {
    dispatch(addTask({ ...newTask, id: Date.now(), completed: false }));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Task Management Dashboard</h1>

      {/* Task Form */}
      <TaskForm onSubmit={handleAddTask} />

      {/* Filter Buttons */}
      <FilterButtons currentFilter={filter} setFilter={setFilter} />

      {/* Task List */}
      <TaskList
        tasks={getFilteredTasks()}
        onDelete={(id) => dispatch(deleteTask(id))}
        onToggleComplete={(id) => dispatch(toggleComplete(id))}
      />
    </div>
  );
};

export default Dashboard;
