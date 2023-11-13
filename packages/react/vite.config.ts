import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { configServer, configCss, configDts, configBuild } from '../../configs/vite';

export default defineConfig({
  base: './',
  server: configServer(),
  css: configCss,
  plugins: [react(), configDts],
  build: configBuild('Lomind', 'lomind', ['cjs', 'es'], ['react', 'react-dom', '@kwooshung/lomind'], { react: 'React', 'react-dom': 'ReactDOM', lomind: 'Lomind' })
});
