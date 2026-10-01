import { MessageSquare, GraduationCap, BookOpen, Clock } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { useMessages, useEnrollments, usePlans } from "../../hooks/useStore";

export default function Dashboard() {
  const [messages] = useMessages();
  const [enrollments] = useEnrollments();
  const [plans] = usePlans();

  const novas = messages.filter((m) => m.status === "nova").length;
  const emAtendimento = messages.filter((m) => m.status === "em atendimento").length;
  const recentMessages = [...messages].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);

  const stats = [
    { label: "Mensagens Novas", value: novas, icon: MessageSquare, color: "#CBA865" },
    { label: "Em Atendimento", value: emAtendimento, icon: Clock, color: "#082641" },
    { label: "Interessados em Matrícula", value: enrollments.length, icon: GraduationCap, color: "#059669" },
    { label: "Planos Cadastrados", value: plans.filter((p) => p.active).length, icon: BookOpen, color: "#7C3AED" },
  ];

  const statusColors: Record<string, string> = {
    nova: "#CBA865",
    "em atendimento": "#082641",
    respondida: "#059669",
    arquivada: "#64748B",
  };

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-[#DDE3E9] shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={16} style={{ color }} />
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-serif)", color }}
                >
                  {value}
                </span>
              </div>
              <p className="text-[12px] text-[#64748B] font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Recent messages */}
        <div className="bg-white rounded-2xl border border-[#DDE3E9] shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-[#DDE3E9]">
            <h2 className="text-[15px] font-semibold text-[#082641]" style={{ fontFamily: "var(--font-serif)" }}>
              Mensagens Recentes
            </h2>
            <a href="/admin/mensagens" className="text-[12px] text-[#CBA865] font-medium hover:underline">
              Ver todas
            </a>
          </div>

          {recentMessages.length === 0 ? (
            <div className="py-12 text-center text-[13px] text-[#64748B]">
              Nenhuma mensagem ainda.
            </div>
          ) : (
            <div className="divide-y divide-[#DDE3E9]">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="flex items-center justify-between p-4 hover:bg-[#FAFAF8] transition-colors">
                  <div>
                    <p className="text-[13px] font-semibold text-[#082641]">{msg.name}</p>
                    <p className="text-[12px] text-[#64748B]">{msg.email}</p>
                    <p className="text-[12px] text-[#64748B] mt-0.5 line-clamp-1">{msg.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-4 flex-shrink-0">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${statusColors[msg.status]}18`,
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
    </AdminLayout>
  );
}
