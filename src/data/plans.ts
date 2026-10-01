export interface Plan {
  id: string;
  name: string;
  label: string;
  price: number;
  description: string;
  benefits: string[];
  highlighted: boolean;
  badge?: string;
  active: boolean;
}

export const defaultPlans: Plan[] = [
  {
    id: "1",
    name: "Educação Infantil",
    label: "PLANO",
    price: 890,
    description: "Desenvolvimento integral na primeira infância com atividades lúdicas e pedagógicas.",
    benefits: ["Material didático", "Atividades recreativas", "Inglês", "Educação física", "Acompanhamento pedagógico"],
    highlighted: false,
    active: true,
  },
  {
    id: "2",
    name: "Ensino Fundamental",
    label: "PLANO",
    price: 1250,
    description: "Base sólida de conhecimento com tecnologia e inovação pedagógica.",
    benefits: ["Material didático", "Biblioteca completa", "Laboratórios", "Robótica", "Plataforma digital", "Bilíngue"],
    highlighted: false,
    active: true,
  },
  {
    id: "3",
    name: "Ensino Médio",
    label: "PLANO",
    price: 1590,
    description: "Preparação completa para o ENEM e vestibulares com acompanhamento personalizado.",
    benefits: ["Preparatório ENEM", "Simulados semanais", "Plantões de dúvidas", "Laboratórios", "Mentoria vocacional"],
    highlighted: false,
    active: true,
  },
  {
    id: "4",
    name: "Plano Integral",
    label: "PLANO",
    price: 2390,
    description: "Experiência educacional completa com todas as atividades extracurriculares incluídas.",
    benefits: ["Todas as vantagens do regular", "Alimentação completa", "Acompanhamento de tarefas", "Inglês diário", "Música", "Programação", "Robótica", "Esportes", "Atividades extras"],
    highlighted: true,
    badge: "★ Mais Procurado",
    active: true,
  },
];

export const discounts: Record<string, number> = {
  monthly: 0,
  semiannual: 0.05,
  annual: 0.10,
};
