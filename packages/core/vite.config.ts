import { defineConfig } from 'vite';
import { configServer, configDts, configBuild } from '../../configs/vite';

export default defineConfig({
  base: './',
  server: configServer(),
  plugins: [configDts],
  build: configBuild('Lomind', 'lomind', ['cjs', 'es', 'umd'])
});
