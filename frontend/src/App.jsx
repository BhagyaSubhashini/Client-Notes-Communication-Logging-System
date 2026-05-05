import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import SuperDashboard from "./pages/SuperDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
          <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Login />} />

      {/* NORMAL USER */}
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute allowedRole="normal_user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* SUPER USER */}
      <Route
        path="/super-dashboard"
        element={
          <ProtectedRoute allowedRole="super_user">
            <SuperDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;