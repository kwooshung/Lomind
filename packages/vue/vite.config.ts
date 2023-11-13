import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configServer, configCss, configDts, configBuild } from '../../configs/vite';

export default defineConfig({
  base: './',
  server: configServer(),
  css: configCss,
  plugins: [vue(), vueJsx(), configDts],
  build: configBuild('Lomind', 'lomind', ['cjs', 'es'], ['vue', '@kwooshung/lomind'], { vue: 'Vue', lomind: 'Lomind' })
});
