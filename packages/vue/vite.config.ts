import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configBuild, configCss, configDts, configServer, configTest } from '../../configs/vite';

export default defineConfig({
  base: './',
  server: configServer(),
  css: configCss,
  test: configTest,
  plugins: [vue(), vueJsx(), configDts],
  build: configBuild('Lomind', 'lomind', ['cjs', 'es'], ['vue', '@kwooshung/lomind'], { vue: 'Vue', lomind: 'Lomind' })
});
