<template>
  <div id="app" class="container">
    <el-header class="head" height="60px">
      <el-button :icon="collapseButtonIcon" class="collapse-button" circle @click="collapseMenu" />
      <h1 class="title">{{ title }}</h1>
      <el-link href="#/" :underline="false" icon="el-icon-s-home" class="go-home-button" />
    </el-header>
    <el-container>
      <el-aside class="aside" width="auto">
        <Menu :is-collapse="isCollapse" :class="menuClass" class="menu" />
      </el-aside>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/views/common/menu/index.vue';

@Component({ components: { Menu } })
export default class App extends Vue {
  isCollapse: boolean = false;

  title!: 'Vue TypeScript Project';

  get menuClass(): string {
    return this.isCollapse ? 'collapsed-menu' : 'expanded-menu';
  }

  get collapseButtonIcon(): string {
    return this.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold';
  }

  collapseMenu(): void {
    this.isCollapse = !this.isCollapse;
  }
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
}

#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 960px;
}
</style>

<style scoped lang="less">
.container {
  .head {
    position: relative;
    line-height: 60px;
    background: #d3d3d3;
    font-size: 0;
    text-align: center;

    .title {
      height: inherit;
      line-height: inherit;
      font-size: 20px;
      color: @mainColor;
    }

    .collapse-button {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
    }

    .go-home-button {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }
  }

  .aside {
    border-right: solid 1px #e6e6e6;

    .menu {
      text-align: left;
      border: none;

      &.collapsed-menu {
        width: auto;
      }

      &.expanded-menu {
        width: 250px;
      }
    }
  }
}
</style>
