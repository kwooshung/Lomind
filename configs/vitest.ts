/**
 * 测试配置
 */
const configTest = {
  globals: true,
  setupFiles: './configs/vitest-setup.ts',
  environment: 'jsdom',
  exclude: ['src/__visual_tests__', '**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**']
};

export default configTest;
