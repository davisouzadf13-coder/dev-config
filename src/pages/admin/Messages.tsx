import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { useMessages, ContactMessage } from "../../hooks/useStore";

const statusList = ["nova", "em atendimento", "respondida", "arquivada"] as const;
const statusColors: Record<string, string> = {
  nova: "#CBA865",
  "em atendimento": "#082641",
  respondida: "#059669",
  arquivada: "#64748B",
};
const filters = ["Todas", "nova", "em atendimento", "respondida", "arquivada"];

export default function Messages() {
  const [messages, setMessages] = useMessages();
  const [filter, setFilter] = useState("Todas");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [reply, setReply] = useState("");

  const filtered = filter === "Todas" ? messages : messages.filter((m) => m.status === filter);

  const update = (id: string, patch: Partial<ContactMessage>) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, ...patch } : m)));
    if (selected?.id === id) setSelected((s) => (s ? { ...s, ...patch } : s));
  };

  const remove = (id: string) => {
    if (!confirm("Excluir esta mensagem?")) return;
    setMessages(messages.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const saveReply = () => {
    if (!selected) return;
    update(selected.id, { adminReply: reply, status: "respondida" });
    setReply("");
  };

  return (
    <AdminLayout title="Mensagens de Contato">
      <div className="flex gap-6 h-full">
        <div className="flex-1 min-w-0">
          {/* Filters */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-1.5 rounded-full text-[12px] font-semibold capitalize transition-all"
                style={{
                  background: filter === f ? "#082641" : "#fff",
                  color: filter === f ? "#fff" : "#64748B",
                  border: filter === f ? "1.5px solid #082641" : "1.5px solid #DDE3E9",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-[#DDE3E9] overflow-hidden shadow-sm">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-[13px] text-[#64748B]">Nenhuma mensagem encontrada.</div>
            ) : (
              <div className="divide-y divide-[#DDE3E9]">
                {filtered.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#FAFAF8] transition-colors ${selected?.id === msg.id ? "bg-[#F5EDD9]" : ""}`}
                    onClick={() => { setSelected(msg); setReply(msg.adminReply ?? ""); }}
                  >
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[#082641] truncate">{msg.name}</p>
                      <p className="text-[12px] text-[#64748B] truncate">{msg.email}</p>
                      <p className="text-[12px] text-[#64748B] truncate mt-0.5">{msg.message}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 ml-4 flex-shrink-0">
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize"
                        style={{
                          background: `${statusColors[msg.status]}15`,
                          color: statusColors[msg.status],
                          border: `1px solid ${statusColors[msg.status]}30`,
                        }}
                      >
                        {msg.status}
                      </span>
                      <span className="text-[11px] text-[#64748B]">
                        {new Date(msg.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-[#DDE3E9] p-6 shadow-sm">
              <div className="flex items-start justify-between mb-5">
                <h3 className="text-[15px] font-semibold text-[#082641]" style={{ fontFamily: "var(--font-serif)" }}>
                  {selected.name}
                </h3>
                <button onClick={() => setSelected(null)} className="text-[#64748B] hover:text-[#082641]">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-2 mb-5">
                {[
                  ["E-mail", selected.email],
                  ["Telefone", selected.phone || "—"],
                  ["WhatsApp", selected.whatsapp || "—"],
                  ["Data", new Date(selected.createdAt).toLocaleString("pt-BR")],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-[11px] font-semibold text-[#64748B] w-20 flex-shrink-0" style={{ letterSpacing: "0.04em" }}>{k}</span>
                    <span className="text-[12px] text-[#082641]">{v}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#DDE3E9] mb-5">
                <p className="text-[13px] text-[#374151] leading-relaxed">{selected.message}</p>
              </div>

              {/* Status */}
              <div className="mb-5">
                <label className="block text-[11px] font-semibold text-[#082641] mb-2" style={{ letterSpacing: "0.08em" }}>STATUS</label>
                <select
                  value={selected.status}
                  onChange={(e) => update(selected.id, { status: e.target.value as ContactMessage["status"] })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE3E9] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#CBA865]/30 focus:border-[#CBA865]"
                >
                  {statusList.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Reply */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold text-[#082641] mb-2" style={{ letterSpacing: "0.08em" }}>RESPOSTA INTERNA</label>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={4}
                  placeholder="Escreva sua resposta..."
                  className="w-full px-3 py-2.5 rounded-xl border border-[#DDE3E9] text-[13px] resize-none focus:outline-none focus:ring-2 focus:ring-[#CBA865]/30 focus:border-[#CBA865]"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={saveReply}
                  className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-white hover:opacity-90"
                  style={{ background: "#082641" }}
                >
                  Salvar resposta
                </button>
                <button
                  onClick={() => remove(selected.id)}
                  className="p-2.5 rounded-xl border border-[#DDE3E9] text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
