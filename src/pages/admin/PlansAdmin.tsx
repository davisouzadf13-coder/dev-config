import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Star } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { usePlans } from "../../hooks/useStore";
import { Plan } from "../../data/plans";

const emptyPlan: Omit<Plan, "id"> = {
  name: "",
  label: "PLANO",
  price: 0,
  description: "",
  benefits: [],
  highlighted: false,
  badge: "",
  active: true,
};

export default function PlansAdmin() {
  const [plans, setPlans] = usePlans();
  const [editing, setEditing] = useState<Plan | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [benefitInput, setBenefitInput] = useState("");

  const openEdit = (plan: Plan) => {
    setEditing({ ...plan });
    setIsNew(false);
    setBenefitInput("");
  };

  const openNew = () => {
    setEditing({ ...emptyPlan, id: Date.now().toString() } as Plan);
    setIsNew(true);
    setBenefitInput("");
  };

  const save = () => {
    if (!editing) return;
    if (isNew) {
      setPlans([...plans, editing]);
    } else {
      setPlans(plans.map((p) => (p.id === editing.id ? editing : p)));
    }
    setEditing(null);
  };

  const remove = (id: string) => {
    if (!confirm("Excluir este plano?")) return;
    setPlans(plans.filter((p) => p.id !== id));
  };

  const toggle = (id: string) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  const addBenefit = () => {
    if (!benefitInput.trim() || !editing) return;
    setEditing({ ...editing, benefits: [...editing.benefits, benefitInput.trim()] });
    setBenefitInput("");
  };

  const removeBenefit = (i: number) => {
    if (!editing) return;
    setEditing({ ...editing, benefits: editing.benefits.filter((_, idx) => idx !== i) });
  };

  const field = (key: keyof Plan) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editing) return;
    const val = key === "price" ? Number(e.target.value) : key === "highlighted" ? (e as React.ChangeEvent<HTMLInputElement>).target.checked : e.target.value;
    setEditing({ ...editing, [key]: val });
  };

  return (
    <AdminLayout title="Gerenciar Planos">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* List */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[13px] text-[#64748B]">{plans.length} planos cadastrados</p>
            <button
              onClick={openNew}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white hover:opacity-90"
              style={{ background: "#CBA865" }}
            >
              <Plus size={15} />
              Novo plano
            </button>
          </div>

          <div className="space-y-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl border border-[#DDE3E9] p-5 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  {plan.highlighted && <Star size={14} fill="#CBA865" color="#CBA865" />}
                  <div>
                    <p className="text-[14px] font-semibold text-[#082641]">{plan.name}</p>
                    <p className="text-[13px] text-[#64748B]">
                      R$ {plan.price.toLocaleString("pt-BR")}/mês · {plan.benefits.length} benefícios
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggle(plan.id)}
                    className="text-[11px] font-semibold px-3 py-1 rounded-full border transition-all"
                    style={{
                      color: plan.active ? "#059669" : "#64748B",
                      borderColor: plan.active ? "#059669" : "#DDE3E9",
                      background: plan.active ? "#ECFDF5" : "#F8FAFC",
                    }}
                  >
                    {plan.active ? "Ativo" : "Inativo"}
                  </button>
                  <button onClick={() => openEdit(plan)} className="p-2 rounded-xl hover:bg-[#FAFAF8] text-[#64748B] hover:text-[#082641]">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => remove(plan.id)} className="p-2 rounded-xl hover:bg-red-50 text-[#64748B] hover:text-red-500">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor */}
        {editing && (
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-[#DDE3E9] p-6 shadow-sm sticky top-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[15px] font-semibold text-[#082641]" style={{ fontFamily: "var(--font-serif)" }}>
                  {isNew ? "Novo Plano" : "Editar Plano"}
                </h3>
                <button onClick={() => setEditing(null)}><X size={16} className="text-[#64748B]" /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#082641] mb-1.5" style={{ letterSpacing: "0.08em" }}>NOME</label>
                  <input value={editing.name} onChange={field("name")} className="w-full px-3 py-2.5 rounded-xl border border-[#DDE3E9] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#CBA865]/30 focus:border-[#CBA865]" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#082641] mb-1.5" style={{ letterSpacing: "0.08em" }}>PREÇO (R$)</label>
                  <input type="number" value={editing.price} onChange={field("price")} className="w-full px-3 py-2.5 rounded-xl border border-[#DDE3E9] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#CBA865]/30 focus:border-[#CBA865]" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#082641] mb-1.5" style={{ letterSpacing: "0.08em" }}>BADGE (opcional)</label>
                  <input value={editing.badge ?? ""} onChange={field("badge")} placeholder="ex: ★ Mais Procurado" className="w-full px-3 py-2.5 rounded-xl border border-[#DDE3E9] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#CBA865]/30 focus:border-[#CBA865]" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="highlighted" checked={editing.highlighted} onChange={field("highlighted")} className="w-4 h-4 accent-[#CBA865]" />
                  <label htmlFor="highlighted" className="text-[13px] text-[#082641]">Card destacado (fundo azul)</label>
                </div>

                {/* Benefits */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#082641] mb-2" style={{ letterSpacing: "0.08em" }}>BENEFÍCIOS</label>
                  <div className="space-y-1.5 mb-2">
                    {editing.benefits.map((b, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#FAFAF8] border border-[#DDE3E9]">
                        <span className="text-[12px] text-[#374151]">{b}</span>
                        <button onClick={() => removeBenefit(i)} className="text-[#64748B] hover:text-red-500"><X size={12} /></button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={benefitInput}
                      onChange={(e) => setBenefitInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                      placeholder="Adicionar benefício..."
                      className="flex-1 px-3 py-2 rounded-xl border border-[#DDE3E9] text-[12px] focus:outline-none focus:ring-2 focus:ring-[#CBA865]/30 focus:border-[#CBA865]"
                    />
                    <button onClick={addBenefit} className="p-2 rounded-xl bg-[#CBA865] text-white">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={save}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-semibold text-white hover:opacity-90"
                  style={{ background: "#082641" }}
                >
                  <Check size={15} />
                  Salvar plano
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
