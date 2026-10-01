import { Link } from "react-router-dom";
import { Calendar, ArrowRight, ChevronDown } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import PlanCard from "../components/PlanCard";
import { usePlans, useSettings } from "../hooks/useStore";

export default function Home() {
  const [settings] = useSettings();
  const [plans] = usePlans();

  const activePlans = plans.filter((p) => p.active);

  return (
    <div>
      {/* HERO */}
      <section
        className="relative flex flex-col justify-between"
        style={{ minHeight: "100vh" }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={settings.heroImage}
            alt="Campus Instituto Horizonte"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(6,31,54,0.88) 0%, rgba(8,38,65,0.72) 60%, rgba(8,38,65,0.55) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 pb-10 flex flex-col flex-1 justify-center">
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium mb-8"
              style={{
                background: "rgba(203,168,101,0.15)",
                border: "1px solid rgba(203,168,101,0.4)",
                color: "var(--site-gold-light)",
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ color: "var(--site-gold)" }}>✦</span>
              Matrículas Abertas 2027
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span className="text-white">{settings.heroTitle}</span>
              <br />
              <span style={{ color: "var(--site-gold)" }}>{settings.heroSubtitle}</span>
            </h1>

            <p
              className="text-[16px] leading-relaxed mb-10 max-w-xl"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              {settings.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contato"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[14px] font-semibold transition-all hover:opacity-90"
                style={{ background: "var(--site-gold)", color: "#fff" }}
              >
                <Calendar size={16} />
                Agendar Visita
              </Link>
              <Link
                to="/matricular"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[14px] font-semibold transition-all hover:bg-white/20"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Fazer Matrícula
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 w-full border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {settings.stats.map((stat, i) => (
                <div
                  key={i}
                  className="py-6 px-6 flex flex-col items-center md:items-start"
                  style={{
                    borderRight: i < settings.stats.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  }}
                >
                  <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--site-gold)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-[10px] font-semibold mt-1"
                    style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-36 right-8 hidden md:flex flex-col items-center gap-2 opacity-50">
          <span className="text-white text-[10px] font-medium" style={{ letterSpacing: "0.14em", writingMode: "vertical-rl" }}>
            EXPLORE
          </span>
          <ChevronDown size={14} className="text-white animate-bounce" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle
                eyebrow="SOBRE NÓS"
                title="Uma trajetória de excelência educacional"
                description="Há mais de 20 anos formando gerações de alunos com valores, conhecimento e habilidades para enfrentar os desafios do mundo contemporâneo."
                center={false}
              />
              <div className="mt-8 space-y-4">
                {[
                  "Metodologia inovadora com base no pensamento crítico",
                  "Corpo docente altamente qualificado e comprometido",
                  "Infraestrutura de ponta para aprendizagem integral",
                  "Programa bilíngue desde a Educação Infantil",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: "var(--site-gold)" }}
                    />
                    <span className="text-[14px] text-[#374151] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 mt-8 text-[14px] font-semibold"
                style={{ color: "var(--site-navy)" }}
              >
                Agende uma visita <ArrowRight size={14} />
              </Link>
            </div>
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden aspect-[4/3]"
                style={{ background: "#DDE3E9" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop&auto=format"
                  alt="Sala de aula Instituto Horizonte"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl flex flex-col items-center justify-center shadow-xl"
                style={{ background: "var(--site-gold)" }}
              >
                <div
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  20+
                </div>
                <div className="text-[10px] text-white/80 text-center font-medium mt-1" style={{ letterSpacing: "0.06em" }}>
                  ANOS DE<br />TRADIÇÃO
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENTIALS */}
      <section id="diferenciais" className="py-24" style={{ background: "#FAFAF8" }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="DIFERENCIAIS"
            title="Por que escolher o Instituto Horizonte"
            description="Nossa proposta pedagógica une tradição e inovação para oferecer o melhor da educação contemporânea."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎓", title: "Ensino Bilíngue", desc: "Português e inglês desde o primeiro dia, com professores nativos e metodologia imersiva." },
              { icon: "🔬", title: "Laboratórios Modernos", desc: "Infraestrutura de ponta em ciências, tecnologia e robótica para aprendizagem prática." },
              { icon: "🏆", title: "Alto Desempenho", desc: "98% de aprovação no ENEM e índice consistente nas principais universidades do país." },
              { icon: "🌱", title: "Educação Humana", desc: "Formação integral com valores, ética e responsabilidade socioambiental." },
              { icon: "💻", title: "Tecnologia na Sala", desc: "Plataformas digitais, tablets e metodologias ativas que preparam para o futuro." },
              { icon: "🎵", title: "Arte e Cultura", desc: "Música, teatro, artes visuais e cultura integrados à grade curricular." },
            ].map((item) => (
              <div
                key={item.title}
                className="p-7 rounded-2xl bg-white border border-[#DDE3E9] hover:border-[var(--site-gold)] hover:shadow-md transition-all duration-200"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3
                  className="text-[16px] font-semibold mb-2"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--site-navy)" }}
                >
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#64748B]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS PREVIEW */}
      <section id="planos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="INVESTIMENTO"
            title="Planos de mensalidade"
            description="Transparência total. Escolha o plano que melhor se adequa à jornada da sua família."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activePlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/planos"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--site-navy)] hover:text-[var(--site-gold)] transition-colors"
            >
              Ver todos os planos e calculadora <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: "var(--site-navy)" }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div
            className="text-[11px] font-semibold mb-3"
            style={{ color: "var(--site-gold)", letterSpacing: "0.14em" }}
          >
            COMECE HOJE
          </div>
          <h2
            className="text-3xl md:text-4xl font-semibold text-white mb-5"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Dê o primeiro passo para o futuro do seu filho
          </h2>
          <p className="text-[15px] mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
            Agende uma visita ao nosso campus e conheça de perto a estrutura e a equipe do Instituto Horizonte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contato"
              className="px-8 py-3.5 rounded-full text-[14px] font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "var(--site-gold)" }}
            >
              Agendar Visita
            </Link>
            <Link
              to="/matricular"
              className="px-8 py-3.5 rounded-full text-[14px] font-semibold hover:bg-white/15 transition-all"
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
              }}
            >
              Fazer Matrícula
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
