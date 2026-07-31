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
