import { defineConfig } from 'vitest/config';
import { configBuild, configDts, configServer, configTest } from '../../configs/vite';

export default defineConfig({
  base: './',
  server: configServer(),
  test: configTest,
  plugins: [configDts],
  build: configBuild('Lomind', 'lomind', ['cjs', 'es', 'umd'])
});
