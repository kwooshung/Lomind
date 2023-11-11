import dts from 'vite-plugin-dts';

/**
 * 服务器配置
 * @param { number } [port = 3000] 端口号
 * @returns { object } 配置
 */
const configServer = (port: number = 3000): object => ({
  port,
  host: '0.0.0.0'
});

/**
 * css 配置
 */
const configCss = {
  modules: {
    generateScopedName: '[local]'
  }
};

/**
 * 测试配置
 */
const configTest = {
  globals: true,
  setupFiles: '../../configs/vitest-setup.ts',
  environment: 'jsdom',
  exclude: ['src/__visual_tests__', '**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**']
};

/**
 * TS 类型构建配置
 */
const configDts = dts({
  rollupTypes: true,
  insertTypesEntry: true,
  copyDtsFiles: true
});

/**
 * 构建配置
 * @param { string } name 变量名，一个有效的 JavaScript 标识符，因为它将被用作变量名，主要用于 UMD 构建
 * @param { string } filename 文件名
 * @param { [string] } formats 构建格式
 * @param { [string] } external 外部依赖
 * @param { [object] } globals 全局变量名称
 * @returns { object } 配置
 */
const configBuild = (name: string, filename: string, formats: string[], external: string[] = [], globals: object = {}): object => ({
  minify: 'terser',
  lib: {
    entry: 'src/index.ts',
    name,
    formats,
    fileName: (format: string) => `${filename}.${format}.js`
  },
  rollupOptions: {
    external,
    output: {
      globals,
      assetFileNames: (assetInfo) => {
        if (assetInfo.name === 'style.css') {
          return `${filename}.css`;
        }
        return assetInfo.name;
      }
    }
  }
});

export { configServer, configCss, configTest, configDts, configBuild };
