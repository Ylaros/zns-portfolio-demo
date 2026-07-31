"use client";

import { useState } from "react";

const views = ["Visão geral", "Operações", "Documentos", "Automação"];
const companies = [
  { name: "Aurora Comércio Demo", code: "DEM-1042", status: "Concluído", tone: "success", task: "Conciliação mensal" },
  { name: "Horizonte Serviços Lab", code: "DEM-2187", status: "Em análise", tone: "warning", task: "Revisão documental" },
  { name: "Vértice Mercado Teste", code: "DEM-3301", status: "Pendente", tone: "neutral", task: "Classificação assistida" },
  { name: "Orbe Indústria Fictícia", code: "DEM-4479", status: "Concluído", tone: "success", task: "Fechamento operacional" },
];

export default function Home() {
  const [activeView, setActiveView] = useState("Visão geral");
  const [period, setPeriod] = useState("Últimos 30 dias");
  const [notice, setNotice] = useState(false);

  const showNotice = () => {
    setNotice(true);
    window.setTimeout(() => setNotice(false), 3200);
  };

  return (
    <div className="app-shell">
      <aside>
        <a className="brand" href="#top" aria-label="NexaFlow Demo — início">
          <span className="brand-mark">N</span>
          <span><strong>NexaFlow</strong><small>Portfolio demo</small></span>
        </a>
        <nav aria-label="Seções da demonstração">
          <p>Workspace</p>
          {views.map((view, index) => (
            <button key={view} className={activeView === view ? "active" : ""} onClick={() => setActiveView(view)}>
              <span className="nav-icon" aria-hidden="true">{["◫", "⌁", "▱", "◇"][index]}</span>{view}
            </button>
          ))}
          <p>Gestão</p>
          <button onClick={() => setActiveView("Empresas")}><span className="nav-icon">◎</span>Empresas</button>
          <button onClick={() => setActiveView("Relatórios")}><span className="nav-icon">⌗</span>Relatórios</button>
        </nav>
        <div className="aside-bottom">
          <div className="demo-user"><span>YD</span><div><strong>Usuário Demo</strong><small>Acesso fictício</small></div></div>
          <a href="https://ylaros.github.io/">← Voltar ao portfólio</a>
        </div>
      </aside>

      <main id="top">
        <div className="privacy-banner" role="note">
          <span>Ambiente demonstrativo</span>
          Dados 100% sintéticos · não representa o sistema real
        </div>
        <header>
          <div>
            <p>Central de operações</p>
            <h1>{activeView}</h1>
          </div>
          <div className="header-actions">
            <label>
              <span className="sr-only">Período do painel</span>
              <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
                <option>Este trimestre</option>
              </select>
            </label>
            <button className="primary-action" onClick={showNotice}>Gerar resumo fictício</button>
          </div>
        </header>

        <section className="metric-grid" aria-label={`Indicadores de ${period}`}>
          <article><div><span className="metric-icon violet">↗</span><small>PROCESSOS ATIVOS</small></div><strong>42</strong><p><b>+8,2%</b> vs. período anterior</p></article>
          <article><div><span className="metric-icon green">✓</span><small>TAXA DE CONCLUSÃO</small></div><strong>96,4%</strong><p><b>+2,1%</b> desempenho sintético</p></article>
          <article><div><span className="metric-icon amber">!</span><small>ITENS PARA REVISAR</small></div><strong>7</strong><p><em>3 vencem hoje</em></p></article>
          <article><div><span className="metric-icon blue">⌁</span><small>TEMPO MÉDIO</small></div><strong>12m</strong><p><b>−18%</b> tempo operacional</p></article>
        </section>

        <section className="dashboard-grid">
          <article className="chart-card card">
            <div className="card-head"><div><span>Volume processado</span><small>Eventos fictícios por dia</small></div><button aria-label="Mais opções">•••</button></div>
            <div className="chart-area">
              <div className="y-labels"><span>120</span><span>80</span><span>40</span><span>0</span></div>
              <div className="bars" aria-label="Gráfico: crescimento gradual do volume processado">
                {[44, 58, 51, 68, 62, 81, 73, 91, 78, 96, 88, 100].map((height, index) => (
                  <div key={index}><span style={{ height: `${height}%` }} /><small>{index + 1}</small></div>
                ))}
              </div>
            </div>
            <div className="legend"><span><i className="legend-current" />Período atual</span><span><i />Referência sintética</span></div>
          </article>

          <article className="health-card card">
            <div className="card-head"><div><span>Saúde da operação</span><small>Distribuição do fluxo</small></div><button aria-label="Mais opções">•••</button></div>
            <div className="donut" aria-label="96 por cento dentro do prazo"><div><strong>96%</strong><small>No prazo</small></div></div>
            <div className="health-list">
              <div><span><i className="dot green-dot" />No prazo</span><b>84</b></div>
              <div><span><i className="dot amber-dot" />Atenção</span><b>9</b></div>
              <div><span><i className="dot gray-dot" />Pendente</span><b>3</b></div>
            </div>
          </article>
        </section>

        <section className="table-card card">
          <div className="card-head"><div><span>Fila de trabalho</span><small>Empresas e rotinas demonstrativas</small></div><button onClick={() => setActiveView("Operações")}>Ver todas →</button></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Empresa fictícia</th><th>Identificador</th><th>Rotina</th><th>Status</th><th>Progresso</th></tr></thead>
              <tbody>
                {companies.map((company, index) => (
                  <tr key={company.code}>
                    <td><span className={`company-avatar avatar-${index + 1}`}>{company.name[0]}</span><strong>{company.name}</strong></td>
                    <td><code>{company.code}</code></td>
                    <td>{company.task}</td>
                    <td><span className={`status ${company.tone}`}>{company.status}</span></td>
                    <td><div className="progress"><span style={{ width: `${[100, 68, 42, 100][index]}%` }} /></div><small>{[100, 68, 42, 100][index]}%</small></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer>
          <p>NexaFlow é uma interface fictícia criada exclusivamente para portfólio.</p>
          <span>Sem conexão com dados, APIs ou infraestrutura reais.</span>
        </footer>
        {notice && <div className="toast" role="status"><b>Resumo fictício preparado</b><span>Nenhum arquivo ou dado real foi gerado.</span></div>}
      </main>
    </div>
  );
}
