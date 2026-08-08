import { Routes, Route, Navigate } from "react-router-dom";

import { FormsPage } from "pages/forms";
import { LoginPage } from "pages/login/ui/LoginPage";
import { PortalShowcase } from "pages/portal-showcase";
import { ProfilePage } from "pages/profile/ui/ProfilePage";
import { PublicPage } from "pages/public";
import { TaskPage } from "pages/tasks";
import { UseRefPage } from "pages/use-ref";

import { ProtectedRoute } from "features/authRouting/ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/portal-showcase" replace />} />

      <Route path="/portal-showcase" element={<PortalShowcase />} />
      <Route path="/public" element={<PublicPage />} />
      <Route path="/tasks" element={<TaskPage />} />
      <Route path="/forms" element={<FormsPage />} />
      <Route path="/use-ref" element={<UseRefPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
