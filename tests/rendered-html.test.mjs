import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("o build estático contém somente a demonstração fictícia", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /NexaFlow/);
  assert.match(html, /Dados 100% sintéticos/);
  assert.match(html, /Aurora Comércio Demo/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("todas as categorias possuem conteúdo próprio e estado navegável", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const category of ["Visão geral", "Operações", "Documentos", "Automação", "Empresas", "Relatórios"]) {
    assert.match(source, new RegExp(`"${category}"`));
  }
  for (const uniqueMetric of ["ROTINAS EM EXECUÇÃO", "DOCUMENTOS NO PERÍODO", "AUTOMAÇÕES ATIVAS", "EMPRESAS DEMO", "RELATÓRIOS GERADOS"]) {
    assert.match(source, new RegExp(uniqueMetric));
  }
  assert.match(source, /aria-pressed=\{activeView === name\}/);
});
