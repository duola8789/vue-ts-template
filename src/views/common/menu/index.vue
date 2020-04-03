<template>
    <el-menu
        class="common-menu"
        :router="true"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="$route.path"
        :unique-opened="true"
    >
        <template v-for="menu in menus">
            <!-- 有子菜单 -->
            <template v-if="menu.children && menu.children.length > 0">
                <el-submenu :key="menu.path" :index="menu.path">
                    <template slot="title">
                        <i :class="menu.icon || defaultIcon" />
                        <span slot="title">{{ menu.title }}</span>
                    </template>
                    <el-menu-item
                        v-for="item in menu.children"
                        :key="getItemPath(menu.path, item.path)"
                        :index="getItemPath(menu.path, item.path)"
                    >
                        <i v-if="item.icon" :class="item.icon" />
                        <span>{{ item.title }}</span>
                    </el-menu-item>
                </el-submenu>
            </template>
            <!-- 没有子菜单 -->
            <template v-else>
                <el-menu-item :key="menu.path" :index="menu.path">
                    <i :class="menu.icon || defaultIcon" />
                    <span slot="title">{{ menu.title }}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import menuConfig from './config';
import {MenuConfig} from '@/views/common/menu/types';

const DEFAULT_ICON: string = 'el-icon-setting';

@Component
export default class Menu extends Vue {
    @Prop({type: Boolean, default: false, required: true}) readonly isCollapse!: boolean;

    menus: MenuConfig[] = menuConfig;
    defaultIcon: string = DEFAULT_ICON;

    getItemPath(parentPath: string, childPath: string) {
        return `${parentPath}${childPath}`;
    }
}
</script>
