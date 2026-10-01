import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import DynamicTheme from "./components/DynamicTheme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Contact from "./pages/Contact";
import Enrollment from "./pages/Enrollment";
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Messages from "./pages/admin/Messages";
import PlansAdmin from "./pages/admin/PlansAdmin";
import AdminSettings from "./pages/admin/AdminSettings";
import { useAuth } from "./hooks/useAuth";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/planos" element={<PublicLayout><Plans /></PublicLayout>} />
      <Route path="/contato" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/matricular" element={<PublicLayout><Enrollment /></PublicLayout>} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/mensagens" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      <Route path="/admin/planos" element={<ProtectedRoute><PlansAdmin /></ProtectedRoute>} />
      <Route path="/admin/configuracoes" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <DynamicTheme />
      <AppRoutes />
    </BrowserRouter>
  );
}
