import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Lock, Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Cursos", href: "/#cursos" },
  { label: "Diferenciais", href: "/#diferenciais" },
  { label: "Planos", href: "/planos" },
  { label: "Galeria", href: "/#galeria" },
  { label: "Notícias", href: "/#noticias" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200"
      style={{
        height: 70,
        boxShadow: scrolled ? "0 1px 12px rgba(8,38,65,0.10)" : "0 1px 0 #DDE3E9",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/">
          <Logo size="md" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-[13px] font-medium text-[var(--site-navy)] hover:text-[var(--site-gold)] transition-colors duration-150"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.01em" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--site-navy)] hover:text-[var(--site-gold)] transition-colors"
          >
            <Lock size={14} />
            Portal
          </Link>
          <Link
            to="/matricular"
            className="px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-150 hover:opacity-90"
            style={{
              background: "var(--site-gold)",
              color: "#fff",
              letterSpacing: "0.02em",
            }}
          >
            Matricular
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-[var(--site-navy)]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-[#DDE3E9] shadow-lg"
          style={{ animation: "fadeDown 180ms ease" }}
        >
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="px-3 py-2.5 text-[14px] font-medium text-[var(--site-navy)] hover:text-[var(--site-gold)] hover:bg-[#FAFAF8] rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-[#DDE3E9] flex flex-col gap-2">
              <Link
                to="/admin"
                className="flex items-center gap-2 px-3 py-2.5 text-[14px] font-medium text-[var(--site-navy)]"
              >
                <Lock size={14} />
                Portal do Administrador
              </Link>
              <Link
                to="/matricular"
                className="mx-3 py-3 rounded-full text-[13px] font-semibold text-center text-white"
                style={{ background: "var(--site-gold)" }}
              >
                Matricular
              </Link>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
