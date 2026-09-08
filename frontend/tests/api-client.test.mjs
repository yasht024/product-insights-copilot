import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import ts from 'typescript';

async function productionClient(env = {}) {
  const source = await readFile(new URL('../src/api/client.ts', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText.replaceAll('import.meta.env', JSON.stringify({ PROD: true, ...env }));
  return (await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)).apiClient;
}

test('public production reads and writes use the real same-origin API without an override', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('{"from":"backend"}', {
    headers: { 'Content-Type': 'application/json' },
  }));
  const previousWindow = globalThis.window;
  globalThis.window = { location: { hostname: 'product-insights-copilot-one.vercel.app' } };
  t.after(() => { globalThis.window = previousWindow; });
  const client = await productionClient();
  const params = new URLSearchParams({ days: '30' });
  const results = await Promise.all([
    client.getWorkspaces(), client.getReviews('ws_1', params),
    client.getReviewSummary('ws_1', params),
    client.getDashboardMetrics('ws_1', { platform: 'All Platforms', advocateMin: 5, criticMax: 3, days: 30, minWords: 0 }),
    client.getAnalytics('ws_1', 30, 'weekly', 'All Platforms'),
    client.getWordCloud('ws_1', 30, 'All Platforms', 'all', 5),
    client.bulkAction('ws_1', ['real-id'], 'mark_status', 'Reviewed'),
    client.generateDraft('ws_1', 'real-id'), client.syncFeeds('ws_1', 30, 200),
    client.getSyncStatus('ws_1'),
  ]);
  assert.equal(fetch.mock.calls.length, 10);
  for (const result of results) assert.deepEqual(result, { from: 'backend' });
  for (const call of fetch.mock.calls) assert.match(call.arguments[0], /^\/api\//);
  assert.equal(fetch.mock.calls.filter((call) => call.arguments[1].method === 'POST').length, 3);
  assert.match(await client.getExportUrl('ws_1', params), /^\/api\/workspaces\/ws_1\/reviews\/export\?/);
});

test('an explicitly configured hosted API is used', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('{}', {
    headers: { 'Content-Type': 'application/json' },
  }));
  const client = await productionClient({ VITE_API_BASE_URL: 'https://reviews.example.com/api/' });
  await client.getWorkspaces();
  assert.equal(fetch.mock.calls[0].arguments[0], 'https://reviews.example.com/api/workspaces');
});

test('report delivery includes recipients, owner header and full message in the server request', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('{}', {
    headers: { 'Content-Type': 'application/json' },
  }));
  const previousWindow = globalThis.window;
  globalThis.window = { sessionStorage: { getItem: () => 'test-owner-key' } };
  t.after(() => { globalThis.window = previousWindow; });
  const client = await productionClient();
  await client.generateReport('ws_1', 70, 'All Platforms');
  await client.getReportCapabilities('ws_1');
  await client.deliverReport('ws_1', 'report-id', 'send', ['a@example.com', 'b@example.com'], undefined, 'Hi team');
  const call = fetch.mock.calls[2].arguments;
  assert.equal(call[0], '/api/workspaces/ws_1/reports/report-id/deliver');
  assert.equal(call[1].headers.get('X-Owner-Key'), 'test-owner-key');
  assert.deepEqual(JSON.parse(call[1].body), {
    action: 'send', recipients: ['a@example.com', 'b@example.com'], document_id: null, message: 'Hi team',
  });
});

test('a broken route or offline backend surfaces an error instead of fabricating reviews', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('<html>SPA</html>', {
    headers: { 'Content-Type': 'text/html' },
  }));
  const client = await productionClient();
  await assert.rejects(client.getReviews('ws_1', new URLSearchParams()), /API is not configured/);
  fetch.mock.mockImplementation(async () => { throw new TypeError('Failed to fetch'); });
  await assert.rejects(client.getWordCloud('ws_1', 30, 'All Platforms', 'all', 5), /Cannot connect/);
});

test('owner access is sent only from session storage and never bundled into the client', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('{"role":"owner","permissions":{"scrape":true,"manage_reviews":true,"premium_tools":true},"team_access":"owner_only"}', {
    headers: { 'Content-Type': 'application/json' },
  }));
  const previousWindow = globalThis.window;
  globalThis.window = {
    location: { hostname: 'product-insights-copilot-one.vercel.app' },
    sessionStorage: { getItem: () => 'private-owner-key', setItem() {}, removeItem() {} },
  };
  t.after(() => { globalThis.window = previousWindow; });
  const client = await productionClient();
  const status = await client.getAccessStatus();
  assert.equal(status.role, 'owner');
  assert.equal(fetch.mock.calls[0].arguments[1].headers.get('X-Owner-Key'), 'private-owner-key');
  const source = await readFile(new URL('../src/api/client.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /private-owner-key/);
});
