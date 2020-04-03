<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style>
html,
body {
    padding: 0;
    margin: 0;
    height: 100%;
    font-size: 100px;
}

body {
    font-size: 14px;
}

#app {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial,
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    color: #333;
    height: 100%;
    min-width: 1280px;
    font-weight: normal;
}
</style>
