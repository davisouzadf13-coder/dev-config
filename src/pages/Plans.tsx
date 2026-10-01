import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import PlanCard from "../components/PlanCard";
import { usePlans } from "../hooks/useStore";

const shifts = ["Manhã", "Tarde", "Integral"];
const quantities = [1, 2, 3, 4];
const paymentOptions = [
  { id: "monthly", label: "Mensal", sub: "Padrão", discount: 0 },
  { id: "semiannual", label: "Semestral", sub: "-5%", discount: 0.05 },
  { id: "annual", label: "Anual", sub: "-10%", discount: 0.10 },
];

function fmt(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Plans() {
  const [plans] = usePlans();
  const activePlans = plans.filter((p) => p.active);

  const [selectedPlanId, setSelectedPlanId] = useState(activePlans[1]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [shift, setShift] = useState("Manhã");
  const [payment, setPayment] = useState("monthly");

  const selectedPlan = activePlans.find((p) => p.id === selectedPlanId);
  const discount = paymentOptions.find((o) => o.id === payment)?.discount ?? 0;
  const baseTotal = (selectedPlan?.price ?? 0) * quantity;
  const finalTotal = baseTotal * (1 - discount);

  return (
    <div style={{ paddingTop: 70 }}>
      {/* Header section */}
      <section className="py-20 bg-white border-b border-[#DDE3E9]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="INVESTIMENTO"
            title="Planos de mensalidade"
            description="Transparência total. Escolha o plano que melhor se adequa à jornada da sua família."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activePlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section style={{ background: "var(--site-navy)" }} className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="SIMULE SEU INVESTIMENTO"
            title="Calculadora de mensalidade"
            description="Descubra em segundos o valor com todos os descontos aplicados."
            light
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form panel */}
            <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
              <h3
                className="text-lg font-semibold mb-7 text-[var(--site-navy)]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Configure sua simulação
              </h3>

              <div className="space-y-5">
                {/* Plan select */}
                <div>
                  <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-2" style={{ letterSpacing: "0.06em" }}>
                    CURSO
                  </label>
                  <select
                    value={selectedPlanId}
                    onChange={(e) => setSelectedPlanId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DDE3E9] text-[14px] text-[var(--site-navy)] focus:outline-none focus:border-[var(--site-gold)] focus:ring-2 focus:ring-[var(--site-gold)]/20 transition-all"
                  >
                    {activePlans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {fmt(p.price)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-2" style={{ letterSpacing: "0.06em" }}>
                    QUANTIDADE DE ALUNOS
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-[#DDE3E9] text-[14px] text-[var(--site-navy)] focus:outline-none focus:border-[var(--site-gold)] focus:ring-2 focus:ring-[var(--site-gold)]/20 transition-all"
                  >
                    {quantities.map((q) => (
                      <option key={q} value={q}>
                        {q} {q === 1 ? "aluno" : "alunos"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Shift */}
                <div>
                  <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-2" style={{ letterSpacing: "0.06em" }}>
                    TURNO
                  </label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DDE3E9] text-[14px] text-[var(--site-navy)] focus:outline-none focus:border-[var(--site-gold)] focus:ring-2 focus:ring-[var(--site-gold)]/20 transition-all"
                  >
                    {shifts.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Payment */}
                <div>
                  <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-3" style={{ letterSpacing: "0.06em" }}>
                    FORMA DE PAGAMENTO
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {paymentOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setPayment(opt.id)}
                        className="flex flex-col items-center py-3 px-2 rounded-xl text-center transition-all duration-150"
                        style={{
                          border: payment === opt.id ? "2px solid var(--site-gold)" : "1.5px solid #DDE3E9",
                          background: payment === opt.id ? "#FDF8F0" : "#fff",
                        }}
                      >
                        <span className="text-[13px] font-semibold text-[var(--site-navy)]">{opt.label}</span>
                        <span
                          className="text-[11px] font-medium mt-0.5"
                          style={{ color: opt.discount > 0 ? "var(--site-gold)" : "#64748B" }}
                        >
                          {opt.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scholarship */}
                <button
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-medium border border-dashed border-[#DDE3E9] text-[#64748B] hover:border-[var(--site-gold)] hover:text-[var(--site-gold)] transition-all"
                >
                  <GraduationCap size={15} />
                  Solicitar Bolsa de Estudos
                </button>
              </div>
            </div>

            {/* Result card */}
            <div
              className="rounded-2xl p-8 flex flex-col"
              style={{
                background: "linear-gradient(135deg, var(--site-gold) 0%, var(--site-gold-light) 100%)",
                boxShadow: "0 8px 40px rgba(203,168,101,0.3)",
              }}
            >
              <div className="text-[11px] font-semibold mb-1" style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em" }}>
                SEU INVESTIMENTO
              </div>
              <h3
                className="text-xl font-semibold text-white mb-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Seu investimento
              </h3>
              <p className="text-[13px] text-white/70 mb-8">Valor mensal estimado com descontos</p>

              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-[13px] text-white/80">Mensalidade base</span>
                  <span className="text-[14px] font-semibold text-white">{fmt(selectedPlan?.price ?? 0)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-[13px] text-white/80">Alunos ({quantity})</span>
                  <span className="text-[14px] font-semibold text-white">{fmt(baseTotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                    <span className="text-[13px] text-white/80">Desconto ({(discount * 100).toFixed(0)}%)</span>
                    <span className="text-[14px] font-semibold text-white">-{fmt(baseTotal * discount)}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-white/30">
                <div className="text-[11px] font-semibold text-white/60 mb-2" style={{ letterSpacing: "0.1em" }}>
                  VALOR FINAL
                </div>
                <div
                  className="text-4xl font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {fmt(finalTotal)}
                </div>
                <div className="text-[12px] text-white/60 mb-6">/mês</div>

                <Link
                  to={`/matricular?plano=${selectedPlanId}&turno=${shift}&quantidade=${quantity}&pagamento=${payment}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-[14px] font-semibold text-[var(--site-gold)] hover:opacity-90 transition-opacity"
                  style={{ background: "var(--site-navy)" }}
                >
                  Prosseguir com matrícula
                  <ArrowRight size={15} />
                </Link>

                <p className="text-[11px] text-white/50 text-center mt-4">
                  *Valores meramente ilustrativos. Consulte a secretaria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
