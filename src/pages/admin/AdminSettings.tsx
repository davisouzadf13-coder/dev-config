import { useState, useRef } from "react";
import { Save, Check, Upload, X, RotateCcw } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { useSettings } from "../../hooks/useStore";
import { SiteSettings, defaultSettings } from "../../data/settings";

const colorFields: { key: keyof SiteSettings["colors"]; label: string; desc: string }[] = [
  { key: "navy", label: "Azul-marinho principal", desc: "Cor primária: header, cards, botões, backgrounds" },
  { key: "navyDark", label: "Azul-marinho escuro", desc: "Variante mais escura para gradientes e hover" },
  { key: "gold", label: "Dourado principal", desc: "Cor de destaque: badges, ícones, preços, CTAs" },
  { key: "goldLight", label: "Dourado claro", desc: "Variante clara do dourado para gradientes" },
];

export default function AdminSettings() {
  const [settings, setSettings] = useSettings();
  const [form, setForm] = useState<SiteSettings>({ ...settings, colors: { ...settings.colors } });
  const [saved, setSaved] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>(settings.logoImage ?? "");
  const logoInputRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof SiteSettings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const setStat = (i: number, key: "label" | "value", val: string) => {
    const stats = [...form.stats];
    stats[i] = { ...stats[i], [key]: val };
    setForm({ ...form, stats });
  };

  const setColor = (key: keyof SiteSettings["colors"], value: string) => {
    setForm({ ...form, colors: { ...form.colors, [key]: value } });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Arquivo muito grande. Máximo 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setLogoPreview(dataUrl);
      setForm({ ...form, logoImage: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoPreview("");
    setForm({ ...form, logoImage: "" });
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const resetColors = () => {
    setForm({ ...form, colors: { ...defaultSettings.colors } });
  };

  const handleSave = () => {
    setSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputClass = "w-full px-3 py-2.5 rounded-xl border border-[#DDE3E9] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#CBA865]/30 focus:border-[#CBA865] transition-all";
  const labelClass = "block text-[11px] font-semibold text-[#082641] mb-1.5";

  return (
    <AdminLayout title="Configurações do Site">
      <div className="max-w-2xl space-y-6">

        {/* === LOGO === */}
        <div className="bg-white rounded-2xl border border-[#DDE3E9] p-6 shadow-sm">
          <h3 className="text-[14px] font-semibold text-[#082641] mb-1 pb-3 border-b border-[#DDE3E9]" style={{ fontFamily: "var(--font-serif)" }}>
            Logo da Escola
          </h3>
          <p className="text-[12px] text-[#64748B] mb-5 mt-3">
            Faça upload de uma imagem PNG ou SVG (fundo transparente recomendado). Máx. 2 MB.
          </p>

          <div className="flex items-start gap-5">
            {/* Preview */}
            <div
              className="w-36 h-20 rounded-xl border-2 border-dashed border-[#DDE3E9] flex items-center justify-center flex-shrink-0 overflow-hidden"
              style={{ background: "#FAFAF8" }}
            >
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="max-w-full max-h-full object-contain p-2" />
              ) : (
                <div className="text-center">
                  <div className="text-[10px] text-[#64748B]">Sem logo</div>
                  <div className="text-[10px] text-[#64748B]">personalizada</div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => logoInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ background: "#082641" }}
              >
                <Upload size={14} />
                {logoPreview ? "Trocar logo" : "Fazer upload"}
              </button>
              {logoPreview && (
                <button
                  onClick={removeLogo}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium border border-[#DDE3E9] text-[#64748B] hover:border-red-300 hover:text-red-500 transition-all"
                >
                  <X size={14} />
                  Remover logo
                </button>
              )}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/png,image/svg+xml,image/jpeg,image/webp"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <p className="text-[11px] text-[#64748B] mt-1">
                PNG, SVG, JPG ou WebP. Fundo transparente recomendado.
              </p>
            </div>
          </div>

          {/* Dark preview */}
          {logoPreview && (
            <div className="mt-5">
              <p className="text-[11px] font-semibold text-[#64748B] mb-2" style={{ letterSpacing: "0.08em" }}>
                PRÉVIA EM FUNDO ESCURO
              </p>
              <div className="h-16 rounded-xl flex items-center px-5" style={{ background: "#082641" }}>
                <img src={logoPreview} alt="Logo em fundo escuro" className="max-h-10 object-contain" />
              </div>
            </div>
          )}
        </div>

        {/* === COLORS === */}
        <div className="bg-white rounded-2xl border border-[#DDE3E9] p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3E9] mb-5">
            <h3 className="text-[14px] font-semibold text-[#082641]" style={{ fontFamily: "var(--font-serif)" }}>
              Cores do Site
            </h3>
            <button
              onClick={resetColors}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#64748B] hover:text-[#082641] transition-colors"
            >
              <RotateCcw size={12} />
              Restaurar padrão
            </button>
          </div>

          <div className="space-y-4">
            {colorFields.map(({ key, label, desc }) => (
              <div key={key} className="flex items-center gap-4">
                {/* Color picker */}
                <div className="relative flex-shrink-0">
                  <input
                    type="color"
                    value={form.colors[key]}
                    onChange={(e) => setColor(key, e.target.value)}
                    className="w-12 h-12 rounded-xl border border-[#DDE3E9] cursor-pointer p-1"
                    title={`Escolher ${label}`}
                    style={{ background: "white" }}
                  />
                </div>

                {/* Text input + label */}
                <div className="flex-1 min-w-0">
                  <label className="block text-[12px] font-semibold text-[#082641] mb-1">{label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={form.colors[key]}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) setColor(key, v);
                      }}
                      maxLength={7}
                      className="w-28 px-3 py-1.5 rounded-xl border border-[#DDE3E9] text-[12px] font-mono focus:outline-none focus:ring-2 focus:ring-[#CBA865]/30 focus:border-[#CBA865] transition-all"
                      placeholder="#000000"
                    />
                    <span className="text-[11px] text-[#64748B] truncate">{desc}</span>
                  </div>
                </div>

                {/* Swatch preview */}
                <div
                  className="w-8 h-8 rounded-lg flex-shrink-0 border border-[#DDE3E9]"
                  style={{ background: form.colors[key] }}
                />
              </div>
            ))}
          </div>

          {/* Live preview strip */}
          <div className="mt-6 rounded-xl overflow-hidden border border-[#DDE3E9]">
            <div className="p-3 flex items-center justify-between" style={{ background: form.colors.navy }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{ background: form.colors.gold }} />
                <span className="text-white text-[12px] font-semibold">Instituto Horizonte</span>
              </div>
              <div className="px-3 py-1 rounded-full text-[11px] font-semibold" style={{ background: form.colors.gold, color: "#fff" }}>
                Matricular
              </div>
            </div>
            <div className="p-3 flex items-center gap-3 bg-white">
              <div className="w-6 h-1.5 rounded" style={{ background: form.colors.gold }} />
              <span className="text-[11px]" style={{ color: form.colors.navy }}>
                Prévia das cores — header e destaque
              </span>
            </div>
          </div>
        </div>

        {/* === SCHOOL INFO === */}
        <div className="bg-white rounded-2xl border border-[#DDE3E9] p-6 shadow-sm">
          <h3 className="text-[14px] font-semibold text-[#082641] mb-4 pb-3 border-b border-[#DDE3E9]" style={{ fontFamily: "var(--font-serif)" }}>
            Informações da Escola
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass} style={{ letterSpacing: "0.08em" }}>NOME DA ESCOLA</label>
              <input value={form.schoolName} onChange={set("schoolName")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} style={{ letterSpacing: "0.08em" }}>ENDEREÇO</label>
              <input value={form.address} onChange={set("address")} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={{ letterSpacing: "0.08em" }}>TELEFONE</label>
                <input value={form.phone} onChange={set("phone")} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} style={{ letterSpacing: "0.08em" }}>WHATSAPP</label>
                <input value={form.whatsapp} onChange={set("whatsapp")} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass} style={{ letterSpacing: "0.08em" }}>E-MAIL</label>
              <input value={form.email} onChange={set("email")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} style={{ letterSpacing: "0.08em" }}>HORÁRIO DE ATENDIMENTO</label>
              <input value={form.openingHours} onChange={set("openingHours")} className={inputClass} />
            </div>
          </div>
        </div>

        {/* === HERO === */}
        <div className="bg-white rounded-2xl border border-[#DDE3E9] p-6 shadow-sm">
          <h3 className="text-[14px] font-semibold text-[#082641] mb-4 pb-3 border-b border-[#DDE3E9]" style={{ fontFamily: "var(--font-serif)" }}>
            Seção Principal (Hero)
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass} style={{ letterSpacing: "0.08em" }}>TÍTULO PRINCIPAL</label>
              <input value={form.heroTitle} onChange={set("heroTitle")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} style={{ letterSpacing: "0.08em" }}>SUBTÍTULO (exibido em dourado)</label>
              <input value={form.heroSubtitle} onChange={set("heroSubtitle")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} style={{ letterSpacing: "0.08em" }}>DESCRIÇÃO</label>
              <textarea value={form.heroDescription} onChange={set("heroDescription")} rows={3} className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className={labelClass} style={{ letterSpacing: "0.08em" }}>URL DA IMAGEM DE FUNDO</label>
              <input value={form.heroImage} onChange={set("heroImage")} className={inputClass} />
            </div>
            {form.heroImage && (
              <div className="rounded-xl overflow-hidden aspect-[16/5] bg-[#DDE3E9]">
                <img src={form.heroImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* === STATS === */}
        <div className="bg-white rounded-2xl border border-[#DDE3E9] p-6 shadow-sm">
          <h3 className="text-[14px] font-semibold text-[#082641] mb-4 pb-3 border-b border-[#DDE3E9]" style={{ fontFamily: "var(--font-serif)" }}>
            Estatísticas da Escola
          </h3>
          <div className="space-y-3">
            {form.stats.map((stat, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ letterSpacing: "0.08em" }}>VALOR</label>
                  <input value={stat.value} onChange={(e) => setStat(i, "value", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} style={{ letterSpacing: "0.08em" }}>RÓTULO</label>
                  <input value={stat.label} onChange={(e) => setStat(i, "label", e.target.value)} className={inputClass} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-semibold text-white hover:opacity-90 transition-all"
          style={{ background: saved ? "#059669" : "#082641" }}
        >
          {saved ? <><Check size={16} /> Configurações salvas!</> : <><Save size={16} /> Salvar todas as configurações</>}
        </button>
      </div>
    </AdminLayout>
  );
}
