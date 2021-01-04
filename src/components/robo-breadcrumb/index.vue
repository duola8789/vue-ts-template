<!-- 面包屑组件，使用的前提有两个，1 路由中在 meta 中添加 title 属性，2 以合适的父子关系组织路由 -->
<template>
    <div v-if="!hide" class="robo-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
                v-for="(item, index) in routeList"
                :key="index"
                :class="!item.path ? 'current-path' : ''"
                :to="item.path ? {path: item.path, query: item.query} : null"
            >
                {{ item.title }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';

@Component
export default class RoboBreadcrumb extends Vue {
    parentList: {path: string; title: string; query?: any}[] = [];

    get hide() {
        return this.$route.meta && this.$route.meta.hideBreadCrumb;
    }

    get routeList() {
        const {meta} = this.$route;
        return this.parentList.concat({
            path: '',
            title: meta.title
        });
    }

    @Watch('$route.path', {immediate: true})
    onRouteChange(newPath: string, oldPath: string) {
        if (newPath === oldPath) {
            return;
        }
        const {matched, meta = {}} = this.$route;
        const titleIndex = meta.titleIndex;

        this.parentList = matched
            .filter((v) => v.meta && v.meta.title && v.meta.title !== meta.title)
            .map((v) => {
                if (Array.isArray(v.meta.title)) {
                    return {
                        path: v.path,
                        title: v.meta.title[titleIndex] || v.meta.title[0],
                        query: titleIndex != undefined ? {index: titleIndex} : undefined
                    };
                }
                return {
                    path: v.path,
                    title: v.meta.title
                };
            });
    }
}
</script>
<style scoped lang="scss">
.robo-breadcrumb {
    height: 50px;
    line-height: 50px;
    padding-left: 16px;
    background: #fff;
    border-bottom: 1px solid #eee;
    overflow-y: hidden;

    .el-breadcrumb {
        font-size: 14px;
        line-height: inherit;
        transition: all linear 0.1s;

        ::v-deep.el-breadcrumb__item {
            color: #666;

            &:not(.current-path):hover {
                color: #409eff;
            }

            .el-breadcrumb__inner {
                color: inherit;
                font-weight: inherit;
                vertical-align: middle;
            }

            .el-breadcrumb__separator {
                color: #8a8a8a;
                margin: 0 16px;
                font-weight: 600;
                font-size: 16px;
                vertical-align: middle;
            }
        }
    }
}
</style>
