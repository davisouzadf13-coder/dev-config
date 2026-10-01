Crie um site institucional completo, moderno, responsivo e funcional para uma escola particular fictícia chamada Instituto Horizonte, reproduzindo com máxima fidelidade visual os protótipos fornecidos como referência.

As imagens anexadas nesta conversa são a referência visual principal. Analise cuidadosamente espaçamentos, proporções, tipografia, cores, bordas, sombras, tamanhos, alinhamentos, hierarquia visual, botões, cards, navegação e comportamento responsivo antes de implementar.

O resultado não deve parecer um template genérico. Deve parecer uma implementação real e refinada exatamente baseada no protótipo.

1. Stack e arquitetura
Utilize preferencialmente:

Next.js + TypeScript
Tailwind CSS
Componentes reutilizáveis
Banco de dados PostgreSQL via Supabase
Supabase Auth para autenticação do administrador
API/server actions para operações de dados
Lucide Icons ou ícones equivalentes
CSS customizado quando necessário para atingir fidelidade visual
Design responsivo para desktop, tablet e celular
Organize o projeto de forma profissional:

/app
  /(public)
    page
    planos
    contato
    ...
  /admin
    login
    dashboard
    planos
    mensagens
    configuracoes
/components
/lib
/types
/hooks

Não deixe dados importantes hardcoded no frontend quando eles precisarem ser editáveis pelo administrador.

2. Identidade visual
A identidade visual deve seguir rigorosamente o protótipo.

Cores principais
Use aproximadamente:

Azul-marinho profundo: #082641 / #0A2944
Azul-marinho mais escuro: #061F36
Dourado principal: #CBA865
Dourado claro: #D8B875
Branco: #FFFFFF
Fundo claro: #FAFAF8
Cinza de textos secundários: #64748B
Bordas: #DDE3E9
O azul-marinho e o dourado devem transmitir uma sensação de escola tradicional, premium, elegante e confiável.

Tipografia
A combinação deve ser semelhante à referência:

Títulos: uma serif elegante e editorial, como Playfair Display, DM Serif Display, Cormorant Garamond ou equivalente.
Textos, menus e componentes: uma sans-serif moderna como Poppins, Montserrat, Manrope ou equivalente.
Os títulos grandes devem ter aparência editorial, sofisticada e semelhante à imagem.

Não utilizar tipografia padrão sem personalidade.

3. HEADER / NAVBAR
Criar um header global igual ao protótipo.

Desktop:

altura aproximada de 66–72px
fundo branco
logo no lado esquerdo
menu centralizado
ações no lado direito
leve sombra/borda inferior
conteúdo limitado por um container central
bastante espaço horizontal
Logo:

círculo azul-marinho
ícone dourado de capelo/formatura
texto:
Instituto
HORIZONTE
"HORIZONTE" deve aparecer menor, em dourado e com espaçamento entre letras.

Menu:

Início
Sobre
Cursos
Diferenciais
Planos
Galeria
Notícias
Contato
Lado direito:

ícone de cadeado
"Portal"
botão dourado "Matricular"
O botão "Matricular" deve possuir formato arredondado/pill.

No mobile:

manter logo
esconder menu horizontal
apresentar menu hamburger
abrir menu lateral/dropdown elegante
manter botão de matrícula acessível
O header deve permanecer consistente em todas as páginas.

4. HOME / HERO
Criar a página inicial reproduzindo a primeira imagem.

A primeira seção deve ocupar praticamente toda a altura da viewport.

Utilizar uma fotografia grande de uma escola/campus clássico e sofisticado como background.

A imagem deve possuir:

cobertura total
background-size: cover
posicionamento semelhante ao protótipo
overlay azul-marinho semitransparente
leve escurecimento para garantir contraste
Caso a fotografia original do protótipo não esteja disponível, usar uma imagem de campus escolar elegante visualmente semelhante. Estruturar o código para que a imagem possa ser facilmente substituída posteriormente.

Conteúdo alinhado à esquerda.

Adicionar uma pequena badge:

✦ Matrículas Abertas 2027

Depois:

Formando mentes
brilhantes para
transformar o amanhã.
A primeira parte deve ser branca e "transformar o amanhã." deve utilizar o dourado da identidade.

Abaixo:

"Educação de excelência da Educação Infantil ao Ensino Médio, preparando alunos para os desafios do futuro com ensino inovador, bilíngue e humano."

Botões:

Agendar Visita

dourado
ícone de calendário
Fazer Matrícula

azul/cinza translúcido
ícone de seta
Na parte inferior apresentar indicadores:

20+
ANOS DE TRADIÇÃO

3.500+
ALUNOS FORMADOS

98%
APROVAÇÃO ENEM

15
PRÊMIOS NACIONAIS

Adicionar no rodapé da hero a indicação:

EXPLORE

com pequeno indicador visual de scroll.

Responsividade
No mobile:

reduzir tamanho do título
manter contraste
quebrar texto naturalmente
colocar estatísticas em grid
evitar que botões ultrapassem a largura
preservar a fotografia e overlay
5. SEÇÃO DE PLANOS
Criar uma página/seção "Planos de mensalidade" baseada exatamente na segunda imagem.

Cabeçalho da seção:

Pequeno texto dourado:

INVESTIMENTO

Título:

Planos de mensalidade
Linha decorativa dourada abaixo do título.

Descrição:

"Transparência total. Escolha o plano que melhor se adequa à jornada da sua família."

Criar quatro cards.

Card 1
Título pequeno:

PLANO

Nome:

Educação Infantil

Preço:

R$ 890 /mês

Benefícios:

Material didático
Atividades recreativas
Inglês
Educação física
Acompanhamento pedagógico
Botão:

Matricular Agora

Card 2
Título:

PLANO

Nome:

Ensino Fundamental

Preço:

R$ 1.250 /mês

Benefícios:

Material didático
Biblioteca completa
Laboratórios
Robótica
Plataforma digital
Bilíngue
Botão:

Matricular Agora

Card 3
Título:

PLANO

Nome:

Ensino Médio

Preço:

R$ 1.590 /mês

Benefícios:

Preparatório ENEM
Simulados semanais
Plantões de dúvidas
Laboratórios
Mentoria vocacional
Botão:

Matricular Agora

Card 4 — destaque
Esse é o card visualmente diferente.

Fundo azul-marinho.

Borda dourada.

Badge no topo:

★ Mais Procurado

Nome:

Plano Integral

Preço:

R$ 2.390 /mês

Benefícios:

Todas as vantagens do regular
Alimentação completa
Acompanhamento de tarefas
Inglês diário
Música
Programação
Robótica
Esportes
Atividades extras
Botão dourado:

Quero esse Plano

Comportamento dos cards
Desktop:

quatro cards lado a lado
mesma altura
espaçamento consistente
card integral destacado
Tablet:

2 cards por linha
Mobile:

1 card por linha
Adicionar hover discreto:

elevação
sombra
pequena transição
nunca exagerar em animações
Todos os preços e benefícios devem vir do banco de dados.

6. CALCULADORA DE MENSALIDADE
Criar uma seção/página chamada:

Calculadora de mensalidade

Visualmente deve seguir a terceira imagem.

Fundo azul-marinho ocupando toda a seção.

No topo:

SIMULE SEU INVESTIMENTO

Título:

Calculadora de mensalidade
Descrição:

"Descubra em segundos o valor com todos os descontos aplicados."

Abaixo, criar layout em duas colunas.

Painel esquerdo — formulário
Card branco.

Título:

Configure sua simulação

Campo:

Curso
Select contendo os planos cadastrados.

Exemplo:

Fundamental I — R$ 1.250

Quantidade de alunos
Select:

1 aluno
2 alunos
3 alunos
4 alunos
Turno
Select:

Manhã
Tarde
Integral
Forma de pagamento
Criar três opções visualmente iguais ao protótipo:

Mensal
Padrão

Semestral
-5%

Anual
-10%

A opção selecionada deve possuir borda dourada e fundo levemente destacado.

Abaixo:

botão/controle:

♙ Solicitar Bolsa de Estudos

7. LÓGICA DA CALCULADORA
A calculadora deve ser realmente funcional.

Exemplo:

Plano Fundamental = R$ 1.250

1 aluno + mensal:

R$ 1.250

Semestral:

R$ 1.250 - 5%

= R$ 1.187,50

Anual:

R$ 1.250 - 10%

= R$ 1.125,00

Se forem 2 alunos:

multiplicar o valor pela quantidade de alunos.

A lógica deve ser dinâmica.

Não usar valores calculados apenas visualmente.

8. CARD DE RESULTADO
No lado direito:

Card dourado.

Título:

Seu investimento

Subtexto:

"Valor mensal estimado com descontos"

Mostrar:

Mensalidade base
R$ 1.250

Alunos (1)
R$ 1.250

Linha divisória.

Label:

VALOR FINAL

Valor grande:

R$ 1.250,00 /mês

Botão azul:

Prosseguir com matrícula →

Nota:

"*Valores meramente ilustrativos. Consulte a secretaria."

Sempre atualizar o resultado imediatamente quando o usuário alterar qualquer opção.

9. FLUXO DE MATRÍCULA
Ao clicar em:

Matricular
Matricular Agora
Quero esse Plano
Prosseguir com matrícula
levar o usuário para uma página/formulário de interesse na matrícula.

O formulário deve registrar:

Nome completo
E-mail
Telefone
WhatsApp
Curso/plano escolhido
Quantidade de alunos
Turno
Forma de pagamento
Observações
Salvar no banco.

Mostrar confirmação amigável após o envio.

10. PÁGINA DE CONTATO
Reproduzir a quarta imagem.

A página deve possuir uma introdução centralizada:

"Estamos prontos para tirar suas dúvidas e agendar uma visita ao campus."

Depois layout em duas colunas.

Formulário
Card branco com sombra.

Título:

Envie sua mensagem

Subtítulo:

"Preencha e retornamos em até 24h."

Campos:

Nome completo *

placeholder:
"Seu nome"

Duas colunas:

Telefone

placeholder:
"(11) 1234-5678"

WhatsApp

placeholder:
"(11) 91234-5678"

E-mail *

placeholder:
"voce@email.com"

Mensagem

textarea:

"Como podemos ajudar?"

Botão azul:

Enviar mensagem

com ícone de avião/papel.

Validar os campos.

Mostrar mensagens de erro amigáveis.

Ao enviar, persistir a mensagem no banco de dados.

11. INFORMAÇÕES DE CONTATO
Ao lado do formulário, criar um card azul-marinho.

Exibir:

ENDEREÇO
Av. das Palmeiras, 1500 — Alphaville, São Paulo — SP, 06454-000

TELEFONE
(11) 4000-2100

WHATSAPP
(11) 98765-4321

E-MAIL
contato@institutohorizonte.edu.br

ATENDIMENTO
Segunda a Sexta, 7h às 18h · Sábado, 8h às 12h

Cada informação deve possuir um círculo com ícone dourado.

12. MAPA
Abaixo do card de informações, adicionar mapa mostrando a região de Alphaville/São Paulo.

Pode utilizar Google Maps Embed, OpenStreetMap ou outro serviço apropriado.

O mapa deve possuir tamanho, bordas e posicionamento visual semelhante ao protótipo.

O endereço deve ser configurável pelo painel administrativo.

13. BANCO DE DADOS
Criar banco de dados estruturado.

Tabela plans:

id
name
price
description
benefits
highlighted
badge
active
created_at
updated_at

Tabela contacts:

id
name
email
phone
whatsapp
message
status
admin_reply
created_at
updated_at

Status:

nova
em atendimento
respondida
arquivada
Tabela site_settings:

id
school_name
address
phone
whatsapp
email
opening_hours
hero_title
hero_description
hero_image
updated_at

Tabela enrollments:

id
name
email
phone
whatsapp
plan_id
students_quantity
shift
payment_method
notes
status
created_at

14. LOGIN ADMINISTRATIVO
Criar uma área privada:

/admin/login

Tela de login visualmente coerente com o restante do site.

Campos:

E-mail
Senha
Botão:

Entrar

Utilizar autenticação real.

Não criar autenticação falsa baseada somente em localStorage.

Utilizar Supabase Auth ou solução equivalente.

Rotas administrativas devem ser protegidas.

Um usuário não autenticado não pode acessar o dashboard.

15. DASHBOARD ADMINISTRATIVO
Após login:

/admin

Criar dashboard moderno e simples.

Mostrar cards:

Mensagens novas
Mensagens em atendimento
Matrículas interessadas
Planos cadastrados
Mostrar também lista das mensagens mais recentes.

16. ADMIN — MENSAGENS DE CONTATO
Criar página:

/admin/mensagens

Mostrar tabela/lista contendo:

Nome
E-mail
Telefone
Assunto/mensagem
Data
Status
Ações
Ao clicar em uma mensagem, abrir painel/modal com todos os dados.

O administrador deve conseguir:

visualizar mensagem
alterar status
escrever resposta
salvar resposta
arquivar
excluir, se autorizado
Criar busca e filtros:

Todas
Novas
Em atendimento
Respondidas
Arquivadas
Se possível, incluir botão "Responder por e-mail" utilizando integração de e-mail real ou preparar a arquitetura para Resend/SendGrid.

17. ADMIN — EDIÇÃO DOS PLANOS
Criar página:

/admin/planos

O administrador deve conseguir editar tudo que aparece na página pública.

Para cada plano:

nome
preço
descrição
benefícios
destaque
badge
ativo/inativo
Permitir:

criar plano
editar plano
excluir plano
ativar/desativar
alterar ordem
Ao salvar, as alterações devem aparecer automaticamente no site público.

Não duplicar os dados dos planos no frontend.

18. ADMIN — CONFIGURAÇÕES DO SITE
Criar página:

/admin/configuracoes

Permitir editar:

nome da escola
telefone
WhatsApp
e-mail
endereço
horário de atendimento
texto principal da hero
descrição da hero
imagem da hero
estatísticas da escola
informações institucionais
Criar upload de imagem utilizando Supabase Storage ou equivalente.

19. ADMIN — ESTATÍSTICAS
Permitir editar os números exibidos na home:

20+ anos de tradição
3.500+ alunos formados
98% aprovação ENEM
15 prêmios nacionais
Esses dados também devem vir do banco.

20. SEGURANÇA
Implementar corretamente:

autenticação
autorização
proteção das rotas /admin
validação de dados no servidor
sanitização de inputs
Row Level Security no Supabase
impedir que usuários públicos editem dados
impedir acesso público às informações administrativas
não expor secrets no frontend
variáveis sensíveis em .env
Nunca colocar senha administrativa diretamente no código.

21. UX
A experiência deve parecer de um site real de escola particular premium.

Usar:

transições suaves
hover states
loading states
skeletons quando apropriado
mensagens de sucesso
mensagens de erro
validação de formulários
estados vazios
confirmação antes de ações destrutivas
Evitar:

excesso de animações
gradientes exagerados
visual de dashboard genérico
cards excessivamente arredondados
cores que não pertencem à identidade
elementos gigantes sem necessidade
A estética deve ser elegante, institucional e premium.

22. RESPONSIVIDADE
O site deve funcionar perfeitamente em:

1440px
1280px
1024px
768px
480px
375px
No celular:

navbar vira menu hamburger
cards ficam em uma coluna
calculadora vira uma coluna
formulário de contato vira uma coluna
textos diminuem proporcionalmente
botões ocupam largura adequada
não permitir overflow horizontal
imagens devem permanecer bem enquadradas
23. ACESSIBILIDADE
Implementar:

HTML semântico
labels em todos os campos
navegação por teclado
foco visível
contraste adequado
aria-labels onde necessários
mensagens de erro acessíveis
botões com estados disabled/loading
24. SEO
Adicionar:

title
meta description
Open Graph
favicon
sitemap
robots.txt
dados estruturados de organização/escola quando apropriado
Title:

Instituto Horizonte — Educação que transforma

Descrição:

Educação de excelência da Educação Infantil ao Ensino Médio, com ensino inovador, bilíngue e humano.

25. COMPONENTIZAÇÃO
Criar componentes reutilizáveis:

Header
MobileMenu
Logo
Hero
SectionTitle
PlanCard
PlansGrid
PriceCalculator
CalculatorForm
CalculatorResult
ContactForm
ContactInfo
Map
Footer
AdminSidebar
AdminHeader
DashboardCard
MessageList
MessageDetails
PlanEditor
SettingsForm

Não duplicar código entre páginas.

26. FOOTER
Criar footer institucional seguindo a mesma identidade.

Colunas:

Instituto Horizonte

Educação de excelência para formar pessoas preparadas para transformar o futuro.

Navegação

Início
Sobre
Cursos
Diferenciais
Planos
Galeria
Notícias
Contato
Contato

endereço
telefone
WhatsApp
e-mail
Adicionar copyright no final.

27. COMPORTAMENTO DOS DADOS
IMPORTANTE:

O site público deve consumir os dados do banco.

Exemplo:

Se o administrador alterar:

Ensino Fundamental — R$ 1.250

para:

Ensino Fundamental — R$ 1.350

o valor deve mudar automaticamente:

no card de planos
na calculadora
nos formulários de matrícula
em qualquer outro local em que o plano seja exibido.
O mesmo vale para benefícios, nome e status do plano.

28. DADOS INICIAIS
Popular o banco inicialmente com os quatro planos do protótipo:

Educação Infantil
R$ 890

Ensino Fundamental
R$ 1.250

Ensino Médio
R$ 1.590

Plano Integral
R$ 2.390

Descontos:

Mensal: 0%
Semestral: 5%
Anual: 10%

29. FIDELIDADE VISUAL
Prioridade máxima:

Não transformar o design em uma interpretação genérica.

As imagens fornecidas devem ser utilizadas como referência de pixel fidelity.

Prestar atenção especialmente em:

largura máxima do conteúdo
espaçamento entre elementos
tamanho dos títulos
peso das fontes
contraste
azul-marinho
dourado
raio dos cards
espessura das bordas
sombras
altura do header
alinhamento vertical
posição dos botões
proporção dos cards
espaçamento interno
overlay da imagem da hero
proporção dos textos
tamanho dos preços
A página deve parecer uma implementação do mesmo projeto mostrado nas imagens.

30. ANIMAÇÕES
Usar animações discretas.

Exemplos:

fade-in das seções ao entrar na viewport
hover dos cards
transição dos botões
abertura suave do menu mobile
transição dos modais
loading states
Duração aproximada:

150ms–300ms

Não utilizar animações chamativas.

31. ENTREGA
Entregar o projeto completamente funcional.

Não criar apenas o frontend visual.

É obrigatório que funcionem:

Navegação entre páginas.
Formulário de contato.
Persistência das mensagens.
Login administrativo.
Dashboard.
Visualização das mensagens.
Alteração de status das mensagens.
Resposta às mensagens.
CRUD dos planos.
Alteração dos preços.
Alteração dos benefícios.
Calculadora dinâmica.
Descontos semestral e anual.
Cadastro de interesse em matrícula.
Configurações do site.
Responsividade.
Proteção das rotas administrativas.
Persistência real no banco.
32. REGRA IMPORTANTE SOBRE O PROTÓTIPO
Não invente novas seções ou altere a identidade visual sem necessidade.

Primeiro reproduza fielmente o que está nas imagens.

Depois implemente a funcionalidade necessária.

Quando houver conflito entre "design genérico recomendado" e o design apresentado nas imagens, priorize as imagens.

O objetivo final é:

um site de escola particular premium visualmente fiel ao protótipo, responsivo, rápido, acessível, conectado a banco de dados e com painel administrativo completo para gerenciamento de preços, planos, configurações, contatos e interessados em matrícula.