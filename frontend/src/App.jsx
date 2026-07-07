import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import SuperDashboard from "./pages/SuperDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ClientsPage from "./pages/clients/ClientsPage";
import NotesPage from "./pages/notes/NotesPage";
import NoteDetailsPage from "./pages/notes/NoteDetailsPage";
import UsersPage from "./pages/users/UsersPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";

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

      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <ClientsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes/:id"
        element={
          <ProtectedRoute>
            <NoteDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute
            allowedRole="super_user"
          >
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute
            allowedRole="super_user"
          >
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

    </Routes>

    
  );
}

export default App;