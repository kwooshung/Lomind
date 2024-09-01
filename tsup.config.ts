export default {
  clean: true,
  entry: ['src/index.ts'], // 入口文件
  format: ['cjs', 'esm'], // 生成的格式
  dts: {
    resolve: true
  }, // 生成类型定义文件
  minify: true, // 是否压缩
  sourcemap: false, // 是否生成 sourcemap
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.mjs' : '.cjs'
  })
};
