import { useState } from "react";
import { Send, MapPin, Phone, MessageCircle, Mail, Clock, CheckCircle } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { useMessages, useSettings } from "../hooks/useStore";

export default function Contact() {
  const [settings] = useSettings();
  const [messages, setMessages] = useMessages();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    message: "",
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    if (!form.email.trim()) e.email = "E-mail é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "E-mail inválido";
    if (!form.message.trim()) e.message = "Mensagem é obrigatória";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        name: form.name,
        email: form.email,
        phone: form.phone,
        whatsapp: form.whatsapp,
        message: form.message,
        status: "nova",
        createdAt: new Date().toISOString(),
      },
    ]);
    setLoading(false);
    setSubmitted(true);
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const contactItems = [
    { icon: MapPin, label: "ENDEREÇO", value: settings.address },
    { icon: Phone, label: "TELEFONE", value: settings.phone },
    { icon: MessageCircle, label: "WHATSAPP", value: settings.whatsapp },
    { icon: Mail, label: "E-MAIL", value: settings.email },
    { icon: Clock, label: "ATENDIMENTO", value: settings.openingHours },
  ];

  return (
    <div style={{ paddingTop: 70 }}>
      {/* Header */}
      <section className="py-16 bg-white border-b border-[#DDE3E9]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionTitle
            eyebrow="FALE CONOSCO"
            title="Entre em contato"
            description="Estamos prontos para tirar suas dúvidas e agendar uma visita ao campus."
          />
        </div>
      </section>

      {/* Main content */}
      <section className="py-16" style={{ background: "#FAFAF8" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#DDE3E9]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle size={56} className="text-[var(--site-gold)] mb-5" />
                  <h3 className="text-xl font-semibold text-[var(--site-navy)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                    Mensagem enviada!
                  </h3>
                  <p className="text-[14px] text-[#64748B]">
                    Obrigado pelo contato. Retornaremos em até 24h.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", whatsapp: "", email: "", message: "" }); }}
                    className="mt-6 px-6 py-2.5 rounded-full text-[13px] font-semibold text-white hover:opacity-90"
                    style={{ background: "var(--site-navy)" }}
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-[var(--site-navy)] mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                    Envie sua mensagem
                  </h3>
                  <p className="text-[13px] text-[#64748B] mb-7">Preencha e retornamos em até 24h.</p>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div>
                      <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>
                        NOME COMPLETO *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Seu nome"
                        className="w-full px-4 py-3 rounded-xl border text-[14px] focus:outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: errors.name ? "#EF4444" : "#DDE3E9",
                          "--tw-ring-color": "var(--site-gold)",
                        } as React.CSSProperties}
                      />
                      {errors.name && <p className="mt-1 text-[12px] text-red-500">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>
                          TELEFONE
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={set("phone")}
                          placeholder="(11) 1234-5678"
                          className="w-full px-4 py-3 rounded-xl border border-[#DDE3E9] text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--site-gold)]/30 focus:border-[var(--site-gold)] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>
                          WHATSAPP
                        </label>
                        <input
                          type="tel"
                          value={form.whatsapp}
                          onChange={set("whatsapp")}
                          placeholder="(11) 91234-5678"
                          className="w-full px-4 py-3 rounded-xl border border-[#DDE3E9] text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--site-gold)]/30 focus:border-[var(--site-gold)] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>
                        E-MAIL *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="voce@email.com"
                        className="w-full px-4 py-3 rounded-xl border text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--site-gold)]/30 focus:border-[var(--site-gold)] transition-all"
                        style={{ borderColor: errors.email ? "#EF4444" : "#DDE3E9" }}
                      />
                      {errors.email && <p className="mt-1 text-[12px] text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[var(--site-navy)] mb-1.5" style={{ letterSpacing: "0.06em" }}>
                        MENSAGEM *
                      </label>
                      <textarea
                        value={form.message}
                        onChange={set("message")}
                        placeholder="Como podemos ajudar?"
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--site-gold)]/30 focus:border-[var(--site-gold)] transition-all"
                        style={{ borderColor: errors.message ? "#EF4444" : "#DDE3E9" }}
                      />
                      {errors.message && <p className="mt-1 text-[12px] text-red-500">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-semibold text-white disabled:opacity-60 hover:opacity-90 transition-opacity"
                      style={{ background: "var(--site-navy)" }}
                    >
                      {loading ? "Enviando..." : (
                        <>
                          <Send size={15} />
                          Enviar mensagem
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Info card */}
            <div className="flex flex-col gap-6">
              <div
                className="rounded-2xl p-8"
                style={{ background: "var(--site-navy)" }}
              >
                <h3 className="text-lg font-semibold text-white mb-7" style={{ fontFamily: "var(--font-serif)" }}>
                  Informações de contato
                </h3>
                <div className="space-y-5">
                  {contactItems.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(203,168,101,0.15)", border: "1px solid rgba(203,168,101,0.3)" }}
                      >
                        <Icon size={15} color="var(--site-gold)" />
                      </div>
                      <div>
                        <div
                          className="text-[10px] font-semibold mb-0.5"
                          style={{ color: "var(--site-gold)", letterSpacing: "0.12em" }}
                        >
                          {label}
                        </div>
                        <div className="text-[13px]" style={{ color: "rgba(255,255,255,0.8)" }}>
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-[#DDE3E9]" style={{ height: 260 }}>
                <iframe
                  title="Localização Instituto Horizonte"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-46.8927%2C-23.5155%2C-46.8327%2C-23.4755&layer=mapnik&marker=-23.4955%2C-46.8627"
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
