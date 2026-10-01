import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import Logo from "./Logo";
import { useSettings } from "../hooks/useStore";

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

export default function Footer() {
  const [settings] = useSettings();

  return (
    <footer style={{ background: "var(--site-navy)" }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Logo size="md" light />
            <p className="mt-5 text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Educação de excelência para formar pessoas preparadas para transformar o futuro.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div
              className="text-[11px] font-semibold mb-5"
              style={{ color: "var(--site-gold)", letterSpacing: "0.12em" }}
            >
              NAVEGAÇÃO
            </div>
            <div className="grid grid-cols-2 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-[13px] hover:text-[var(--site-gold)] transition-colors"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              className="text-[11px] font-semibold mb-5"
              style={{ color: "var(--site-gold)", letterSpacing: "0.12em" }}
            >
              CONTATO
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: MapPin, text: settings.address },
                { icon: Phone, text: settings.phone },
                { icon: MessageCircle, text: settings.whatsapp },
                { icon: Mail, text: settings.email },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <Icon size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--site-gold)" }} />
                  <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t text-center text-[12px]"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
        >
          © {new Date().getFullYear()} Instituto Horizonte. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
