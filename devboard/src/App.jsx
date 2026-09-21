import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Layout from "./components/Layout";

import Dashboard from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import SnippetsPage from "./pages/SnippetsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="snippets" element={<SnippetsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
