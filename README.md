# Vue + TypeScript Project

项目初始化后，需要自行配置：

- `index.html` 中对应的文档标题
- `.yarnrc` 中 Yarn 的仓库地址
- `bin` 目录中对应的部署脚本
- `vue.config.js` 中对应的端口号
- 此 README.md 文档

## 项目介绍

Vue + TypeScript 项目模板，源自使用[Vue-Cli@4](https://cli.vuejs.org/zh/)创建的使用了TypeScript语言的Vue项目。

预置了下列功能：

1. 基本的TypeScript编译和解析支持（Vue-Cli@4 + [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)）
2. Vue-Router、路由懒加载（Vue-Cli@4）
3. Vuex（Vue-Cli@4 + [vuex-class](https://github.com/ktsn/vuex-class/) ）
4. 严格的代码检查工具（[ESLint](https://cn.eslint.org/) + [Prettier](https://prettier.io/) + [Stylelint](https://stylelint.io/)
5. `commit`之前的代码检查（Vue-Cli@4 + [lint-staged](https://github.com/okonet/lint-staged))
6. Less，并且自动导入全局样式变量（Vue-Cli@4 + [style-resources-loader](https://github.com/yenshih/style-resources-loader)）
7. 针对Axios的封装（导出`get`等方法，全局Loading、网络错误自动提示并在`Vue.config.errorHandler`中捕获）
8. 预置三个环境变量和对应的编译脚本（`development`/`production`/`staging`）
9. 按需引入ElementUI（[ElementUI插件](https://github.com/ElementUI/vue-cli-plugin-element)）
10. 封装好的导航组件（[el-menu](https://element.eleme.cn/#/zh-CN/component/menu)）
11. 百度地图的引入以及辅助方法（如果不需引入的话需要手动删除来压缩代码）
12. Websocket的辅助方法
13. 单元测试（Vue-Cli@4 + Jest）
14. `/src/utils`中其他一些预置的辅助方法（[date-fns](https://date-fns.org/) + [js-cookie](https://github.com/js-cookie/js-cookie)）
15. 针对百度内部的持续集成脚本

## 代码提交

使用根目录下的 `git_push_nolint.sh` 脚本进行提交

```BASH
git_push_nolint.sh feature-v1
```

## 技术栈

主要技术栈：

- Vue
- TypeScript
- Vue-Router
- Vuex
- ElementUI

## 脚本

```
# 安装依赖
yarn install

# 开发 8000 端口
yarn serve

# 编译（生产环境）
yarn build

# 编译（开发环境）
yarn build-dev

# 编译（测试环境）
yarn build-staging

# 本地 7000 端口预览编译后文件
preview

# 格式化 src 目录下文件
yarn prettier
```
