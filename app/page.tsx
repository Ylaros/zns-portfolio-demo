"use client";

import { useState, type CSSProperties } from "react";

const workspaceViews = ["Visão geral", "Operações", "Documentos", "Automação"] as const;
const managementViews = ["Empresas", "Relatórios"] as const;
const views = [...workspaceViews, ...managementViews] as const;
type ViewName = (typeof views)[number];

type Tone = "success" | "warning" | "neutral";

type DashboardView = {
  eyebrow: string;
  actionLabel: string;
  notice: string;
  metrics: Array<{ icon: string; tone: string; label: string; value: string; note: string; noteTone: "positive" | "attention" | "neutral" }>;
  chart: { title: string; subtitle: string; bars: number[]; legend: string; reference: string };
  health: { title: string; subtitle: string; percent: number; center: string; label: string; items: Array<{ label: string; value: string; tone: string }> };
  table: {
    title: string;
    subtitle: string;
    columns: [string, string, string];
    rows: Array<{ name: string; code: string; task: string; status: string; tone: Tone; progress: number }>;
  };
};

const dashboardViews: Record<ViewName, DashboardView> = {
  "Visão geral": {
    eyebrow: "Central de operações",
    actionLabel: "Gerar resumo fictício",
    notice: "Resumo fictício preparado",
    metrics: [
      { icon: "↗", tone: "violet", label: "PROCESSOS ATIVOS", value: "42", note: "+8,2% vs. período anterior", noteTone: "positive" },
      { icon: "✓", tone: "green", label: "TAXA DE CONCLUSÃO", value: "96,4%", note: "+2,1% desempenho sintético", noteTone: "positive" },
      { icon: "!", tone: "amber", label: "ITENS PARA REVISAR", value: "7", note: "3 vencem hoje", noteTone: "attention" },
      { icon: "⌁", tone: "blue", label: "TEMPO MÉDIO", value: "12m", note: "−18% tempo operacional", noteTone: "positive" },
    ],
    chart: { title: "Volume processado", subtitle: "Eventos fictícios por dia", bars: [44, 58, 51, 68, 62, 81, 73, 91, 78, 96, 88, 100], legend: "Período atual", reference: "Referência sintética" },
    health: { title: "Saúde da operação", subtitle: "Distribuição do fluxo", percent: 84, center: "96%", label: "No prazo", items: [{ label: "No prazo", value: "84", tone: "green-dot" }, { label: "Atenção", value: "9", tone: "amber-dot" }, { label: "Pendente", value: "3", tone: "gray-dot" }] },
    table: { title: "Fila de trabalho", subtitle: "Empresas e rotinas demonstrativas", columns: ["Empresa fictícia", "Identificador", "Rotina"], rows: [
      { name: "Aurora Comércio Demo", code: "DEM-1042", status: "Concluído", tone: "success", task: "Conciliação mensal", progress: 100 },
      { name: "Horizonte Serviços Lab", code: "DEM-2187", status: "Em análise", tone: "warning", task: "Revisão documental", progress: 68 },
      { name: "Vértice Mercado Teste", code: "DEM-3301", status: "Pendente", tone: "neutral", task: "Classificação assistida", progress: 42 },
      { name: "Orbe Indústria Fictícia", code: "DEM-4479", status: "Concluído", tone: "success", task: "Fechamento operacional", progress: 100 },
    ] },
  },
  "Operações": {
    eyebrow: "Execução e filas",
    actionLabel: "Iniciar rotina demo",
    notice: "Rotina demonstrativa iniciada",
    metrics: [
      { icon: "▶", tone: "violet", label: "ROTINAS EM EXECUÇÃO", value: "9", note: "2 iniciadas nesta hora", noteTone: "positive" },
      { icon: "⇄", tone: "green", label: "JOBS CONCLUÍDOS", value: "318", note: "98,7% sem reprocesso", noteTone: "positive" },
      { icon: "!", tone: "amber", label: "ALERTAS OPERACIONAIS", value: "4", note: "Todos fictícios", noteTone: "attention" },
      { icon: "◷", tone: "blue", label: "FILA MÉDIA", value: "03m", note: "Dentro do objetivo", noteTone: "positive" },
    ],
    chart: { title: "Execuções por horário", subtitle: "Jobs sintéticos concluídos", bars: [35, 42, 48, 66, 82, 91, 74, 68, 88, 79, 59, 46], legend: "Jobs concluídos", reference: "Capacidade simulada" },
    health: { title: "Estado das filas", subtitle: "Distribuição operacional", percent: 78, center: "78%", label: "Livres", items: [{ label: "Livres", value: "7", tone: "green-dot" }, { label: "Processando", value: "2", tone: "amber-dot" }, { label: "Pausadas", value: "0", tone: "gray-dot" }] },
    table: { title: "Rotinas recentes", subtitle: "Execuções inteiramente simuladas", columns: ["Rotina fictícia", "Job", "Responsável"], rows: [
      { name: "Conferência Aurora", code: "JOB-0410", task: "Worker Atlas", status: "Executando", tone: "warning", progress: 76 },
      { name: "Fechamento Horizonte", code: "JOB-0409", task: "Worker Íris", status: "Concluído", tone: "success", progress: 100 },
      { name: "Validação Vértice", code: "JOB-0408", task: "Worker Atlas", status: "Na fila", tone: "neutral", progress: 18 },
      { name: "Resumo Orbe", code: "JOB-0407", task: "Worker Nexo", status: "Concluído", tone: "success", progress: 100 },
    ] },
  },
  "Documentos": {
    eyebrow: "Documentos e validação",
    actionLabel: "Simular importação",
    notice: "Importação fictícia concluída",
    metrics: [
      { icon: "▱", tone: "violet", label: "DOCUMENTOS NO PERÍODO", value: "1.284", note: "+126 nesta semana", noteTone: "positive" },
      { icon: "✓", tone: "green", label: "VALIDADOS", value: "99,1%", note: "Sem dados reais", noteTone: "positive" },
      { icon: "!", tone: "amber", label: "DIVERGÊNCIAS", value: "11", note: "5 aguardam revisão", noteTone: "attention" },
      { icon: "⌁", tone: "blue", label: "ARMAZENAMENTO DEMO", value: "2,4 GB", note: "Arquivos simulados", noteTone: "neutral" },
    ],
    chart: { title: "Documentos recebidos", subtitle: "Volume sintético por dia", bars: [52, 47, 61, 58, 72, 69, 84, 76, 92, 87, 95, 89], legend: "Recebidos", reference: "Validados" },
    health: { title: "Qualidade documental", subtitle: "Resultado das validações", percent: 91, center: "99%", label: "Válidos", items: [{ label: "Válidos", value: "1.273", tone: "green-dot" }, { label: "Revisão", value: "8", tone: "amber-dot" }, { label: "Pendentes", value: "3", tone: "gray-dot" }] },
    table: { title: "Documentos recentes", subtitle: "Metadados criados para demonstração", columns: ["Documento fictício", "Tipo", "Origem"], rows: [
      { name: "Pacote Aurora — Jul/26", code: "XML-DEMO", task: "Upload manual", status: "Validado", tone: "success", progress: 100 },
      { name: "Relatório Horizonte 08", code: "XLSX-DEMO", task: "Integração simulada", status: "Em análise", tone: "warning", progress: 64 },
      { name: "Resumo Vértice Q3", code: "PDF-DEMO", task: "Portal fictício", status: "Pendente", tone: "neutral", progress: 35 },
      { name: "Lote Orbe 4479", code: "ZIP-DEMO", task: "Upload manual", status: "Validado", tone: "success", progress: 100 },
    ] },
  },
  "Automação": {
    eyebrow: "Agendamentos e regras",
    actionLabel: "Criar automação demo",
    notice: "Automação fictícia criada",
    metrics: [
      { icon: "◇", tone: "violet", label: "AUTOMAÇÕES ATIVAS", value: "16", note: "4 categorias simuladas", noteTone: "positive" },
      { icon: "✓", tone: "green", label: "EXECUÇÕES NO MÊS", value: "892", note: "97,8% concluídas", noteTone: "positive" },
      { icon: "!", tone: "amber", label: "REGRAS EM REVISÃO", value: "3", note: "Sem impacto real", noteTone: "attention" },
      { icon: "◷", tone: "blue", label: "TEMPO ECONOMIZADO", value: "38h", note: "Estimativa fictícia", noteTone: "neutral" },
    ],
    chart: { title: "Execuções automáticas", subtitle: "Acionamentos sintéticos por dia", bars: [28, 45, 39, 64, 55, 73, 68, 86, 82, 94, 91, 98], legend: "Automáticas", reference: "Manuais evitadas" },
    health: { title: "Confiabilidade", subtitle: "Resultado dos agendamentos", percent: 88, center: "98%", label: "Sucesso", items: [{ label: "Sucesso", value: "872", tone: "green-dot" }, { label: "Retry", value: "17", tone: "amber-dot" }, { label: "Pausadas", value: "3", tone: "gray-dot" }] },
    table: { title: "Agenda de automações", subtitle: "Regras e horários demonstrativos", columns: ["Automação fictícia", "Agenda", "Próxima execução"], rows: [
      { name: "Conferência matinal", code: "Diária 08:00", task: "Amanhã, 08:00", status: "Ativa", tone: "success", progress: 100 },
      { name: "Revisão de pendências", code: "A cada 2h", task: "Hoje, 16:00", status: "Ativa", tone: "success", progress: 82 },
      { name: "Resumo semanal", code: "Sexta 17:30", task: "Sex, 17:30", status: "Em revisão", tone: "warning", progress: 58 },
      { name: "Arquivo mensal", code: "Dia 01", task: "01/08, 06:00", status: "Pausada", tone: "neutral", progress: 24 },
    ] },
  },
  "Empresas": {
    eyebrow: "Carteira demonstrativa",
    actionLabel: "Adicionar empresa demo",
    notice: "Empresa fictícia adicionada à simulação",
    metrics: [
      { icon: "◎", tone: "violet", label: "EMPRESAS DEMO", value: "24", note: "+3 neste trimestre", noteTone: "positive" },
      { icon: "✓", tone: "green", label: "CARTEIRA ATIVA", value: "22", note: "91,7% do total", noteTone: "positive" },
      { icon: "!", tone: "amber", label: "ONBOARDINGS", value: "2", note: "Etapas simuladas", noteTone: "attention" },
      { icon: "⌁", tone: "blue", label: "SEGMENTOS", value: "6", note: "Classificação fictícia", noteTone: "neutral" },
    ],
    chart: { title: "Evolução da carteira", subtitle: "Empresas fictícias ativas", bars: [36, 40, 43, 48, 51, 57, 61, 66, 72, 78, 86, 94], legend: "Carteira ativa", reference: "Novos cadastros" },
    health: { title: "Status da carteira", subtitle: "Distribuição das empresas", percent: 92, center: "92%", label: "Ativas", items: [{ label: "Ativas", value: "22", tone: "green-dot" }, { label: "Onboarding", value: "2", tone: "amber-dot" }, { label: "Pausadas", value: "0", tone: "gray-dot" }] },
    table: { title: "Diretório de empresas", subtitle: "Carteira integralmente fictícia", columns: ["Empresa fictícia", "Código", "Segmento"], rows: [
      { name: "Aurora Comércio Demo", code: "DEM-1042", task: "Comércio", status: "Ativa", tone: "success", progress: 100 },
      { name: "Horizonte Serviços Lab", code: "DEM-2187", task: "Serviços", status: "Ativa", tone: "success", progress: 100 },
      { name: "Vértice Mercado Teste", code: "DEM-3301", task: "Varejo", status: "Onboarding", tone: "warning", progress: 72 },
      { name: "Orbe Indústria Fictícia", code: "DEM-4479", task: "Indústria", status: "Ativa", tone: "success", progress: 100 },
    ] },
  },
  "Relatórios": {
    eyebrow: "Análises e exportações",
    actionLabel: "Gerar relatório demo",
    notice: "Relatório fictício preparado",
    metrics: [
      { icon: "⌗", tone: "violet", label: "RELATÓRIOS GERADOS", value: "68", note: "+12 neste mês", noteTone: "positive" },
      { icon: "✓", tone: "green", label: "EXPORTAÇÕES", value: "51", note: "100% sintéticas", noteTone: "positive" },
      { icon: "!", tone: "amber", label: "AGENDADOS", value: "5", note: "Próximos 7 dias", noteTone: "attention" },
      { icon: "◷", tone: "blue", label: "GERAÇÃO MÉDIA", value: "08s", note: "Tempo simulado", noteTone: "neutral" },
    ],
    chart: { title: "Relatórios por período", subtitle: "Gerações fictícias por semana", bars: [42, 56, 49, 63, 58, 71, 67, 80, 76, 88, 84, 96], legend: "Gerados", reference: "Exportados" },
    health: { title: "Formatos utilizados", subtitle: "Distribuição das exportações", percent: 72, center: "72%", label: "PDF", items: [{ label: "PDF", value: "37", tone: "green-dot" }, { label: "XLSX", value: "21", tone: "amber-dot" }, { label: "CSV", value: "10", tone: "gray-dot" }] },
    table: { title: "Biblioteca de relatórios", subtitle: "Arquivos e períodos demonstrativos", columns: ["Relatório fictício", "Formato", "Período"], rows: [
      { name: "Resumo executivo Aurora", code: "PDF", task: "Julho/2026", status: "Disponível", tone: "success", progress: 100 },
      { name: "Operações Horizonte", code: "XLSX", task: "2º trimestre", status: "Disponível", tone: "success", progress: 100 },
      { name: "Pendências Vértice", code: "CSV", task: "Últimos 30 dias", status: "Gerando", tone: "warning", progress: 61 },
      { name: "Indicadores Orbe", code: "PDF", task: "Ano de 2026", status: "Agendado", tone: "neutral", progress: 30 },
    ] },
  },
};

const icons: Record<ViewName, string> = { "Visão geral": "◫", "Operações": "⌁", "Documentos": "▱", "Automação": "◇", "Empresas": "◎", "Relatórios": "⌗" };

export default function Home() {
  const [activeView, setActiveView] = useState<ViewName>("Visão geral");
  const [period, setPeriod] = useState("Últimos 30 dias");
  const [notice, setNotice] = useState<string | null>(null);
  const view = dashboardViews[activeView];

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 3200);
  };

  const renderNavButton = (name: ViewName) => (
    <button key={name} className={activeView === name ? "active" : ""} aria-pressed={activeView === name} onClick={() => setActiveView(name)}>
      <span className="nav-icon" aria-hidden="true">{icons[name]}</span>{name}
    </button>
  );

  return (
    <div className="app-shell">
      <aside>
        <a className="brand" href="#top" aria-label="NexaFlow Demo — início">
          <span className="brand-mark">N</span>
          <span><strong>NexaFlow</strong><small>Portfolio demo</small></span>
        </a>
        <nav aria-label="Seções da demonstração">
          <p>Workspace</p>
          {workspaceViews.map(renderNavButton)}
          <p>Gestão</p>
          {managementViews.map(renderNavButton)}
        </nav>
        <div className="aside-bottom">
          <div className="demo-user"><span>YD</span><div><strong>Usuário Demo</strong><small>Acesso fictício</small></div></div>
          <a href="https://ylaros.github.io/">← Voltar ao portfólio</a>
        </div>
      </aside>

      <main id="top">
        <div className="privacy-banner" role="note"><span>Ambiente demonstrativo</span>Dados 100% sintéticos · não representa o sistema real</div>
        <header>
          <div><p>{view.eyebrow}</p><h1>{activeView}</h1></div>
          <div className="header-actions">
            <label><span className="sr-only">Período do painel</span><select value={period} onChange={(event) => setPeriod(event.target.value)}><option>Últimos 7 dias</option><option>Últimos 30 dias</option><option>Este trimestre</option></select></label>
            <button className="primary-action" onClick={() => showNotice(view.notice)}>{view.actionLabel}</button>
          </div>
        </header>

        <section className="metric-grid" aria-label={`Indicadores de ${activeView} — ${period}`}>
          {view.metrics.map((metric) => (
            <article key={metric.label}><div><span className={`metric-icon ${metric.tone}`}>{metric.icon}</span><small>{metric.label}</small></div><strong>{metric.value}</strong><p className={`metric-trend ${metric.noteTone}`}>{metric.note}</p></article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="chart-card card">
            <div className="card-head"><div><span>{view.chart.title}</span><small>{view.chart.subtitle}</small></div><button onClick={() => showNotice(`Detalhes de ${view.chart.title.toLowerCase()} abertos`)} aria-label={`Abrir detalhes de ${view.chart.title}`}>•••</button></div>
            <div className="chart-area"><div className="y-labels"><span>120</span><span>80</span><span>40</span><span>0</span></div><div className="bars" aria-label={`Gráfico: ${view.chart.subtitle}`}>
              {view.chart.bars.map((height, index) => <div key={`${activeView}-${index}`}><span style={{ height: `${height}%` }} /><small>{index + 1}</small></div>)}
            </div></div>
            <div className="legend"><span><i className="legend-current" />{view.chart.legend}</span><span><i />{view.chart.reference}</span></div>
          </article>

          <article className="health-card card">
            <div className="card-head"><div><span>{view.health.title}</span><small>{view.health.subtitle}</small></div><button onClick={() => showNotice(`Detalhes de ${view.health.title.toLowerCase()} abertos`)} aria-label={`Abrir detalhes de ${view.health.title}`}>•••</button></div>
            <div className="donut" style={{ "--donut-value": `${view.health.percent}%` } as CSSProperties} aria-label={`${view.health.center} ${view.health.label}`}><div><strong>{view.health.center}</strong><small>{view.health.label}</small></div></div>
            <div className="health-list">{view.health.items.map((item) => <div key={item.label}><span><i className={`dot ${item.tone}`} />{item.label}</span><b>{item.value}</b></div>)}</div>
          </article>
        </section>

        <section className="table-card card">
          <div className="card-head"><div><span>{view.table.title}</span><small>{view.table.subtitle}</small></div><button onClick={() => showNotice(`Lista completa de ${view.table.title.toLowerCase()} aberta`)}>Ver todas →</button></div>
          <div className="table-wrap"><table><thead><tr><th>{view.table.columns[0]}</th><th>{view.table.columns[1]}</th><th>{view.table.columns[2]}</th><th>Status</th><th>Progresso</th></tr></thead><tbody>
            {view.table.rows.map((row, index) => <tr key={`${activeView}-${row.code}-${index}`}><td><span className={`company-avatar avatar-${index + 1}`}>{row.name[0]}</span><strong>{row.name}</strong></td><td><code>{row.code}</code></td><td>{row.task}</td><td><span className={`status ${row.tone}`}>{row.status}</span></td><td><div className="progress"><span style={{ width: `${row.progress}%` }} /></div><small>{row.progress}%</small></td></tr>)}
          </tbody></table></div>
        </section>

        <footer><p>NexaFlow é uma interface fictícia criada exclusivamente para portfólio.</p><span>Sem conexão com dados, APIs ou infraestrutura reais.</span></footer>
        {notice && <div className="toast" role="status"><b>{notice}</b><span>Nenhum arquivo, integração ou dado real foi utilizado.</span></div>}
      </main>
    </div>
  );
}
