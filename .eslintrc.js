// ESLint 中文文档：http://eslint.cn/docs/rules/
// eslint-plugin-vue: https://eslint.vuejs.org/
// 百度 EFE 团队使用的 eslint 配置：https://github.com/ecomfe/eslint-config/blob/master/index.js
// JavaScript 编码规范(百度): http://gitlab.baidu.com/fe/spec/blob/master/javascript.md#2-1
// Vue 组件代码规范(百度): http://gitlab.baidu.com/fe/spec/blob/master/vue.md#2-1
// iCode校验规则说明：http://bugbye.baidu.com/rules
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/recommended",
    "@vue/prettier",
    "@vue/typescript",
    "plugin:prettier/recommended",
  ],
  rules: {
    'vue/component-name-in-template-casing': ['error',  'kebab-case'],
    // 要求使用骆驼拼写法 https://cn.eslint.org/docs/rules/camelcase
    'camelcase': ['error'],
    'no-console': [process.env.NODE_ENV === 'development' ? 'warn' : 'error', { 'allow': ['error', 'group', 'groupEnd'] }],
    'no-debugger': process.env.NODE_ENV === 'development' ? 'warn' : 'error',
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
