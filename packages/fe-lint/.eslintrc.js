module.exports = {
  extends: ['eslint-config-encode/typescript/node', 'prettier'],
  parserOptions: {
    project: './tsconfig.json', // 指定 tsconfig.json 的路径
    tsconfigRootDir: __dirname, // 确保路径是相对于当前 ESLint 配置文件
  },
  rules: {
    '@typescript-eslint/no-require-imports': 0,
    'no-console': 0,
  },
};
