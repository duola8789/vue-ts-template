<template>
    <div class="root-container">
        <el-header class="head" height="60px">
            <el-button :icon="collapseButtonIcon" class="collapse-button" circle @click="collapseMenu" />
            <h1 class="title">{{ userName }} -- {{ permission }}</h1>
            <el-dropdown class="user-control-dropdown" trigger="click" placement="bottom" @command="onCommand">
                <span class="el-dropdown-link">
                    {{ userName }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
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
import {Component, Vue} from 'vue-property-decorator';

import Menu from './components/menu/index.vue';

import {CommonUrls} from '@/utils';

import {State, Getter, Action} from 'vuex-class';
import {LOGOUT_ACTION} from '@/store/root-store/store-types';

@Component({components: {Menu}})
export default class Root extends Vue {
    @State userName!: string;
    @State permission!: string;

    @Getter isAuthorized!: boolean;

    @Action(LOGOUT_ACTION) logoutMutation!: () => Promise<boolean>;

    isCollapse: boolean = false;

    get menuClass(): string {
        return this.isCollapse ? 'collapsed-menu' : 'expanded-menu';
    }
    get collapseButtonIcon(): string {
        return this.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold';
    }

    collapseMenu() {
        this.isCollapse = !this.isCollapse;
    }
    onCommand(command: string) {
        if (command === 'logout') {
            this.$confirm('您确定要退出登录吗?', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.logoutMutation();
                    this.$router.push(CommonUrls.Login).catch(() => {});
                })
                .catch(() => {});
        }
    }
}
</script>

<style scoped lang="scss">
.root-container {
    display: flex;
    flex-direction: column;
    height: 100%;

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
            color: $mainTextColor;
        }

        .collapse-button {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 16px;
        }

        .logout-button {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 16px;
        }

        .user-control-dropdown {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 14px;
            color: #000;
            height: 20px;
            line-height: 20px;

            .el-dropdown-link {
                @include nice-btn();
            }
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
