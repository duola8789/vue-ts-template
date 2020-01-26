<template>
    <div id="app" class="container">
        <el-header class="head" height="60px">
            <el-button
                v-if="isAuthorized"
                :icon="collapseButtonIcon"
                class="collapse-button"
                circle
                @click="collapseMenu"
            />
            <h1 class="title">{{ username }} -- {{ userId }} -- {{ userRole }}</h1>
            <el-button icon="el-icon-user" class="logout-button" circle @click="logoutHandler" />
        </el-header>
        <el-container>
            <el-aside v-if="isAuthorized" class="aside" width="auto">
                <Menu :is-collapse="isCollapse" :class="menuClass" class="menu" />
            </el-aside>
            <el-main class="main">
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {State, Getter, Action} from 'vuex-class';
import Menu from '@/views/common/menu/index.vue';
import {ROOT_GET_USER_ROLE_ACTION, ROOT_LOGOUT_ACTION} from '@/store/root-store/store-types';
import {CommonUrls} from '@/router/types';

@Component({components: {Menu}})
export default class App extends Vue {
    isCollapse: boolean = false;

    get menuClass(): string {
        return this.isCollapse ? 'collapsed-menu' : 'expanded-menu';
    }
    get collapseButtonIcon(): string {
        return this.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold';
    }

    @State userRole!: string;

    @Getter isAuthorized!: boolean;
    @Getter username!: string;
    @Getter userId!: string;

    @Action(ROOT_LOGOUT_ACTION) logout!: () => Promise<boolean>;
    @Action(ROOT_GET_USER_ROLE_ACTION) getUserRole!: (userId: string) => Promise<string>;

    @Watch('$route.path')
    onRoutePathChanged(newPath: string) {
        this.checkUserRole(newPath);
    }

    collapseMenu() {
        this.isCollapse = !this.isCollapse;
    }

    async logoutHandler() {
        const isLogoutSuccess = await this.logout();
        if (isLogoutSuccess) {
            this.$message({
                type: 'success',
                message: '已退出',
                duration: 1000,
                onClose: () => {
                    this.$router.push(CommonUrls.Login).catch(() => {});
                }
            });
        }
    }

    checkUserRole(currentPath: string): void {
        if (!this.isAuthorized) {
            this.$router.replace(CommonUrls.Forbidden).catch(() => {});
        }
        if (currentPath.toLowerCase() === CommonUrls.Root) {
            this.$router.replace(CommonUrls.Default).catch(() => {});
        }
    }

    async created() {
        await this.getUserRole(this.userId);
        await this.checkUserRole(this.$route.path);
    }
}
</script>

<style scoped lang="less">
.container {
    display: flex;
    flex-direction: column;

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

        .logout-button {
            position: absolute;
            right: 20px;
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
