import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Plan } from "../data/plans";

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const isHighlighted = plan.highlighted;

  return (
    <div
      className="relative flex flex-col rounded-2xl transition-all duration-200 hover:-translate-y-1"
      style={{
        background: isHighlighted ? "var(--site-navy)" : "#fff",
        border: isHighlighted ? "1.5px solid var(--site-gold)" : "1.5px solid #DDE3E9",
        boxShadow: isHighlighted
          ? "0 8px 32px rgba(8,38,65,0.25)"
          : "0 2px 12px rgba(8,38,65,0.06)",
        padding: "32px 28px",
      }}
    >
      {plan.badge && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-semibold"
          style={{ background: "var(--site-gold)", color: "#fff", letterSpacing: "0.04em" }}
        >
          {plan.badge}
        </div>
      )}

      <div
        className="text-[10px] font-semibold mb-2"
        style={{
          color: isHighlighted ? "rgba(255,255,255,0.5)" : "#64748B",
          letterSpacing: "0.14em",
        }}
      >
        {plan.label}
      </div>

      <h3
        className="text-xl font-semibold mb-4"
        style={{
          fontFamily: "var(--font-serif)",
          color: isHighlighted ? "#fff" : "var(--site-navy)",
        }}
      >
        {plan.name}
      </h3>

      <div className="flex items-baseline gap-1 mb-6">
        <span
          className="text-[13px] font-medium"
          style={{ color: isHighlighted ? "rgba(255,255,255,0.6)" : "#64748B" }}
        >
          R$
        </span>
        <span
          className="text-4xl font-bold"
          style={{
            fontFamily: "var(--font-serif)",
            color: isHighlighted ? "var(--site-gold)" : "var(--site-navy)",
          }}
        >
          {plan.price.toLocaleString("pt-BR")}
        </span>
        <span
          className="text-[13px]"
          style={{ color: isHighlighted ? "rgba(255,255,255,0.5)" : "#64748B" }}
        >
          /mês
        </span>
      </div>

      <ul className="flex flex-col gap-2.5 mb-8 flex-1">
        {plan.benefits.map((benefit) => (
          <li key={benefit} className="flex items-center gap-2.5">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: isHighlighted ? "rgba(203,168,101,0.2)" : "#F5EDD9" }}
            >
              <Check size={10} color="var(--site-gold)" strokeWidth={2.5} />
            </div>
            <span
              className="text-[13px]"
              style={{ color: isHighlighted ? "rgba(255,255,255,0.8)" : "#374151" }}
            >
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      <Link
        to={`/matricular?plano=${plan.id}`}
        className="block text-center py-3 rounded-xl text-[13px] font-semibold transition-all duration-150 hover:opacity-90"
        style={
          isHighlighted
            ? { background: "var(--site-gold)", color: "#fff" }
            : { background: "var(--site-navy)", color: "#fff" }
        }
      >
        {isHighlighted ? "Quero esse Plano" : "Matricular Agora"}
      </Link>
    </div>
  );
}
