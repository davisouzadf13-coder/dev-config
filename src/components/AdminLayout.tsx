import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, MessageSquare, BookOpen, Settings, LogOut, Menu, X, ChevronRight } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Mensagens", href: "/admin/mensagens", icon: MessageSquare },
  { label: "Planos", href: "/admin/planos", icon: BookOpen },
  { label: "Configurações", href: "/admin/configuracoes", icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const Sidebar = () => (
    <div
      className="flex flex-col h-full"
      style={{ background: "#082641" }}
    >
      <div className="p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <Logo size="sm" light />
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = location.pathname === href;
          return (
            <Link
              key={href}
              to={href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all"
              style={{
                color: active ? "#CBA865" : "rgba(255,255,255,0.65)",
                background: active ? "rgba(203,168,101,0.12)" : "transparent",
              }}
            >
              <Icon size={16} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all hover:bg-red-500/10"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-56 flex-shrink-0 shadow-lg">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-56 shadow-xl">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-[#DDE3E9] flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1 text-[#082641]"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h1 className="text-[15px] font-semibold text-[#082641]" style={{ fontFamily: "var(--font-serif)" }}>
              {title}
            </h1>
          </div>
          <Link to="/" className="text-[12px] text-[#64748B] hover:text-[#082641]">
            Ver site público
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
