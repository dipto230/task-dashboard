import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import TaskDetails from "../pages/TaskDetails";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/tasks" element={<Dashboard />} />
      <Route path="/tasks/:id" element={<TaskDetails />} />
    </Routes>
  </Router>
);

export default AppRoutes;
