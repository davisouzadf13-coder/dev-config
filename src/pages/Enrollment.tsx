import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { useEnrollments, usePlans } from "../hooks/useStore";

const shifts = ["Manhã", "Tarde", "Integral"];
const payments = ["Mensal", "Semestral", "Anual"];

export default function Enrollment() {
  const [plans] = usePlans();
  const [enrollments, setEnrollments] = useEnrollments();
  const [params] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const activePlans = plans.filter((p) => p.active);
  const defaultPlanId = params.get("plano") ?? activePlans[0]?.id ?? "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    planId: defaultPlanId,
    studentsQuantity: 1,
    shift: params.get("turno") ?? "Manhã",
    paymentMethod: params.get("pagamento") === "semiannual" ? "Semestral" : params.get("pagamento") === "annual" ? "Anual" : "Mensal",
    notes: "",
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    if (!form.email.trim()) e.email = "E-mail é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "E-mail inválido";
    if (!form.phone.trim()) e.phone = "Telefone é obrigatório";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setEnrollments([
      ...enrollments,
      {
        id: Date.now().toString(),
        ...form,
        status: "interesse",
        createdAt: new Date().toISOString(),
      },
    ]);
    setLoading(false);
    setSubmitted(true);
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const inputClass = (field?: string) =>
    `w-full px-4 py-3 rounded-xl border text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--site-gold)]/30 focus:border-[var(--site-gold)] transition-all ${
      field && errors[field] ? "border-red-400" : "border-[#DDE3E9]"
    }`;

  const selectedPlan = activePlans.find((p) => p.id === form.planId);

  return (
    <div style={{ paddingTop: 70 }}>
      <section className="py-16 bg-white border-b border-[#DDE3E9]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="MATRÍCULA"
            title="Demonstrar interesse em matrícula"
            description="Preencha o formulário e nossa equipe entrará em contato para finalizar o processo."
          />
        </div>
      </section>

      <section className="py-16" style={{ background: "#FAFAF8" }}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#DDE3E9]">
            {submitted ? (
              <div className="flex flex-col items-center py-16 text-center">
                <CheckCircle size={56} className="text-[var(--site-gold)] mb-5" />
                <h3 className="text-xl font-semibold text-[var(--site-navy)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                  Interesse registrado!
                </h3>
                <p className="text-[14px] text-[#64748B] max-w-sm">
                  Obrigado! Nossa equipe entrará em contato em breve para dar continuidade ao processo de matrícula.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-[var(--site-navy)] mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                  Dados do responsável
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>NOME COMPLETO *</label>
                    <input type="text" value={form.name} onChange={set("name")} placeholder="Nome do responsável" className={inputClass("name")} />
                    {errors.name && <p className="mt-1 text-[12px] text-red-500">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>TELEFONE *</label>
                      <input type="tel" value={form.phone} onChange={set("phone")} placeholder="(11) 1234-5678" className={inputClass("phone")} />
                      {errors.phone && <p className="mt-1 text-[12px] text-red-500">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>WHATSAPP</label>
                      <input type="tel" value={form.whatsapp} onChange={set("whatsapp")} placeholder="(11) 91234-5678" className={inputClass()} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>E-MAIL *</label>
                    <input type="email" value={form.email} onChange={set("email")} placeholder="voce@email.com" className={inputClass("email")} />
                    {errors.email && <p className="mt-1 text-[12px] text-red-500">{errors.email}</p>}
                  </div>

                  <div className="pt-2 border-t border-[#DDE3E9]">
                    <h4 className="text-[14px] font-semibold text-[var(--site-navy)] mb-4 mt-2">Dados da matrícula</h4>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>CURSO / PLANO</label>
                    <select value={form.planId} onChange={set("planId")} className={inputClass()}>
                      {activePlans.map((p) => (
                        <option key={p.id} value={p.id}>{p.name} — R$ {p.price.toLocaleString("pt-BR")}/mês</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>QUANTIDADE DE ALUNOS</label>
                      <select value={form.studentsQuantity} onChange={set("studentsQuantity")} className={inputClass()}>
                        {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} {n === 1 ? "aluno" : "alunos"}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>TURNO</label>
                      <select value={form.shift} onChange={set("shift")} className={inputClass()}>
                        {shifts.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>FORMA DE PAGAMENTO</label>
                    <select value={form.paymentMethod} onChange={set("paymentMethod")} className={inputClass()}>
                      {payments.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>OBSERVAÇÕES</label>
                    <textarea value={form.notes} onChange={set("notes")} placeholder="Alguma informação adicional..." rows={3} className={`${inputClass()} resize-none`} />
                  </div>

                  {selectedPlan && (
                    <div className="rounded-xl p-4" style={{ background: "#F5EDD9" }}>
                      <div className="text-[12px] text-[#82631E] font-medium">
                        Plano selecionado: <strong>{selectedPlan.name}</strong> — R$ {selectedPlan.price.toLocaleString("pt-BR")}/mês
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-[14px] font-semibold text-white disabled:opacity-60 hover:opacity-90 transition-opacity"
                    style={{ background: "var(--site-gold)" }}
                  >
                    {loading ? "Registrando..." : "Registrar interesse na matrícula"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
