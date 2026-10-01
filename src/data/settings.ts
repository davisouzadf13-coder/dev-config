export interface SiteColors {
  navy: string;
  navyDark: string;
  gold: string;
  goldLight: string;
}

export interface SiteSettings {
  schoolName: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  logoImage: string;
  stats: { label: string; value: string }[];
  colors: SiteColors;
}

export const defaultSettings: SiteSettings = {
  schoolName: "Instituto Horizonte",
  address: "Av. das Palmeiras, 1500 — Alphaville, São Paulo — SP, 06454-000",
  phone: "(11) 4000-2100",
  whatsapp: "(11) 98765-4321",
  email: "contato@institutohorizonte.edu.br",
  openingHours: "Segunda a Sexta, 7h às 18h · Sábado, 8h às 12h",
  heroTitle: "Formando mentes brilhantes para",
  heroSubtitle: "transformar o amanhã.",
  heroDescription: "Educação de excelência da Educação Infantil ao Ensino Médio, preparando alunos para os desafios do futuro com ensino inovador, bilíngue e humano.",
  heroImage: "https://images.unsplash.com/photo-1644651741894-38c180459b62?w=1920&h=1080&fit=crop&auto=format",
  logoImage: "",
  stats: [
    { label: "ANOS DE TRADIÇÃO", value: "20+" },
    { label: "ALUNOS FORMADOS", value: "3.500+" },
    { label: "APROVAÇÃO ENEM", value: "98%" },
    { label: "PRÊMIOS NACIONAIS", value: "15" },
  ],
  colors: {
    navy: "#082641",
    navyDark: "#061F36",
    gold: "#CBA865",
    goldLight: "#D8B875",
  },
};
