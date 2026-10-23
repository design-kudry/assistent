import { defineConfig } from 'vite';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  root: resolve(here, '..'),
  cacheDir: resolve(here, 'node_modules/.vite'),
  resolve: { alias: {
    '@consta/uikit': dirname(require.resolve('@consta/uikit/package.json')),
    '@gravity-ui/icons': dirname(require.resolve('@gravity-ui/icons/Plus')),
    '@consta/icons': dirname(require.resolve('@consta/icons/package.json')),
    react: dirname(require.resolve('react/package.json')),
    'react-dom': dirname(require.resolve('react-dom/package.json')),
  } },
  server: { host: '127.0.0.1', port: 4173, strictPort: true },
  build: { outDir: resolve(here, 'dist'), rollupOptions: { input: resolve(here, 'index.html') } },
});
