// 在此注册其他插件提供的钩子函数，用来在 Vue Class 组件中使用
// 例如 Vue Router 提供的钩子函数
// 必须在 router 之前引入
import { Component } from 'vue-property-decorator';

// Register the router hooks with their names
Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);
