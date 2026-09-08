import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const frontend = fileURLToPath(new URL('..', import.meta.url));
const root = path.dirname(frontend);
const python = process.env.PYTHON_EXECUTABLE || path.join(root, '.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
const target = process.env.API_PROXY_TARGET || 'http://127.0.0.1:8000';
const children = [];
let stopping = false;

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill();
  process.exitCode = code;
}
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => stop());

function launch(command, args, cwd, env = process.env) {
  const child = spawn(command, args, { cwd, env, stdio: 'inherit', windowsHide: true });
  children.push(child);
  child.on('error', (error) => { console.error(error.message); stop(1); });
  child.on('exit', (code) => { if (!stopping) stop(code || 0); });
  return child;
}

async function ready() {
  try {
    const response = await fetch(`${target}/api/health`, { signal: AbortSignal.timeout(1500) });
    return response.ok && (await response.json()).service === 'product-insights-dashboard';
  } catch { return false; }
}

if (!await ready()) {
  if (process.env.API_PROXY_TARGET) {
    console.error(`The configured API at ${target} is unavailable.`);
    stop(1);
  } else if (!existsSync(python)) {
    console.error('Python environment missing. Create the project .venv and install its dependencies first.');
    stop(1);
  } else {
    console.log('Starting the review API…');
    launch(python, ['-m', 'uvicorn', 'product_insights.api.main:app', '--host', '127.0.0.1', '--port', '8000'], root, {
      ...process.env,
      PYTHONPATH: [path.join(root, 'src'), process.env.PYTHONPATH].filter(Boolean).join(path.delimiter),
    });
    const deadline = Date.now() + 30_000;
    while (!stopping && Date.now() < deadline && !await ready()) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    if (!stopping && !await ready()) {
      console.error('The review API did not become ready. Check the database and the API error above.');
      stop(1);
    }
  }
}
if (!stopping) {
  console.log('Review API ready. Starting the dashboard…');
  launch(process.execPath, [path.join(frontend, 'node_modules/vite/bin/vite.js'), ...process.argv.slice(2)], frontend);
}
