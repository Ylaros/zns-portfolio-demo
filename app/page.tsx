"use client";

import { useMemo, useState } from "react";

const productModules = ["Visão geral", "Central de Operações", "Cofre", "Calendário", "Empresas"] as const;
const portfolioModules = ["Tecnologias"] as const;
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
  Cofre: {
    eyebrow: "Documentos fiscais",
    description: "Consulte documentos por tipo, período, empresa e situação documental.",
    action: "Importar XML demo",
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
  Tecnologias: {
    eyebrow: "Ficha técnica",
    description: "Tecnologias e práticas presentes na construção do produto original.",
  },
};

const navIcons: Record<ModuleName, string> = {
  "Visão geral": "⌂",
  "Central de Operações": "◎",
  Cofre: "▱",
  Calendário: "□",
  Empresas: "◇",
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
      <nav aria-label="Seções da demonstração"><p>Principal</p>{productModules.slice(0,3).map(navButton)}<p>Módulos</p>{productModules.slice(3).map(navButton)}<p>Portfólio</p>{portfolioModules.map(navButton)}</nav>
      <div className="sidebar-bottom"><div className="demo-user"><span>AD</span><div><strong>Aloyr Demo</strong><small>Acesso fictício</small></div></div><a href="https://ylaros.github.io/">← Voltar ao portfólio</a></div>
    </aside>
    <main id="top">
      <div className="privacy-banner" role="note"><span>AMBIENTE DEMONSTRATIVO</span><b>Dados 100% sintéticos</b> · interface autoral inspirada apenas nos fluxos do produto</div>
      <header className="page-header"><div><p>{meta.eyebrow}</p><h1>{activeModule}</h1><span>{meta.description}</span></div><div className="header-actions"><button className="period-button">Jul 2026 <span>⌄</span></button>{actionLabel&&<button className="accent-button" onClick={()=>showNotice(`${actionLabel} — ação apenas demonstrativa`)}>+ {actionLabel}</button>}</div></header>
      <div className="module-content">
        {activeModule==="Visão geral"&&<Overview />}
        {activeModule==="Central de Operações"&&<Operations tab={operationsTab} setTab={setOperationsTab} onNotice={showNotice} />}
        {activeModule==="Cofre"&&<Vault type={cofreType} setType={setCofreType} onNotice={showNotice} />}
        {activeModule==="Calendário"&&<CalendarDemo view={calendarView} setView={setCalendarView} onNotice={showNotice} />}
        {activeModule==="Empresas"&&<Companies onNotice={showNotice} />}
        {activeModule==="Tecnologias"&&<Technologies />}
      </div>
      <footer className="site-footer"><span>NexaFlow é uma demonstração fictícia criada para o portfólio de Aloyr.</span><span>Sem conexão com dados, APIs ou infraestrutura reais.</span></footer>
      {notice&&<div className="toast" role="status"><b>{notice}</b><span>Nenhuma operação real foi executada.</span></div>}
    </main>
  </div>;
}
