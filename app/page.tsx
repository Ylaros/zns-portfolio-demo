"use client";

import { useMemo, useState } from "react";

const productModules = ["Visão geral", "Central de Operações", "Fiscal", "Contábil", "Trabalhista", "Inteligência de Mercado", "Calendário", "Empresas"] as const;
const portfolioModules = ["Guia dos módulos", "Tecnologias"] as const;
const modules = [...productModules, ...portfolioModules] as const;
type ModuleName = (typeof modules)[number];

type Tone = "success" | "warning" | "danger" | "info" | "neutral";
type RequestCard = { code: string; title: string; company: string; owner: string; due: string; tone: Tone; tag: string };

const moduleMeta: Record<ModuleName, { eyebrow: string; description: string; action?: string }> = {
  "Visão geral": {
    eyebrow: "Centro operacional",
    description: "Uma leitura rápida do trabalho, dos documentos e dos próximos compromissos.",
  },
  "Central de Operações": {
    eyebrow: "Solicitações e tarefas",
    description: "Organize demandas, responsáveis, prazos e entregas em um único fluxo.",
    action: "Nova solicitação",
  },
  Fiscal: {
    eyebrow: "Documentos e escrituração",
    description: "Classificação assistida, conferência tributária e Cofre DF-e em um único fluxo.",
  },
  Contábil: {
    eyebrow: "Fechamento e qualidade",
    description: "Balancete, composição de saldos e conciliação com foco no que exige revisão.",
  },
  Trabalhista: {
    eyebrow: "Folha e pessoas",
    description: "Indicadores de folha, movimentações e auditorias preventivas da carteira.",
  },
  "Inteligência de Mercado": {
    eyebrow: "Contexto setorial",
    description: "CNAE, território, prontidão cadastral e benchmarks agregados com privacidade.",
  },
  Calendário: {
    eyebrow: "Agenda da equipe",
    description: "Compromissos, prazos operacionais e disponibilidade em uma visão compartilhada.",
    action: "Novo compromisso",
  },
  Empresas: {
    eyebrow: "Carteira de clientes",
    description: "Diretório demonstrativo com contexto operacional e módulos ativos.",
    action: "Nova empresa demo",
  },
  "Guia dos módulos": {
    eyebrow: "Documentação funcional",
    description: "Entenda o papel de cada módulo, suas abas e o fluxo representado nesta demonstração.",
  },
  Tecnologias: {
    eyebrow: "Ficha técnica",
    description: "Tecnologias e práticas presentes na construção do produto original.",
  },
};

const navIcons: Record<ModuleName, string> = {
  "Visão geral": "⌂",
  "Central de Operações": "◎",
  Fiscal: "▱",
  Contábil: "≋",
  Trabalhista: "♙",
  "Inteligência de Mercado": "◉",
  Calendário: "□",
  Empresas: "◇",
  "Guia dos módulos": "☷",
  Tecnologias: "⌘",
};

const boardColumns: Array<{ title: string; tone: Tone; cards: RequestCard[] }> = [
  {
    title: "Em fila",
    tone: "neutral",
    cards: [
      { code: "SOL-1048", title: "Revisar documentos de admissão", company: "Aurora Comércio Demo", owner: "Setor Trabalhista", due: "Hoje, 17:00", tone: "warning", tag: "Documentos" },
      { code: "SOL-1051", title: "Conferir movimento do período", company: "Orbe Indústria Fictícia", owner: "Setor Fiscal", due: "Amanhã", tone: "info", tag: "Conferência" },
    ],
  },
  {
    title: "Em atendimento",
    tone: "info",
    cards: [
      { code: "SOL-1039", title: "Preparar fechamento mensal", company: "Horizonte Serviços Lab", owner: "Marina Demo", due: "Hoje, 16:30", tone: "danger", tag: "Prioridade alta" },
      { code: "SOL-1044", title: "Validar classificação de despesas", company: "Vértice Mercado Teste", owner: "Caio Demo", due: "02 ago", tone: "info", tag: "Fiscal" },
    ],
  },
  {
    title: "Aguardando cliente",
    tone: "warning",
    cards: [
      { code: "SOL-1027", title: "Enviar comprovantes do período", company: "Aurora Comércio Demo", owner: "Portal do cliente", due: "03 ago", tone: "warning", tag: "Cliente" },
    ],
  },
  {
    title: "Prontas para concluir",
    tone: "success",
    cards: [
      { code: "SOL-1018", title: "Atualizar cadastro operacional", company: "Orbe Indústria Fictícia", owner: "Lia Demo", due: "Concluída hoje", tone: "success", tag: "Cadastro" },
      { code: "SOL-1021", title: "Conferir relatório de apoio", company: "Horizonte Serviços Lab", owner: "Marina Demo", due: "Concluída ontem", tone: "success", tag: "Relatório" },
    ],
  },
];

const cofreTypes = ["NF-e", "NFC-e", "CT-e", "NFS-e", "Incompletos"] as const;
type CofreType = (typeof cofreTypes)[number];
type VaultDocument = { id: string; number: string; company: string; party: string; issued: string; value: string; status: string; tone: Tone };

const documentsByType: Record<CofreType, VaultDocument[]> = {
  "NF-e": [
    { id: "NFE-8421", number: "000.084.210", company: "Aurora Comércio Demo", party: "Norte Suprimentos Simulados", issued: "31/07/2026", value: "R$ 4.280,00", status: "Autorizada", tone: "success" },
    { id: "NFE-8417", number: "000.084.173", company: "Horizonte Serviços Lab", party: "Estação Digital Fictícia", issued: "31/07/2026", value: "R$ 1.945,80", status: "Autorizada", tone: "success" },
    { id: "NFE-8399", number: "000.083.992", company: "Vértice Mercado Teste", party: "Rota Comercial Demo", issued: "30/07/2026", value: "R$ 786,40", status: "Sem XML", tone: "warning" },
    { id: "NFE-8384", number: "000.083.841", company: "Orbe Indústria Fictícia", party: "Matriz Materiais Lab", issued: "29/07/2026", value: "R$ 12.630,00", status: "Cancelada", tone: "danger" },
    { id: "NFE-8362", number: "000.083.625", company: "Aurora Comércio Demo", party: "Ponte Serviços Teste", issued: "28/07/2026", value: "R$ 2.105,20", status: "Autorizada", tone: "success" },
  ],
  "NFC-e": [
    { id: "NFCE-3918", number: "000.039.184", company: "Vértice Mercado Teste", party: "Consumidor não identificado", issued: "31/07/2026", value: "R$ 128,70", status: "Autorizada", tone: "success" },
    { id: "NFCE-3912", number: "000.039.127", company: "Aurora Comércio Demo", party: "Consumidor final demo", issued: "31/07/2026", value: "R$ 54,90", status: "Autorizada", tone: "success" },
    { id: "NFCE-3886", number: "000.038.865", company: "Vértice Mercado Teste", party: "Consumidor não identificado", issued: "30/07/2026", value: "R$ 312,45", status: "Cancelada", tone: "danger" },
    { id: "NFCE-3870", number: "000.038.701", company: "Aurora Comércio Demo", party: "Venda balcão fictícia", issued: "30/07/2026", value: "R$ 89,30", status: "Autorizada", tone: "success" },
    { id: "NFCE-3844", number: "000.038.449", company: "Vértice Mercado Teste", party: "Consumidor final demo", issued: "29/07/2026", value: "R$ 176,00", status: "Sem XML", tone: "warning" },
  ],
  "CT-e": [
    { id: "CTE-7214", number: "000.007.214", company: "Orbe Indústria Fictícia", party: "Rota Sul Transportes Demo", issued: "31/07/2026", value: "R$ 1.480,00", status: "Autorizado", tone: "success" },
    { id: "CTE-7208", number: "000.007.208", company: "Aurora Comércio Demo", party: "Expresso Horizonte Fictício", issued: "30/07/2026", value: "R$ 945,60", status: "Autorizado", tone: "success" },
    { id: "CTE-7191", number: "000.007.191", company: "Vértice Mercado Teste", party: "Logística Ponte Lab", issued: "29/07/2026", value: "R$ 2.318,40", status: "Sem XML", tone: "warning" },
    { id: "CTE-7178", number: "000.007.178", company: "Horizonte Serviços Lab", party: "Via Norte Cargas Demo", issued: "28/07/2026", value: "R$ 680,00", status: "Cancelado", tone: "danger" },
  ],
  "NFS-e": [
    { id: "NFSE-1642", number: "2026/001642", company: "Horizonte Serviços Lab", party: "Clínica Alameda Fictícia", issued: "31/07/2026", value: "R$ 3.600,00", status: "Autorizada", tone: "success" },
    { id: "NFSE-1635", number: "2026/001635", company: "Aurora Comércio Demo", party: "Consultoria Prisma Demo", issued: "30/07/2026", value: "R$ 2.250,00", status: "Autorizada", tone: "success" },
    { id: "NFSE-1629", number: "2026/001629", company: "Orbe Indústria Fictícia", party: "Manutenção Íris Lab", issued: "29/07/2026", value: "R$ 890,00", status: "Pendente", tone: "warning" },
    { id: "NFSE-1614", number: "2026/001614", company: "Vértice Mercado Teste", party: "Tecnologia Nexo Fictícia", issued: "28/07/2026", value: "R$ 5.120,00", status: "Cancelada", tone: "danger" },
  ],
  Incompletos: [
    { id: "INC-0318", number: "Resumo 0318", company: "Aurora Comércio Demo", party: "Participante não informado", issued: "31/07/2026", value: "R$ 1.180,00", status: "XML incompleto", tone: "warning" },
    { id: "INC-0309", number: "Resumo 0309", company: "Vértice Mercado Teste", party: "Cadastro em validação", issued: "30/07/2026", value: "R$ 420,50", status: "Dados pendentes", tone: "warning" },
    { id: "INC-0297", number: "Resumo 0297", company: "Orbe Indústria Fictícia", party: "Origem demonstrativa", issued: "29/07/2026", value: "Não informado", status: "Sem valor", tone: "neutral" },
    { id: "INC-0285", number: "Resumo 0285", company: "Horizonte Serviços Lab", party: "Prestador não identificado", issued: "28/07/2026", value: "R$ 760,00", status: "Em recuperação", tone: "info" },
  ],
};

const vaultStats: Record<CofreType, { total: string; authorized: string; canceled: string; missing: string; rate: string }> = {
  "NF-e": { total: "1.284", authorized: "1.261", canceled: "12", missing: "11", rate: "98,2% dos documentos" },
  "NFC-e": { total: "3.842", authorized: "3.806", canceled: "22", missing: "14", rate: "99,1% dos documentos" },
  "CT-e": { total: "426", authorized: "418", canceled: "3", missing: "5", rate: "98,1% dos documentos" },
  "NFS-e": { total: "312", authorized: "303", canceled: "4", missing: "5", rate: "97,1% dos documentos" },
  Incompletos: { total: "11", authorized: "4", canceled: "2", missing: "5", rate: "4 registros recuperados" },
};

const vaultPartyLabels: Record<CofreType, string> = {
  "NF-e": "Emitente / destinatário",
  "NFC-e": "Consumidor",
  "CT-e": "Transportadora",
  "NFS-e": "Prestador / tomador",
  Incompletos: "Origem / participante",
};

const companies = [
  { code: "DEM-1042", name: "Aurora Comércio Demo", segment: "Comércio", modules: ["Fiscal", "Contábil", "Operações"], open: 3, tone: "success" as Tone },
  { code: "DEM-2187", name: "Horizonte Serviços Lab", segment: "Serviços", modules: ["Fiscal", "Trabalhista", "Calendário"], open: 2, tone: "success" as Tone },
  { code: "DEM-3301", name: "Vértice Mercado Teste", segment: "Varejo", modules: ["Fiscal", "Operações"], open: 4, tone: "warning" as Tone },
  { code: "DEM-4479", name: "Orbe Indústria Fictícia", segment: "Indústria", modules: ["Fiscal", "Contábil", "Trabalhista"], open: 1, tone: "success" as Tone },
];

const monthDays = [
  { day: 27, muted: true }, { day: 28, muted: true }, { day: 29, muted: true }, { day: 30, muted: true }, { day: 31, muted: true },
  { day: 1 }, { day: 2 }, { day: 3, events: [{ label: "Reunião de alinhamento", tone: "info" }] }, { day: 4 },
  { day: 5, events: [{ label: "Prazo · SOL-1048", tone: "warning" }] }, { day: 6 }, { day: 7, events: [{ label: "Revisão mensal", tone: "success" }] },
  { day: 8 }, { day: 9 }, { day: 10, events: [{ label: "Entrega ao cliente", tone: "info" }] }, { day: 11 }, { day: 12 },
  { day: 13, events: [{ label: "Prazo · SOL-1051", tone: "danger" }] }, { day: 14 }, { day: 15 }, { day: 16 },
  { day: 17, events: [{ label: "Comitê operacional", tone: "info" }] }, { day: 18 }, { day: 19 }, { day: 20 },
  { day: 21, events: [{ label: "Fechamento demo", tone: "success" }] }, { day: 22 }, { day: 23 }, { day: 24 },
  { day: 25, events: [{ label: "Férias · Lia", tone: "neutral" }] }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 },
  { day: 31 }, { day: 1, muted: true }, { day: 2, muted: true }, { day: 3, muted: true }, { day: 4, muted: true }, { day: 5, muted: true }, { day: 6, muted: true },
] as Array<{ day: number; muted?: boolean; events?: Array<{ label: string; tone: string }> }>;

function Status({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return <span className={`status status-${tone}`}><i />{children}</span>;
}

function Kpi({ label, value, detail, tone = "info" }: { label: string; value: string; detail: string; tone?: Tone }) {
  return <article className="kpi-card"><div className="kpi-label"><i className={`tone-${tone}`} />{label}</div><strong>{value}</strong><p>{detail}</p></article>;
}

function Overview() {
  return <>
    <section className="kpi-grid" aria-label="Indicadores gerais fictícios">
      <Kpi label="Documentos no período" value="1.284" detail="+126 nesta semana" tone="info" />
      <Kpi label="Movimento demonstrativo" value="R$ 482 mil" detail="Dados financeiros sintéticos" tone="success" />
      <Kpi label="Pendências operacionais" value="12" detail="4 vencem hoje" tone="warning" />
      <Kpi label="Compromissos próximos" value="7" detail="Próximos 14 dias" tone="neutral" />
    </section>
    <section className="overview-grid">
      <article className="panel activity-panel">
        <div className="panel-head"><div><h2>Atividade do sistema</h2><p>Eventos fictícios processados por dia</p></div><Status tone="success">Operação estável</Status></div>
        <div className="activity-chart" aria-label="Gráfico demonstrativo de atividade">
          {[38, 56, 49, 74, 62, 86, 71, 92, 78, 96, 83, 100].map((height, index) => <div key={index}><span style={{ height: `${height}%` }} /><small>{index + 1}</small></div>)}
        </div>
      </article>
      <article className="panel pending-panel">
        <div className="panel-head"><div><h2>Pendências por módulo</h2><p>Onde está o trabalho agora</p></div></div>
        <div className="donut"><div><strong>12</strong><span>total</span></div></div>
        <ul className="summary-list"><li><span><i className="tone-info" />Operações</span><b>7</b></li><li><span><i className="tone-warning" />Cofre</span><b>3</b></li><li><span><i className="tone-neutral" />Calendário</span><b>2</b></li></ul>
      </article>
    </section>
    <section className="overview-bottom">
      <article className="panel">
        <div className="panel-head"><div><h2>Próximos compromissos</h2><p>Agenda demonstrativa da equipe</p></div></div>
        <div className="agenda-preview"><div className="date-tile"><b>03</b><span>AGO</span></div><div><strong>Reunião de alinhamento</strong><p>09:30 · Sala Horizonte · 4 participantes</p></div><Status tone="info">Reunião</Status></div>
        <div className="agenda-preview"><div className="date-tile"><b>05</b><span>AGO</span></div><div><strong>Prazo da solicitação SOL-1048</strong><p>17:00 · Central de Operações</p></div><Status tone="warning">Prazo</Status></div>
      </article>
      <article className="panel">
        <div className="panel-head"><div><h2>Alertas operacionais</h2><p>Sinais fictícios que pedem atenção</p></div></div>
        <div className="alert-row"><span className="alert-icon warning">!</span><div><strong>3 documentos aguardam XML</strong><p>Cofre · período atual</p></div><button>Ver</button></div>
        <div className="alert-row"><span className="alert-icon danger">!</span><div><strong>1 tarefa passou do prazo</strong><p>Central de Operações</p></div><button>Ver</button></div>
      </article>
    </section>
  </>;
}

const operationsTabs = ["Visão Geral", "Quadros", "Solicitações", "Minhas Pendências", "Cronograma"] as const;
type OperationsTab = (typeof operationsTabs)[number];

function Operations({ tab, setTab, onNotice }: { tab: OperationsTab; setTab: (tab: OperationsTab) => void; onNotice: (message: string) => void }) {
  const [selectedRequest, setSelectedRequest] = useState(boardColumns[1].cards[0]);
  return <>
    <div className="module-tabs" role="tablist" aria-label="Áreas da Central de Operações">
      {operationsTabs.map(item => <button key={item} role="tab" aria-selected={tab === item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}
    </div>
    {tab === "Visão Geral" && <section className="operations-overview">
      <div className="kpi-grid"><Kpi label="Solicitações ativas" value="18" detail="7 atribuídas a você" /><Kpi label="Tarefas em execução" value="11" detail="84% dentro do prazo" tone="success" /><Kpi label="Aguardando cliente" value="4" detail="2 com retorno hoje" tone="warning" /><Kpi label="Tempo médio" value="1d 6h" detail="−12% no período" tone="neutral" /></div>
      <div className="overview-grid"><article className="panel"><div className="panel-head"><div><h2>Fluxo operacional</h2><p>Solicitações por situação atual</p></div></div><div className="horizontal-bars">{[["Em fila",7,62],["Em atendimento",5,46],["Aguardando cliente",4,34],["Prontas para concluir",2,20]].map(([label,value,width])=><div key={String(label)}><span>{label}<b>{value}</b></span><i><em style={{width:`${width}%`}} /></i></div>)}</div></article><article className="panel"><div className="panel-head"><div><h2>Meu trabalho</h2><p>Menores itens acionáveis</p></div></div><ul className="task-list"><li><span><i className="tone-danger" />Finalizar fechamento mensal</span><small>Hoje, 16:30</small></li><li><span><i className="tone-warning" />Revisar anexos de admissão</span><small>Hoje, 17:00</small></li><li><span><i className="tone-info" />Validar classificação</span><small>Amanhã</small></li></ul></article></div>
    </section>}
    {tab === "Quadros" && <section className="board-view">
      <div className="view-toolbar"><div><button className="segmented active">Todos</button><button className="segmented">Internas</button><button className="segmented">Externas</button></div><div><button className="quiet-button" onClick={() => onNotice("Filtros do quadro abertos")}>⌕ Filtros</button><button className="quiet-button">Todo período</button></div></div>
      <div className="board" aria-label="Quadro fictício de solicitações">{boardColumns.map(column => <article className="board-column" key={column.title}><header><span><i className={`tone-${column.tone}`} />{column.title}</span><b>{column.cards.length}</b></header><div className="column-body">{column.cards.map(card => <button className="request-card" key={card.code} onClick={() => { setSelectedRequest(card); onNotice(`${card.code} aberto na prévia`); }}><div className="request-top"><code>{card.code}</code><Status tone={card.tone}>{card.tag}</Status></div><strong>{card.title}</strong><p>{card.company}</p><footer><span className="mini-avatar">{card.owner[0]}</span><small>{card.owner}</small><time>{card.due}</time></footer></button>)}</div></article>)}</div>
    </section>}
    {tab === "Solicitações" && <section className="requests-split">
      <article className="request-list panel"><div className="list-toolbar"><input aria-label="Buscar solicitações" placeholder="Buscar solicitações..." /><button>Filtros</button></div>{boardColumns.flatMap(column => column.cards).map(card => <button key={card.code} className={selectedRequest.code === card.code ? "active" : ""} onClick={() => setSelectedRequest(card)}><span><code>{card.code}</code><Status tone={card.tone}>{card.tag}</Status></span><strong>{card.title}</strong><small>{card.company} · {card.due}</small></button>)}</article>
      <article className="request-detail panel"><div className="detail-head"><div><code>{selectedRequest.code}</code><h2>{selectedRequest.title}</h2><p>{selectedRequest.company}</p></div><button className="quiet-button" onClick={() => onNotice("Edição simulada aberta")}>Editar</button></div><div className="detail-tabs"><button className="active">Solicitação</button><button>Tarefas (3)</button><button>Mensagens (4)</button></div><div className="detail-grid"><div><h3>Descrição da solicitação</h3><p>Contexto demonstrativo para representar um atendimento estruturado, sem qualquer dado ou texto do sistema original.</p><h3>Tarefas</h3><div className="detail-task"><span>✓</span><div><strong>Receber documentação</strong><p>Concluída · Lia Demo</p></div></div><div className="detail-task active"><span>→</span><div><strong>Executar conferência</strong><p>Em andamento · {selectedRequest.owner}</p></div></div><div className="detail-task"><span>○</span><div><strong>Validar entrega</strong><p>Aguardando etapa anterior</p></div></div></div><aside className="control-card"><h3>Controle da solicitação</h3><label>Status<strong>Em atendimento</strong></label><label>Prioridade<strong>Normal</strong></label><label>Responsável<strong>{selectedRequest.owner}</strong></label><label>Prazo<strong>{selectedRequest.due}</strong></label></aside></div></article>
    </section>}
    {tab === "Minhas Pendências" && <section className="my-tasks"><div className="personal-heading"><div><span>MINHAS TAREFAS</span><h2>O que precisa da sua ação</h2></div><Status tone="success">7 itens ativos</Status></div><div className="board personal-board">{boardColumns.slice(0,3).map((column,index)=><article className="board-column" key={column.title}><header><span><i className={index===0?"tone-neutral":index===1?"tone-info":"tone-warning"}/>{index===0?"Em fila":index===1?"Em execução":"Aguardando retorno"}</span><b>{column.cards.length}</b></header><div className="column-body">{column.cards.map(card=><button className="request-card personal" key={card.code} onClick={()=>onNotice(`Tarefa de ${card.code} aberta`)}><code>{card.code}</code><strong>{card.title}</strong><p>{card.company}</p><footer><Status tone={card.tone}>{card.due}</Status><span>→</span></footer></button>)}</div></article>)}</div></section>}
    {tab === "Cronograma" && <section className="timeline panel"><div className="view-toolbar"><div><button className="segmented active">Auto-ajuste</button><button className="segmented">Mês atual</button><button className="segmented">Próx. 30 dias</button></div><button className="quiet-button">Médio · 26px/dia</button></div><div className="timeline-grid"><div className="timeline-labels"><b>Solicitação / tarefa</b>{[["SOL-1039","Fechamento mensal"],["└","Receber arquivos"],["└","Conferir dados"],["SOL-1048","Documentos de admissão"],["└","Validar anexos"]].map((row,i)=><span key={i}><code>{row[0]}</code>{row[1]}</span>)}</div><div className="timeline-days"><div className="days-head">{["28 SEG","29 TER","30 QUA","31 QUI","01 SEX","02 SÁB","03 DOM","04 SEG","05 TER"].map(day=><b key={day}>{day}</b>)}</div><div className="gantt-row"><i className="gantt-summary" style={{left:"4%",width:"48%"}} /></div><div className="gantt-row"><i className="gantt-done" style={{left:"6%",width:"24%"}}>Concluída</i></div><div className="gantt-row"><i className="gantt-active" style={{left:"28%",width:"34%"}}>Conferência</i></div><div className="gantt-row"><i className="gantt-summary" style={{left:"45%",width:"48%"}} /></div><div className="gantt-row"><i className="gantt-warning" style={{left:"50%",width:"34%"}}>Validar anexos</i></div></div></div></section>}
  </>;
}

function Vault({ type, setType, onNotice }: { type: CofreType; setType: (type: CofreType) => void; onNotice: (message: string) => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const stats = vaultStats[type];
  const filtered = documentsByType[type].filter(item => `${item.number} ${item.company} ${item.party}`.toLowerCase().includes(query.toLowerCase()));
  const toggle = (id: string) => setSelected(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id]);
  return <>
    <div className="module-tabs vault-tabs" role="tablist" aria-label="Tipos de documento"><span>Cofre</span>{cofreTypes.map(item=><button key={item} role="tab" aria-selected={type===item} className={type===item?"active":""} onClick={()=>{setType(item);setQuery("");setSelected([]);}}>{item}</button>)}</div>
    <section className="kpi-grid compact"><Kpi label={`Total de ${type}`} value={stats.total} detail="No período selecionado" /><Kpi label={type === "Incompletos" ? "Recuperados" : "Autorizados"} value={stats.authorized} detail={stats.rate} tone="success" /><Kpi label={type === "Incompletos" ? "Em validação" : "Cancelados"} value={stats.canceled} detail={type === "Incompletos" ? "Revisão demonstrativa" : "No período selecionado"} tone="danger" /><Kpi label={type === "Incompletos" ? "Pendentes" : "Sem XML"} value={stats.missing} detail="Requer acompanhamento" tone="warning" /></section>
    <section className="panel vault-panel">
      <div className="vault-toolbar"><div className="search-box"><select aria-label="Tipo de busca"><option>Número</option><option>Empresa</option><option>Participante</option></select><input aria-label="Buscar documentos" placeholder="Buscar no Cofre..." value={query} onChange={event=>setQuery(event.target.value)} /></div><div><button className="quiet-button" onClick={()=>onNotice("Filtros avançados abertos")}>⌄ Filtros avançados</button><button className="quiet-button" onClick={()=>setQuery("")}>Limpar</button></div><div className="vault-actions"><button className="quiet-button" onClick={()=>setSelected(filtered.map(item=>item.id))}>Selecionar página</button><button className="accent-button" onClick={()=>onNotice("Download fictício preparado")}>Baixar filtrados</button><button className="quiet-button" onClick={()=>onNotice("Relatório fictício gerado")}>Relatório</button></div></div>
      {selected.length > 0 && <div className="batch-bar"><strong>{selected.length} documento(s) selecionado(s)</strong><button onClick={()=>onNotice("Tag fictícia aplicada")}>Aplicar tag</button><button onClick={()=>onNotice("Solicitação fictícia aberta com os documentos")}>Criar solicitação</button><button onClick={()=>setSelected([])}>Limpar seleção</button></div>}
      <div className="data-table-wrap"><table className="data-table"><thead><tr><th><span className="sr-only">Selecionar</span></th><th>Número</th><th>Empresa</th><th>{vaultPartyLabels[type]}</th><th>Emissão</th><th>Valor</th><th>Status</th><th>Ações</th></tr></thead><tbody>{filtered.map(item=><tr key={item.id} className={selected.includes(item.id)?"selected":""}><td><input type="checkbox" aria-label={`Selecionar documento ${item.number}`} checked={selected.includes(item.id)} onChange={()=>toggle(item.id)} /></td><td><strong>{item.number}</strong><code>{item.id}</code></td><td>{item.company}</td><td>{item.party}</td><td>{item.issued}</td><td>{item.value}</td><td><Status tone={item.tone}>{item.status}</Status></td><td><button aria-label={`Abrir ações do documento ${item.number}`} onClick={()=>onNotice(`Ações de ${item.id} abertas`)}>•••</button></td></tr>)}</tbody></table>{filtered.length===0&&<div className="empty-state"><span>⌕</span><strong>Nenhum documento encontrado</strong><p>Altere a busca para ver os dados fictícios.</p></div>}</div>
    </section>
  </>;
}

const fiscalTabs = ["Painel fiscal", "Classificador", "Cofre DF-e"] as const;
type FiscalTab = (typeof fiscalTabs)[number];
type FiscalInvoice = { id: string; number: string; company: string; supplier: string; value: string; items: number; confidence: number; alerts: number; status: string; tone: Tone };

const fiscalInvoices: FiscalInvoice[] = [
  { id: "NFX-8042", number: "000.080.420", company: "Aurora Comércio Demo", supplier: "Atlas Alimentos Sintéticos", value: "R$ 4.282,98", items: 8, confidence: 61, alerts: 3, status: "Com alertas", tone: "warning" },
  { id: "NFX-7991", number: "000.079.913", company: "Orbe Indústria Fictícia", supplier: "Prisma Insumos Lab", value: "R$ 19.039,66", items: 5, confidence: 96, alerts: 0, status: "Em análise", tone: "info" },
  { id: "NFX-7860", number: "000.078.604", company: "Vértice Mercado Teste", supplier: "Rota Comercial Demo", value: "R$ 987,63", items: 4, confidence: 58, alerts: 4, status: "Com alertas", tone: "danger" },
  { id: "NFX-7754", number: "000.077.548", company: "Horizonte Serviços Lab", supplier: "Norte Soluções Fictícias", value: "R$ 715,95", items: 3, confidence: 88, alerts: 1, status: "Em análise", tone: "info" },
];

const classificationItems = [
  { id: "IT-01", product: "Chocolate em pó 400 g", code: "18069000", issued: "5405 · CST 60", suggestion: "Grupo 40101 · CFOP 1401", detail: "Compra para industrialização com ST", confidence: 61, alerts: 3 },
  { id: "IT-02", product: "Açúcar cristal 1 kg", code: "17019900", issued: "5102 · CST 20", suggestion: "Grupo 10101 · CFOP 1101", detail: "Compra para industrialização", confidence: 92, alerts: 0 },
  { id: "IT-03", product: "Café torrado 500 g", code: "09012100", issued: "5102 · CST 20", suggestion: "Grupo 10101 · CFOP 1101", detail: "Histórico validado para o fornecedor", confidence: 87, alerts: 1 },
  { id: "IT-04", product: "Creme culinário 200 g", code: "04015021", issued: "5405 · CST 60", suggestion: "Sem sugestão segura", detail: "Revisão manual obrigatória", confidence: 0, alerts: 1 },
];

function ModuleTabs<T extends string>({ items, active, onChange, label }: { items: readonly T[]; active: T; onChange: (item: T) => void; label: string }) {
  return <div className="module-tabs" role="tablist" aria-label={label}>{items.map(item=><button key={item} role="tab" aria-selected={active===item} className={active===item?"active":""} onClick={()=>onChange(item)}>{item}</button>)}</div>;
}

function FiscalModule({ type, setType, onNotice }: { type: CofreType; setType: (type: CofreType) => void; onNotice: (message: string) => void }) {
  const [tab,setTab]=useState<FiscalTab>("Classificador");
  const [invoice,setInvoice]=useState(fiscalInvoices[0]);
  const [approved,setApproved]=useState<string[]>([]);
  const approve=(id:string)=>{setApproved(items=>items.includes(id)?items:[...items,id]);onNotice("Classificação aprovada somente nesta demonstração");};
  return <>
    <ModuleTabs items={fiscalTabs} active={tab} onChange={setTab} label="Áreas do módulo fiscal" />
    {tab==="Painel fiscal"&&<section className="module-stack">
      <div className="kpi-grid compact"><Kpi label="Notas no período" value="1.284" detail="24 empresas com movimento"/><Kpi label="Não analisadas" value="13" detail="Fila inicial do classificador" tone="warning"/><Kpi label="Com alertas" value="82" detail="Exigem revisão humana" tone="danger"/><Kpi label="Exportadas" value="1.167" detail="91% do movimento" tone="success"/></div>
      <div className="overview-grid"><article className="panel"><div className="panel-head"><div><h2>Esteira de classificação</h2><p>Do XML capturado à escrituração validada</p></div><Status tone="info">Jul 2026</Status></div><div className="pipeline">{[["Capturadas","1.284","100%"],["Classificadas","1.271","99%"],["Conferidas","1.204","94%"],["Exportadas","1.167","91%"]].map((row,index)=><div key={row[0]}><span>{index+1}</span><div><strong>{row[1]}</strong><small>{row[0]}</small><i><em style={{width:row[2]}}/></i></div></div>)}</div></article><article className="panel"><div className="panel-head"><div><h2>Onde agir primeiro</h2><p>Sinais que pedem decisão</p></div></div><div className="attention-list"><button onClick={()=>setTab("Classificador")}><span className="alert-icon danger">!</span><div><b>4 notas com baixa confiança</b><small>Revisar regra e tributação sugerida</small></div><em>→</em></button><button onClick={()=>setTab("Cofre DF-e")}><span className="alert-icon warning">!</span><div><b>11 documentos sem XML</b><small>Acompanhar captura e manifestação</small></div><em>→</em></button></div></article></div>
    </section>}
    {tab==="Classificador"&&<section className="classifier-layout">
      <article className="panel classifier-queue"><div className="classifier-title"><div><span>FILA DE ENTRADAS</span><h2>Notas para classificar</h2><p>Sugestões combinam histórico, cadastro e regras fiscais.</p></div><button className="quiet-button" onClick={()=>onNotice("Classificação em lote simulada")}>Classificar pendentes</button></div><div className="invoice-list">{fiscalInvoices.map(item=><button key={item.id} className={invoice.id===item.id?"active":""} onClick={()=>{setInvoice(item);setApproved([]);}}><span><code>{item.id}</code><Status tone={item.tone}>{item.status}</Status></span><strong>NF-e {item.number}</strong><p>{item.supplier}</p><small>{item.company} · {item.value}</small><footer><b>{item.items} itens</b><em className={item.confidence<70?"low":""}>{item.confidence}% confiança</em><i>{item.alerts} alertas</i></footer></button>)}</div></article>
      <article className="panel classifier-detail"><div className="classification-head"><div><span>ANÁLISE DA NOTA</span><h2>NF-e {invoice.number}</h2><p>{invoice.supplier} · {invoice.company}</p></div><div><Status tone={invoice.tone}>{invoice.status}</Status><b>{invoice.value}</b></div></div><div className="classification-summary"><span><small>Itens</small><b>{classificationItems.length}</b></span><span><small>Confiança mínima</small><b>{invoice.confidence}%</b></span><span><small>Alertas</small><b>{invoice.alerts}</b></span><button className="accent-button" onClick={()=>onNotice("Escrituração demo preparada para exportação")}>Preparar escrituração</button></div><div className="classification-table"><div className="classification-row header"><span>Produto / tributação</span><span>Sugestão do motor</span><span>Confiança</span><span>Decisão</span></div>{classificationItems.map(item=><div className={`classification-row ${approved.includes(item.id)?"approved":""}`} key={item.id}><div><code>{item.id}</code><strong>{item.product}</strong><small>NCM {item.code} · emitido {item.issued}</small></div><div><strong>{item.suggestion}</strong><small>{item.detail}</small>{item.alerts>0&&<em>{item.alerts} alerta(s) fiscal(is)</em>}</div><div><b className={`confidence ${item.confidence<70?"low":item.confidence<90?"mid":"high"}`}>{item.confidence?`${item.confidence}%`:"—"}</b><small>{item.confidence>=90?"alta":item.confidence>=70?"revisar":"obrigatória"}</small></div><div>{approved.includes(item.id)?<Status tone="success">Aprovada</Status>:<><button className="mini-action approve" onClick={()=>approve(item.id)}>Aprovar</button><button className="mini-action" onClick={()=>onNotice(`Editor de grupo e CFOP aberto para ${item.id}`)}>Ajustar</button></>}</div></div>)}</div></article>
    </section>}
    {tab==="Cofre DF-e"&&<Vault type={type} setType={setType} onNotice={onNotice}/>}
  </>;
}

const accountingTabs=["Balancete","Análise por classificação","Conciliação","Pendências"] as const;
type AccountingTab=(typeof accountingTabs)[number];

function AccountingModule({onNotice}:{onNotice:(message:string)=>void}){
  const [tab,setTab]=useState<AccountingTab>("Balancete");
  return <><ModuleTabs items={accountingTabs} active={tab} onChange={setTab} label="Áreas do módulo contábil"/>
    {tab==="Balancete"&&<section className="module-stack"><div className="kpi-grid compact"><Kpi label="Ativo" value="R$ 1,84 mi" detail="Saldo final sintético"/><Kpi label="Passivo" value="R$ 1,12 mi" detail="61% do ativo" tone="warning"/><Kpi label="Resultado" value="R$ 184 mil" detail="Margem demonstrativa de 14,2%" tone="success"/><Kpi label="Contas a revisar" value="7" detail="3 com variação relevante" tone="danger"/></div><div className="accounting-grid"><article className="panel"><div className="panel-head"><div><h2>Composição patrimonial</h2><p>Comparativo sintético entre saldo atual e mês anterior</p></div><button className="quiet-button" onClick={()=>onNotice("Balancete fictício exportado")}>Exportar</button></div><div className="ledger-bars">{[["Disponibilidades","R$ 428 mil",72,"+8,4%"],["Clientes","R$ 612 mil",94,"+3,1%"],["Estoques","R$ 356 mil",58,"−2,7%"],["Fornecedores","R$ 482 mil",78,"+6,2%"],["Empréstimos","R$ 210 mil",36,"−4,5%"]].map(row=><div key={row[0]}><span><b>{row[0]}</b><small>{row[1]} · {row[3]}</small></span><i><em style={{width:`${row[2]}%`}}/></i></div>)}</div></article><article className="panel"><div className="panel-head"><div><h2>Fechamento</h2><p>Qualidade do período</p></div><Status tone="warning">Em revisão</Status></div><div className="close-score"><div><b>86%</b><span>pronto</span></div></div><ul className="summary-list"><li><span><i className="tone-success"/>Contas conciliadas</span><b>42</b></li><li><span><i className="tone-warning"/>Composição pendente</span><b>5</b></li><li><span><i className="tone-danger"/>Variação atípica</span><b>2</b></li></ul></article></div></section>}
    {tab==="Análise por classificação"&&<section className="panel insight-table"><div className="panel-head"><div><h2>Análise por classificação de contas</h2><p>Variações relevantes destacadas automaticamente</p></div><button className="quiet-button" onClick={()=>onNotice("Filtros contábeis abertos")}>Filtros</button></div><table className="data-table"><thead><tr><th>Classificação</th><th>Conta</th><th>Saldo atual</th><th>Mês anterior</th><th>Variação</th><th>Sinal</th></tr></thead><tbody>{[["1.1.2","Clientes nacionais","R$ 612.480","R$ 594.030","+3,1%","Dentro do padrão","success"],["1.1.3","Estoques de mercadorias","R$ 356.120","R$ 366.010","−2,7%","Dentro do padrão","success"],["2.1.1","Fornecedores","R$ 482.330","R$ 454.020","+6,2%","Revisar composição","warning"],["3.1.1","Receita operacional","R$ 1.294.800","R$ 1.108.400","+16,8%","Variação atípica","danger"]].map(row=><tr key={row[0]}><td><code>{row[0]}</code></td><td><strong>{row[1]}</strong></td><td>{row[2]}</td><td>{row[3]}</td><td>{row[4]}</td><td><Status tone={row[6] as Tone}>{row[5]}</Status></td></tr>)}</tbody></table></section>}
    {tab==="Conciliação"&&<section className="reconciliation-grid">{[["Banco Horizonte Demo","98%","2 lançamentos","success"],["Caixa operacional","92%","5 lançamentos","warning"],["Cartões a receber","84%","12 lançamentos","danger"]].map(row=><article className="panel reconciliation-card" key={row[0]}><div><span className="account-mark">≋</span><Status tone={row[3] as Tone}>{row[1]} conciliado</Status></div><h2>{row[0]}</h2><p>{row[2]} ainda sem correspondência automática.</p><button className="quiet-button" onClick={()=>onNotice(`Conciliação de ${row[0]} aberta`)}>Conciliar →</button></article>)}</section>}
    {tab==="Pendências"&&<section className="panel attention-table"><div className="panel-head"><div><h2>Pendências do fechamento</h2><p>Itens priorizados por impacto e prazo</p></div></div>{[["CTA-019","Compor saldo de fornecedores","Alto","Hoje","danger"],["CTA-024","Revisar variação de receita","Médio","Amanhã","warning"],["CTA-031","Vincular lançamento bancário","Baixo","07 ago","info"]].map(row=><button key={row[0]} onClick={()=>onNotice(`${row[0]} aberto em modo demonstrativo`)}><code>{row[0]}</code><span><b>{row[1]}</b><small>Responsável: Contabilidade Demo</small></span><Status tone={row[4] as Tone}>{row[2]}</Status><time>{row[3]}</time><em>→</em></button>)}</section>}
  </>;
}

const laborTabs=["Dashboard","Comparações","Funcionários","Auditoria"] as const;
type LaborTab=(typeof laborTabs)[number];

function LaborModule({onNotice}:{onNotice:(message:string)=>void}){
  const [tab,setTab]=useState<LaborTab>("Dashboard");
  return <><ModuleTabs items={laborTabs} active={tab} onChange={setTab} label="Áreas do módulo trabalhista"/>
    {tab==="Dashboard"&&<section className="module-stack"><div className="kpi-grid compact"><Kpi label="Funcionários ativos" value="248" detail="Em 18 empresas demo"/><Kpi label="Admissões" value="12" detail="+3 vs. mês anterior" tone="success"/><Kpi label="Férias próximas" value="9" detail="Próximos 30 dias" tone="warning"/><Kpi label="Alertas de folha" value="6" detail="2 de maior impacto" tone="danger"/></div><div className="overview-grid"><article className="panel"><div className="panel-head"><div><h2>Evolução da folha</h2><p>Valores agregados e inteiramente sintéticos</p></div><Status tone="success">+2,4%</Status></div><div className="payroll-chart">{[52,58,55,63,61,68,72,70,76,81,78,84].map((h,i)=><div key={i}><span style={{height:`${h}%`}}/><small>{["A","S","O","N","D","J","F","M","A","M","J","J"][i]}</small></div>)}</div></article><article className="panel"><div className="panel-head"><div><h2>Movimentações</h2><p>Eventos do período</p></div></div><div className="movement-list">{[["Admissões","12","success"],["Desligamentos","5","danger"],["Férias","9","warning"],["Afastamentos","3","info"]].map(row=><div key={row[0]}><i className={`tone-${row[2]}`}/><span><b>{row[0]}</b><small>Julho de 2026</small></span><strong>{row[1]}</strong></div>)}</div></article></div></section>}
    {tab==="Comparações"&&<section className="panel comparison-panel"><div className="panel-head"><div><h2>Comparação mensal da folha</h2><p>Variações por empresa e rubrica</p></div><button className="quiet-button" onClick={()=>onNotice("Relatório comparativo fictício gerado")}>Gerar relatório</button></div><div className="comparison-legend"><span><i className="tone-neutral"/>Jun 2026</span><span><i className="tone-info"/>Jul 2026</span></div>{[["Salários","R$ 842 mil","R$ 861 mil",68,72,"+2,3%"],["Encargos","R$ 284 mil","R$ 291 mil",42,45,"+2,5%"],["Benefícios","R$ 119 mil","R$ 128 mil",26,31,"+7,6%"],["Horas extras","R$ 38 mil","R$ 31 mil",19,14,"−18,4%"]].map(row=><div className="comparison-row" key={row[0]}><b>{row[0]}</b><div><span style={{width:`${row[3]}%`}}/><em style={{width:`${row[4]}%`}}/></div><small>{row[1]} → {row[2]}</small><strong>{row[5]}</strong></div>)}</section>}
    {tab==="Funcionários"&&<section className="panel insight-table"><div className="panel-head"><div><h2>Funcionários</h2><p>Cadastros fictícios para demonstrar filtros e movimentações</p></div><input className="inline-search" aria-label="Buscar funcionários" placeholder="Buscar funcionário demo..."/></div><table className="data-table"><thead><tr><th>Funcionário</th><th>Empresa</th><th>Cargo</th><th>Admissão</th><th>Situação</th></tr></thead><tbody>{[["Ana Demo","Aurora Comércio Demo","Analista comercial","12/03/2024","Ativa","success"],["Bruno Lab","Orbe Indústria Fictícia","Operador de produção","08/11/2023","Férias programadas","warning"],["Carla Teste","Horizonte Serviços Lab","Assistente administrativa","21/01/2025","Ativa","success"],["Diego Fictício","Vértice Mercado Teste","Supervisor de loja","02/06/2022","Documentação pendente","danger"]].map(row=><tr key={row[0]}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td><td><Status tone={row[5] as Tone}>{row[4]}</Status></td></tr>)}</tbody></table></section>}
    {tab==="Auditoria"&&<section className="audit-grid">{[["Jornada acima do limite","2 ocorrências","Revisar marcações e justificativas","danger"],["Férias próximas do limite","3 funcionários","Planejar períodos com as empresas","warning"],["Cadastro incompleto","1 funcionário","Documento admissional pendente","info"],["Variação salarial","0 ocorrências","Nenhuma divergência encontrada","success"]].map((row,index)=><article className="panel audit-card" key={row[0]}><span className={`audit-number tone-${row[3]}`}>{String(index+1).padStart(2,"0")}</span><div><h2>{row[0]}</h2><b>{row[1]}</b><p>{row[2]}</p></div><button onClick={()=>onNotice(`${row[0]} aberto em modo demonstrativo`)}>Analisar →</button></article>)}</section>}
  </>;
}

const marketTabs=["Visão geral","Consulta CNPJ","Empresas / prontidão","Políticas e fontes"] as const;
type MarketTab=(typeof marketTabs)[number];
const readinessCompanies=[["Aurora Comércio Demo","47.89-0-99","Vale do Paraíba · SP",92,"Pronta"],["Orbe Indústria Fictícia","25.39-0-01","Sul de Minas · MG",78,"Revisar zona"],["Vértice Mercado Teste","47.12-1-00","Vale do Paraíba · SP",64,"CNAE secundário"],["Horizonte Serviços Lab","62.01-5-01","Campinas · SP",88,"Pronta"]] as const;

function MarketIntelligence({onNotice}:{onNotice:(message:string)=>void}){
  const [tab,setTab]=useState<MarketTab>("Visão geral");
  const [query,setQuery]=useState("");
  const filtered=readinessCompanies.filter(row=>`${row[0]} ${row[1]} ${row[2]}`.toLowerCase().includes(query.toLowerCase()));
  return <><ModuleTabs items={marketTabs} active={tab} onChange={setTab} label="Áreas de inteligência de mercado"/>
    {tab==="Visão geral"&&<section className="module-stack"><div className="market-badges"><span>✓ CNAE estruturado</span><span>✓ Zona de atuação</span><span>✓ Privacidade por amostra</span><span>◌ Snapshots demonstrativos</span></div><div className="market-hero"><article className="panel readiness-panel"><div className="panel-head"><div><h2>Prontidão da inteligência</h2><p>Qualidade da base antes de gerar comparativos</p></div><strong>82%</strong></div><div className="radar-demo" aria-label="Prontidão por dimensão">{[["CNAE",92],["Zona",78],["Benchmark",74],["Risco",85]].map(row=><div key={row[0]}><span><b>{row[0]}</b><small>{row[1]}%</small></span><i><em style={{width:`${row[1]}%`}}/></i></div>)}</div></article><article className="panel market-map"><div className="panel-head"><div><h2>Distribuição territorial</h2><p>Recortes regionais da carteira fictícia</p></div></div><div className="map-cloud"><span className="region r1">SP<b>58%</b></span><span className="region r2">MG<b>21%</b></span><span className="region r3">RJ<b>13%</b></span><span className="region r4">Outros<b>8%</b></span></div></article></div><div className="market-cards">{[["Risco CNAE","Score setorial","Sinais de abertura, sobrevivência e volatilidade por atividade.","warning"],["Mercado regional","Base pública","Escala por município, região, UF e Brasil.","info"],["Benchmark ético","Amostra protegida","Comparativos agregados sem expor empresas individuais.","success"],["Coerência cadastral","Cruzamento fiscal","CNAE declarado comparado a NCM, CFOP e comportamento.","neutral"]].map(row=><article className="panel" key={row[0]}><Status tone={row[3] as Tone}>{row[1]}</Status><h2>{row[0]}</h2><p>{row[2]}</p><button onClick={()=>onNotice(`${row[0]} aberto em modo demonstrativo`)}>Explorar →</button></article>)}</div></section>}
    {tab==="Consulta CNPJ"&&<section className="lookup-layout"><article className="panel lookup-form"><span>CONSULTA DEMONSTRATIVA</span><h2>Contexto público de uma empresa</h2><p>Use apenas identificadores fictícios. Nenhuma consulta externa é realizada.</p><label>CNPJ demo<input value="12.345.678/0001-90" readOnly/></label><button className="accent-button" onClick={()=>onNotice("Consulta fictícia concluída")}>Consultar base demo</button></article><article className="panel lookup-result"><div><span className="company-seal">A</span><div><Status tone="success">Cadastro ativo</Status><h2>Alameda Varejo Demonstrativo Ltda.</h2><p>Identificador exclusivamente sintético</p></div></div><dl><div><dt>CNAE principal</dt><dd>47.89-0-99 · Comércio varejista</dd></div><div><dt>Município / UF</dt><dd>Vale Sereno · SP</dd></div><div><dt>Zona de atuação</dt><dd>Regional · raio estimado de 120 km</dd></div><div><dt>Maturidade cadastral</dt><dd><b>91%</b> · pronta para análise</dd></div></dl></article></section>}
    {tab==="Empresas / prontidão"&&<section className="panel insight-table"><div className="panel-head"><div><h2>Prontidão cadastral da carteira</h2><p>Quanto melhor a base, mais confiáveis os recortes e benchmarks.</p></div><input className="inline-search" aria-label="Buscar na prontidão" placeholder="Empresa, cidade, UF ou CNAE..." value={query} onChange={event=>setQuery(event.target.value)}/></div><table className="data-table"><thead><tr><th>Empresa</th><th>CNAE principal</th><th>Zona</th><th>Prontidão</th><th>Situação</th><th>Ação</th></tr></thead><tbody>{filtered.map(row=><tr key={row[0]}><td><strong>{row[0]}</strong></td><td><code>{row[1]}</code></td><td>{row[2]}</td><td><div className="readiness-cell"><i><em style={{width:`${row[3]}%`}}/></i><b>{row[3]}%</b></div></td><td><Status tone={row[3]>=85?"success":row[3]>=70?"warning":"danger"}>{row[4]}</Status></td><td><button className="table-action" onClick={()=>onNotice(`${row[0]} aberta na prontidão`)}>Abrir →</button></td></tr>)}</tbody></table></section>}
    {tab==="Políticas e fontes"&&<section className="policy-grid">{[["Privacidade por amostra","Nenhum benchmark é exibido abaixo da quantidade mínima de empresas do recorte.","01"],["Anonimização","Indicadores agregados não revelam nomes, valores individuais ou posição de uma empresa.","02"],["Fontes públicas","CNAE e contexto territorial são representados por dados fictícios nesta demonstração.","03"],["Rastreabilidade","Cada snapshot registra período, fonte e critérios utilizados para permitir auditoria.","04"]].map(row=><article className="panel policy-card" key={row[2]}><span>{row[2]}</span><div><h2>{row[0]}</h2><p>{row[1]}</p></div></article>)}</section>}
  </>;
}

const calendarViews = ["Mês", "Semana", "Dia", "Agenda"] as const;
type CalendarView = (typeof calendarViews)[number];

function CalendarDemo({ view, setView, onNotice }: { view: CalendarView; setView: (view: CalendarView) => void; onNotice: (message: string) => void }) {
  return <>
    <div className="calendar-toolbar"><div className="month-nav"><button aria-label="Mês anterior">‹</button><button>Hoje</button><button aria-label="Próximo mês">›</button></div><div className="view-switch" role="tablist" aria-label="Visualização do calendário">{calendarViews.map(item=><button key={item} role="tab" aria-selected={view===item} className={view===item?"active":""} onClick={()=>setView(item)}>{item}</button>)}</div><button className="quiet-button" onClick={()=>onNotice("Filtros do calendário abertos")}>☷ Filtrar</button></div>
    <div className="calendar-legend"><span><i className="tone-info" />Reuniões</span><span><i className="tone-success" />Compromissos</span><span><i className="tone-warning" />Central de Operações</span><span><i className="tone-neutral" />Pessoais</span></div>
    {view === "Mês" && <section className="calendar-layout"><article className="month-panel panel"><div className="weekdays">{["SEG","TER","QUA","QUI","SEX","SÁB","DOM"].map(day=><b key={day}>{day}</b>)}</div><div className="month-grid">{monthDays.map((item,index)=><button key={`${item.day}-${index}`} className={`${item.muted?"muted":""} ${item.day===3&&!item.muted?"selected":""}`} onClick={()=>item.events?.[0]&&onNotice(item.events[0].label)}><span>{item.day}</span>{item.events?.map(event=><small className={`event-chip ${event.tone}`} key={event.label}>{event.label}</small>)}</button>)}</div></article><aside className="day-peek panel"><span>SEGUNDA-FEIRA</span><h2>3 de agosto</h2><div className="peek-event info"><time>09:30</time><div><strong>Reunião de alinhamento</strong><p>Sala Horizonte · Equipe interna</p></div></div><div className="peek-event warning"><time>14:00</time><div><strong>Revisar tarefas da semana</strong><p>Central de Operações</p></div></div><button className="accent-button" onClick={()=>onNotice("Compromisso demonstrativo criado")}>+ Adicionar compromisso</button></aside></section>}
    {view === "Semana" && <section className="time-grid panel"><div className="time-head"><span>GMT-3</span>{["SEG 03","TER 04","QUA 05","QUI 06","SEX 07"].map(day=><b key={day}>{day}</b>)}</div><div className="time-body"><div className="hours">{["08:00","10:00","12:00","14:00","16:00","18:00"].map(hour=><span key={hour}>{hour}</span>)}</div><div className="week-canvas"><button className="calendar-block info" style={{gridColumn:1,gridRow:"2 / span 2"}} onClick={()=>onNotice("Reunião de alinhamento aberta")}>09:30<br/><b>Alinhamento</b></button><button className="calendar-block warning" style={{gridColumn:3,gridRow:"4 / span 2"}} onClick={()=>onNotice("Prazo SOL-1048 aberto")}>14:00<br/><b>Prazo SOL-1048</b></button><button className="calendar-block success" style={{gridColumn:5,gridRow:"3 / span 2"}}>11:00<br/><b>Revisão mensal</b></button></div></div></section>}
    {view === "Dia" && <section className="day-view panel"><div className="day-title"><span>SEGUNDA-FEIRA</span><h2>3 de agosto de 2026</h2></div>{["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"].map(hour=><div className="day-hour" key={hour}><time>{hour}</time>{hour==="09:00"&&<button className="day-event info" onClick={()=>onNotice("Reunião de alinhamento aberta")}><b>09:30 · Reunião de alinhamento</b><span>Sala Horizonte · 4 participantes</span></button>}{hour==="14:00"&&<button className="day-event warning"><b>14:00 · Revisar tarefas da semana</b><span>Central de Operações</span></button>}</div>)}</section>}
    {view === "Agenda" && <section className="agenda-view">{[["03","SEGUNDA","Reunião de alinhamento","09:30 – 10:30","info"],["05","QUARTA","Prazo · SOL-1048","Até 17:00","warning"],["07","SEXTA","Revisão mensal","11:00 – 12:00","success"],["10","SEGUNDA","Entrega ao cliente","14:30 – 15:00","info"]].map(row=><article className="agenda-day panel" key={row[0]}><div className="agenda-date"><b>{row[0]}</b><span>{row[1]}</span></div><i className={`tone-${row[4]}`} /><div><strong>{row[2]}</strong><p>{row[3]} · Dados demonstrativos</p></div><button onClick={()=>onNotice(`${row[2]} aberto`)}>Abrir →</button></article>)}</section>}
  </>;
}

function Companies({ onNotice }: { onNotice: (message: string) => void }) {
  const [query,setQuery]=useState("");
  const filtered=companies.filter(company=>`${company.name} ${company.code} ${company.segment}`.toLowerCase().includes(query.toLowerCase()));
  return <><section className="company-summary"><Kpi label="Empresas ativas" value="24" detail="Carteira inteiramente fictícia" tone="success" /><Kpi label="Em onboarding" value="2" detail="Fluxos demonstrativos" tone="warning" /><Kpi label="Solicitações abertas" value="10" detail="Em quatro empresas demo" tone="info" /></section><section className="panel companies-panel"><div className="directory-toolbar"><div><h2>Diretório de empresas</h2><p>Cadastros sintéticos para explorar a navegação</p></div><input aria-label="Buscar empresas" placeholder="Buscar por nome, código ou segmento..." value={query} onChange={event=>setQuery(event.target.value)} /></div><div className="company-grid">{filtered.map((company,index)=><button className="company-card" key={company.code} onClick={()=>onNotice(`${company.name} aberta em modo demonstrativo`)}><div className={`company-logo logo-${index+1}`}>{company.name[0]}</div><div className="company-main"><span><code>{company.code}</code><Status tone={company.tone}>{company.tone==="success"?"Ativa":"Onboarding"}</Status></span><h3>{company.name}</h3><p>{company.segment}</p><div className="module-chips">{company.modules.map(module=><small key={module}>{module}</small>)}</div></div><div className="company-open"><b>{company.open}</b><span>pendências</span><em>→</em></div></button>)}</div></section></>;
}

type GuideTab = { name: string; purpose: string; outcome: string };
type GuideEntry = { name: Exclude<ModuleName,"Guia dos módulos">; label: string; summary: string; original: string; demo: string; flow: string[]; tabs: GuideTab[]; capabilities: string[] };

const moduleGuides: GuideEntry[] = [
  {
    name:"Visão geral", label:"Leitura executiva", summary:"A porta de entrada do produto: transforma sinais dispersos em uma visão curta do que aconteceu, do que está pendente e do que vence em seguida.",
    original:"No projeto original, esta área consolida indicadores autorizados de diferentes rotinas e empresas para reduzir a troca de telas e orientar a prioridade diária da equipe.",
    demo:"A demonstração representa volume documental, movimento financeiro, pendências, compromissos e alertas com números inteiramente sintéticos.",
    flow:["Coletar sinais","Consolidar indicadores","Priorizar atenção","Abrir o módulo responsável"],
    tabs:[{name:"Painel único",purpose:"Reúne os principais indicadores operacionais e financeiros do período.",outcome:"Decisão mais rápida sobre onde agir."},{name:"Atividade",purpose:"Mostra a evolução diária de eventos processados pelo sistema.",outcome:"Percepção de ritmo, estabilidade e picos."},{name:"Agenda e alertas",purpose:"Destaca prazos, compromissos e exceções que exigem atenção.",outcome:"Menos riscos de atraso ou esquecimento."}],
    capabilities:["KPIs consolidados","Alertas acionáveis","Agenda integrada","Navegação contextual"],
  },
  {
    name:"Central de Operações", label:"Orquestração do trabalho", summary:"Organiza solicitações, tarefas, responsáveis, prazos e comunicação em uma esteira comum para toda a operação.",
    original:"No produto original, a Central conecta demandas internas e externas ao trabalho executado por cada setor, mantendo histórico, responsabilidade e rastreabilidade da entrega.",
    demo:"Os cartões, pessoas, prazos e mensagens são fictícios, mas preservam a lógica de uma operação multiárea acompanhada do início à conclusão.",
    flow:["Receber solicitação","Planejar tarefas","Executar e comunicar","Validar entrega","Concluir"],
    tabs:[{name:"Visão Geral",purpose:"Resume volume, prazo, carga de trabalho e itens aguardando retorno.",outcome:"Panorama operacional imediato."},{name:"Quadros",purpose:"Distribui solicitações por estágio em uma visualização Kanban.",outcome:"Gargalos e progresso ficam visíveis."},{name:"Solicitações",purpose:"Centraliza contexto, tarefas, mensagens, responsáveis e prazo de cada demanda.",outcome:"Histórico completo em um único lugar."},{name:"Minhas Pendências",purpose:"Filtra somente o trabalho que depende do usuário atual.",outcome:"Foco individual sem perder o contexto."},{name:"Cronograma",purpose:"Posiciona solicitações e tarefas em uma linha do tempo.",outcome:"Antecipação de conflitos e atrasos."}],
    capabilities:["Kanban","SLA e prazos","Responsabilidade","Mensagens","Linha do tempo","Auditoria"],
  },
  {
    name:"Fiscal", label:"Documentos e escrituração", summary:"Conecta captura de documentos fiscais, classificação assistida, revisão humana e preparação da escrituração.",
    original:"No projeto original, o módulo recebe DF-e, interpreta itens, aplica regras e histórico, calcula confiança, sinaliza inconsistências e mantém a decisão humana antes da integração contábil.",
    demo:"As notas, produtos, NCMs, valores, empresas e sugestões são sintéticos. A interação demonstra o raciocínio do fluxo sem executar classificação ou exportação real.",
    flow:["Capturar XML","Ler itens e tributos","Sugerir classificação","Revisar alertas","Aprovar","Preparar escrituração"],
    tabs:[{name:"Painel fiscal",purpose:"Resume o período e mostra a esteira entre notas capturadas, classificadas, conferidas e exportadas.",outcome:"Visibilidade do fechamento e de onde existem gargalos."},{name:"Classificador",purpose:"Apresenta sugestões de grupo, CFOP e tratamento fiscal por item, acompanhadas de confiança e alertas.",outcome:"Automação com revisão humana explícita e rastreável."},{name:"Cofre DF-e",purpose:"Organiza NF-e, NFC-e, CT-e, NFS-e e documentos incompletos, com filtros e ações em lote.",outcome:"Consulta documental centralizada e apoio à operação fiscal."}],
    capabilities:["XML DF-e","Motor de regras","Histórico por produto","Confiança","Alertas fiscais","Aprovação humana","Exportação estruturada"],
  },
  {
    name:"Contábil", label:"Fechamento e qualidade", summary:"Transforma saldos e lançamentos em uma rotina de análise, conciliação e tratamento de pendências do fechamento.",
    original:"No projeto original, esta área apoia a leitura do balancete e a identificação de variações, composições ou lançamentos que precisam de explicação antes do fechamento.",
    demo:"Os saldos, contas e percentuais são fictícios e existem apenas para comunicar o desenho funcional e o tipo de decisão apoiada.",
    flow:["Importar saldos","Comparar períodos","Detectar variações","Conciliar","Resolver pendências","Fechar"],
    tabs:[{name:"Balancete",purpose:"Apresenta composição patrimonial, evolução dos saldos e nível de preparação do fechamento.",outcome:"Leitura clara da posição contábil."},{name:"Análise por classificação",purpose:"Compara contas e destaca variações acima do comportamento esperado.",outcome:"Revisão direcionada por relevância."},{name:"Conciliação",purpose:"Relaciona movimentos e aponta lançamentos sem correspondência.",outcome:"Menos diferenças e trabalho manual."},{name:"Pendências",purpose:"Prioriza itens por impacto, responsável e prazo.",outcome:"Fechamento controlado e rastreável."}],
    capabilities:["Balancete","Análise horizontal","Composição de saldos","Conciliação","Detecção de anomalias","Pendências"],
  },
  {
    name:"Trabalhista", label:"Folha e pessoas", summary:"Acompanha indicadores de folha, movimentações de funcionários e exceções que merecem revisão preventiva.",
    original:"No produto original, o módulo organiza informações autorizadas do departamento pessoal para comparar períodos, acompanhar eventos e antecipar inconsistências antes da entrega.",
    demo:"Funcionários, empresas, valores e ocorrências são fictícios. Nenhum dado pessoal ou trabalhista real é exibido ou consultado.",
    flow:["Consolidar folha","Comparar competência","Revisar movimentações","Auditar exceções","Acompanhar correção"],
    tabs:[{name:"Dashboard",purpose:"Resume quadro ativo, admissões, férias, afastamentos e alertas da competência.",outcome:"Panorama da carteira trabalhista."},{name:"Comparações",purpose:"Compara salários, encargos, benefícios e horas extras entre períodos.",outcome:"Variações relevantes ficam evidentes."},{name:"Funcionários",purpose:"Oferece consulta operacional aos cadastros e situações de cada pessoa.",outcome:"Contexto centralizado para atendimento."},{name:"Auditoria",purpose:"Agrupa sinais de jornada, férias, documentação e variação salarial.",outcome:"Prevenção de erros antes do fechamento."}],
    capabilities:["Indicadores de folha","Movimentações","Comparativo mensal","Alertas preventivos","Consulta de pessoas"],
  },
  {
    name:"Inteligência de Mercado", label:"Contexto setorial", summary:"Enriquece a carteira com CNAE, território, maturidade cadastral e comparativos agregados com proteção de privacidade.",
    original:"No projeto original, esta frente foi desenhada para combinar fontes autorizadas, recortes geográficos e comportamento agregado sem expor o desempenho individual de clientes.",
    demo:"A página usa empresas, identificadores, regiões e índices sintéticos. A consulta CNPJ não chama qualquer serviço externo.",
    flow:["Qualificar cadastro","Definir território","Aplicar amostra mínima","Gerar snapshot","Comparar contexto"],
    tabs:[{name:"Visão geral",purpose:"Mostra prontidão por dimensão, distribuição territorial e frentes analíticas.",outcome:"Entendimento rápido da qualidade e cobertura da base."},{name:"Consulta CNPJ",purpose:"Demonstra como contexto cadastral e regional poderia ser apresentado.",outcome:"Leitura estruturada de uma empresa."},{name:"Empresas / prontidão",purpose:"Aponta lacunas de CNAE, zona ou cadastro antes das análises.",outcome:"Base mais confiável para comparação."},{name:"Políticas e fontes",purpose:"Explica amostra mínima, anonimização, fontes e rastreabilidade.",outcome:"Uso responsável e auditável dos indicadores."}],
    capabilities:["CNAE","Geografia","Prontidão cadastral","Benchmark ético","Amostra mínima","Snapshots"],
  },
  {
    name:"Calendário", label:"Tempo e compromissos", summary:"Reúne compromissos, prazos operacionais e disponibilidade da equipe em diferentes escalas de tempo.",
    original:"No produto original, o calendário aproxima agenda e operação para que reuniões, entregas e tarefas críticas possam ser visualizadas no mesmo contexto.",
    demo:"Todos os eventos, participantes e salas são fictícios; as interações apenas alternam formas de visualização.",
    flow:["Registrar compromisso","Relacionar contexto","Visualizar período","Acompanhar prazo"],
    tabs:[{name:"Mês",purpose:"Visão ampla de compromissos e prazos distribuídos no calendário.",outcome:"Planejamento da capacidade do período."},{name:"Semana",purpose:"Posiciona eventos em horários e dias úteis.",outcome:"Leitura de disponibilidade e conflitos."},{name:"Dia",purpose:"Detalha a agenda e o encadeamento de um único dia.",outcome:"Execução diária mais previsível."},{name:"Agenda",purpose:"Lista os próximos eventos em ordem cronológica.",outcome:"Consulta rápida do que vem a seguir."}],
    capabilities:["Múltiplas visualizações","Prazos operacionais","Categorias","Contexto compartilhado"],
  },
  {
    name:"Empresas", label:"Contexto multiempresa", summary:"Mantém uma visão pesquisável da carteira e dos módulos, situações e pendências associados a cada organização.",
    original:"No projeto original, o cadastro de empresas funciona como contexto transversal: permissões, documentos, tarefas e indicadores respeitam a organização selecionada.",
    demo:"A carteira possui somente empresas e códigos inventados e não reproduz cadastros, vínculos ou identificadores reais.",
    flow:["Cadastrar empresa","Habilitar módulos","Definir contexto","Acompanhar situação"],
    tabs:[{name:"Diretório",purpose:"Pesquisa empresas por nome, código ou segmento.",outcome:"Acesso rápido ao contexto correto."},{name:"Cartão da empresa",purpose:"Resume situação, módulos habilitados e quantidade de pendências.",outcome:"Orientação antes de abrir a operação."},{name:"Seletor global",purpose:"Representa a troca de contexto usada pelos demais módulos.",outcome:"Navegação multiempresa consistente."}],
    capabilities:["Multi-tenant","Pesquisa","Contexto global","Módulos por empresa","Permissões por escopo"],
  },
  {
    name:"Tecnologias", label:"Arquitetura do produto", summary:"Apresenta a stack e as práticas que sustentam interface, APIs, dados, processamento, integração e segurança.",
    original:"A página descreve tecnologias efetivamente relevantes ao projeto original em nível de portfólio, sem publicar código, credenciais, endereços ou configuração privada.",
    demo:"A ficha é informativa e agrupa a arquitetura por responsabilidade para facilitar a leitura técnica por recrutadores e desenvolvedores.",
    flow:["Interface","API e regras","Dados e workers","Integrações","Qualidade e segurança"],
    tabs:[{name:"Frontend",purpose:"Tecnologias usadas na experiência web e no gerenciamento de estado.",outcome:"Interface consistente e responsiva."},{name:"Backend",purpose:"APIs, validação, regras de negócio e processamento assíncrono.",outcome:"Serviços organizados e escaláveis."},{name:"Dados e infraestrutura",purpose:"Persistência, cache, containers e automação de entrega.",outcome:"Operação previsível e rastreável."},{name:"Integrações e documentos",purpose:"Protocolos e formatos que conectam sistemas e documentos fiscais.",outcome:"Interoperabilidade com segurança."},{name:"Qualidade e segurança",purpose:"Práticas de isolamento, auditoria, testes e revisão.",outcome:"Produto mais confiável e sustentável."}],
    capabilities:["Next.js","React","TypeScript","FastAPI","PostgreSQL","Redis","Celery","Docker","RBAC","CI/CD"],
  },
];

function ProductGuide({onOpenModule}:{onOpenModule:(module:ModuleName)=>void}){
  const [active,setActive]=useState<GuideEntry["name"]>("Fiscal");
  const guide=moduleGuides.find(item=>item.name===active) ?? moduleGuides[0];
  return <section className="guide-layout">
    <aside className="panel guide-index"><div><span>MAPA DO PRODUTO</span><h2>Guia dos módulos</h2><p>Selecione uma área para conhecer o papel dela no produto.</p></div><nav aria-label="Módulos documentados">{moduleGuides.map((item,index)=><button key={item.name} className={active===item.name?"active":""} aria-current={active===item.name?"page":undefined} onClick={()=>setActive(item.name)}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{item.name}</strong><small>{item.label}</small></div><em>→</em></button>)}</nav></aside>
    <article className="guide-detail">
      <header className="panel guide-hero"><div><span>{guide.label.toUpperCase()}</span><h2>{guide.name}</h2><p>{guide.summary}</p></div><button className="accent-button" onClick={()=>onOpenModule(guide.name)}>Abrir demonstração →</button><div className="guide-original"><b>No produto original</b><p>{guide.original}</p></div><div className="guide-demo"><b>Nesta demonstração</b><p>{guide.demo}</p></div></header>
      <section className="panel guide-flow"><div className="panel-head"><div><h2>Fluxo representado</h2><p>Como a informação percorre o módulo</p></div><Status tone="info">Visão funcional</Status></div><div>{guide.flow.map((step,index)=><span key={step}><i>{index+1}</i><b>{step}</b>{index<guide.flow.length-1&&<em>→</em>}</span>)}</div></section>
      <section className="guide-tabs-section"><div className="guide-section-title"><div><span>ABAS E FUNÇÕES</span><h2>O que cada área resolve</h2></div><b>{guide.tabs.length} áreas explicadas</b></div><div className="guide-tab-grid">{guide.tabs.map((tab,index)=><article className="panel guide-tab-card" key={tab.name}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{tab.name}</h3><p>{tab.purpose}</p><footer><b>Resultado</b><small>{tab.outcome}</small></footer></div></article>)}</div></section>
      <section className="panel guide-capabilities"><div><span>CAPACIDADES RELACIONADAS</span><h2>Conceitos demonstrados</h2></div><ul>{guide.capabilities.map(item=><li key={item}>{item}</li>)}</ul></section>
    </article>
  </section>;
}

const technologyGroups = [
  { title: "Frontend", description: "Interface, estado e visualização", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "TanStack Query", "Recharts", "Base UI", "Radix UI", "Motion", "Lucide"] },
  { title: "Backend", description: "APIs, regras e processamento", items: ["Python", "FastAPI", "SQLAlchemy", "Pydantic", "Alembic", "Celery", "APIs REST", "Workers assíncronos"] },
  { title: "Dados e infraestrutura", description: "Persistência e operação", items: ["PostgreSQL", "Redis", "Docker", "Caddy", "Cloudflare Tunnel", "GitHub Actions", "Windows Server", "PowerShell"] },
  { title: "Integrações e documentos", description: "Interoperabilidade do produto", items: ["XML DF-e", "PDF", "Excel / XLSX", "ODBC", "Certificados A1", "OAuth 2.0", "SMTP", "Webhooks"] },
  { title: "Qualidade e segurança", description: "Práticas aplicadas ao projeto", items: ["RBAC", "Multi-tenant", "Testes automatizados", "Auditoria", "Criptografia", "Validação de schemas", "CI/CD", "Revisão por pull request"] },
];

function Technologies() {
  return <section className="tech-layout"><article className="tech-intro panel"><span>ARQUITETURA DE PRODUTO</span><h2>Uma stack completa, aplicada a problemas reais.</h2><p>Esta lista apresenta tecnologias e práticas do projeto original em nível de portfólio. Não inclui endereços, credenciais, configurações, código ou detalhes privados de infraestrutura.</p><div className="tech-stats"><div><b>5</b><span>camadas apresentadas</span></div><div><b>30+</b><span>tecnologias e práticas</span></div><div><b>0</b><span>dados internos publicados</span></div></div></article><div className="tech-groups">{technologyGroups.map((group,index)=><article className="panel tech-card" key={group.title}><div className={`tech-icon tech-${index+1}`}>{String(index+1).padStart(2,"0")}</div><div><h3>{group.title}</h3><p>{group.description}</p></div><ul>{group.items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div></section>;
}

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleName>("Visão geral");
  const [operationsTab, setOperationsTab] = useState<OperationsTab>("Quadros");
  const [cofreType, setCofreType] = useState<CofreType>("NF-e");
  const [calendarView, setCalendarView] = useState<CalendarView>("Mês");
  const [notice, setNotice] = useState<string | null>(null);
  const meta = moduleMeta[activeModule];
  const actionLabel = useMemo(() => meta.action, [meta]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2800);
  };

  const selectModule = (module: ModuleName) => {
    setActiveModule(module);
  };

  const navButton = (module: ModuleName) => <button key={module} className={activeModule===module?"active":""} aria-current={activeModule===module?"page":undefined} onClick={()=>selectModule(module)}><span aria-hidden="true">{navIcons[module]}</span>{module}</button>;

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#top" aria-label="NexaFlow Demo — início"><span className="brand-mark">N</span><span><strong>NexaFlow</strong><small>DEMONSTRAÇÃO FICTÍCIA</small></span></a>
      <button className="tenant"><span><small>Empresa</small><strong>100 · AURORA COMÉRCIO DEMO</strong></span><b>⌄</b></button>
      <label className="sidebar-search"><span aria-hidden="true">⌕</span><input aria-label="Buscar módulos" placeholder="Buscar módulos..." /></label>
      <nav aria-label="Seções da demonstração"><p>Principal</p>{productModules.slice(0,2).map(navButton)}<p>Módulos</p>{productModules.slice(2).map(navButton)}<p>Portfólio</p>{portfolioModules.map(navButton)}</nav>
      <div className="sidebar-bottom"><div className="demo-user"><span>AD</span><div><strong>Aloyr Demo</strong><small>Acesso fictício</small></div></div><a href="https://ylaros.github.io/">← Voltar ao portfólio</a></div>
    </aside>
    <main id="top">
      <div className="privacy-banner" role="note"><span>AMBIENTE DEMONSTRATIVO</span><b>Dados 100% sintéticos</b> · interface autoral inspirada apenas nos fluxos do produto</div>
      <header className="page-header"><div><p>{meta.eyebrow}</p><h1>{activeModule}</h1><span>{meta.description}</span></div><div className="header-actions"><button className="period-button">Jul 2026 <span>⌄</span></button>{actionLabel&&<button className="accent-button" onClick={()=>showNotice(`${actionLabel} — ação apenas demonstrativa`)}>+ {actionLabel}</button>}</div></header>
      <div className="module-content">
        {activeModule==="Visão geral"&&<Overview />}
        {activeModule==="Central de Operações"&&<Operations tab={operationsTab} setTab={setOperationsTab} onNotice={showNotice} />}
        {activeModule==="Fiscal"&&<FiscalModule type={cofreType} setType={setCofreType} onNotice={showNotice} />}
        {activeModule==="Contábil"&&<AccountingModule onNotice={showNotice} />}
        {activeModule==="Trabalhista"&&<LaborModule onNotice={showNotice} />}
        {activeModule==="Inteligência de Mercado"&&<MarketIntelligence onNotice={showNotice} />}
        {activeModule==="Calendário"&&<CalendarDemo view={calendarView} setView={setCalendarView} onNotice={showNotice} />}
        {activeModule==="Empresas"&&<Companies onNotice={showNotice} />}
        {activeModule==="Guia dos módulos"&&<ProductGuide onOpenModule={selectModule} />}
        {activeModule==="Tecnologias"&&<Technologies />}
      </div>
      <footer className="site-footer"><span>NexaFlow é uma demonstração fictícia criada para o portfólio de Aloyr.</span><span>Sem conexão com dados, APIs ou infraestrutura reais.</span></footer>
      {notice&&<div className="toast" role="status"><b>{notice}</b><span>Nenhuma operação real foi executada.</span></div>}
    </main>
  </div>;
}
