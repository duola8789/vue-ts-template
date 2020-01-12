<template>
  <el-menu
    class="menu"
    :router="true"
    :collapse="isCollapse"
    :collapse-transition="false"
    :default-active="$route.path"
  >
    <el-submenu v-for="submenu in menus" :key="submenu.path" :index="submenu.path">
      <!-- submenu -->
      <template slot="title">
        <i :class="submenu.icon || defaultIcon" />
        <span slot="title">{{ submenu.title }}</span>
      </template>
      <!-- 有 group -->
      <template v-if="submenu.groups && submenu.groups.length > 0">
        <el-menu-item-group v-for="group in submenu.groups" :key="group.title">
          <!-- group -->
          <template slot="title">
            <i v-if="group.icon" :class="group.icon" />
            <span>{{ group.title }}</span>
          </template>
          <!-- item -->
          <template v-if="group.children && group.children.length > 0">
            <el-menu-item v-for="item in group.children" :key="item.path" :index="item.path">
              <i v-if="item.icon" :class="item.icon" />
              <span>{{ item.title }}</span>
            </el-menu-item>
          </template>
        </el-menu-item-group>
      </template>
      <!-- 无 group -->
      <template v-else-if="submenu.children && submenu.children.length > 0">
        <!-- item -->
        <el-menu-item v-for="item in submenu.children" :key="item.path" :index="item.path">
          <i v-if="item.icon" :class="item.icon" />
          <span>{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import menuConfig from './config';
import { MenuConfig } from '@/views/common/menu/types';

const DEFAULT_ICON: string = 'el-icon-setting';

@Component
export default class Menu extends Vue {
  @Prop({ type: Boolean, default: false, required: true }) readonly isCollapse!: boolean;

  menus: MenuConfig[] = menuConfig;
  defaultIcon: string = DEFAULT_ICON;
}
</script>

<style scoped lang="less">
@buttonWidth: 50px;

.container {
  position: relative;

  .folder-button {
    position: absolute;
    right: -@buttonWidth;
    top: 0;
    width: @buttonWidth;
    z-index: 10;
  }
}
</style>
