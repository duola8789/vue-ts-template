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

<style lang="scss">
html,
body {
    padding: 0;
    margin: 0;
    height: 100%;
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
    background: #fff;
}

input::-webkit-credentials-auto-fill-button {
    display: none !important;
    visibility: hidden;
    pointer-events: none;
    position: absolute;
    right: 0;
}

input:focus::-webkit-contacts-auto-fill-button {
    opacity: 0;
}

// 滚动条样式
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    width: 6px;
    height: 6px;
    background: transparent;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #484b56;
}
</style>
