import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("o build estático identifica claramente a demonstração fictícia", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /NexaFlow/);
  assert.match(html, /Dados 100% sintéticos/);
  assert.match(html, /Aurora Comércio Demo/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("os módulos disponíveis possuem experiências próprias", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const moduleName of ["Visão geral", "Central de Operações", "Cofre", "Calendário", "Empresas", "Tecnologias"]) {
    assert.match(source, new RegExp(`"${moduleName}"`));
  }
  for (const componentName of ["Operations", "Vault", "CalendarDemo", "Companies", "Technologies"]) {
    assert.match(source, new RegExp(`function ${componentName}`));
  }
  assert.match(source, /role="tab"/);
  assert.match(source, /aria-selected=/);
  assert.match(source, /Aguardando cliente/);
  assert.match(source, /Baixar filtrados/);
  assert.match(source, /Visualização do calendário/);
});

test("a demo não contém identificadores internos conhecidos", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const forbidden of ["exatta.com.br", "office_id", "support_requests", "client_company_id", "ODBC Driver", "192.168."]) {
    assert.doesNotMatch(source, new RegExp(forbidden, "i"));
  }
});
