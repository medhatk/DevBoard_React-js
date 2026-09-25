import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Layout from "./components/Layout";
import { TaskProvider } from "./context/TaskContext";
import { SnippetProvider } from "./context/SnippetContext";

import Dashboard from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import SnippetsPage from "./pages/SnippetsPage";

function App() {
  return (
    <BrowserRouter>
    <TaskProvider>
      <SnippetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="snippets" element={<SnippetsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </SnippetProvider>
      </TaskProvider>
    </BrowserRouter>
  );
}
export default App;
