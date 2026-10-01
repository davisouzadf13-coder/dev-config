import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../../components/Logo";
import { useAuth } from "../../hooks/useAuth";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const ok = login(email, password);
    setLoading(false);
    if (ok) navigate("/admin/dashboard");
    else setError("Credenciais inválidas. Verifique e-mail e senha.");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#082641" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" light />
          </div>
          <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
            Área Administrativa
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-[#082641] mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            Entrar no painel
          </h2>

          {error && (
            <div className="mb-5 p-3 rounded-xl text-[13px] text-red-700 bg-red-50 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#082641] mb-1.5" style={{ letterSpacing: "0.06em" }}>
                E-MAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@institutohorizonte.edu.br"
                className="w-full px-4 py-3 rounded-xl border border-[#DDE3E9] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#CBA865]/30 focus:border-[#CBA865] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#082641] mb-1.5" style={{ letterSpacing: "0.06em" }}>
                SENHA
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-[#DDE3E9] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#CBA865]/30 focus:border-[#CBA865] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-[14px] font-semibold text-white disabled:opacity-60 hover:opacity-90 transition-opacity mt-2"
              style={{ background: "#082641" }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-[11px] text-[#64748B] text-center mt-5">
            Credenciais padrão: admin@institutohorizonte.edu.br / Horizonte@2027
          </p>
        </div>
      </div>
    </div>
  );
}
