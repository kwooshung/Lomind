import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { configBuild, configCss, configDts, configServer, configTest } from '../../configs/vite';

export default defineConfig({
  base: './',
  server: configServer(),
  css: configCss,
  test: configTest,
  plugins: [react(), configDts],
  build: configBuild('Lomind', 'lomind', ['cjs', 'es'], ['react', 'react-dom', '@kwooshung/lomind'], { react: 'React', 'react-dom': 'ReactDOM', lomind: 'Lomind' })
});
