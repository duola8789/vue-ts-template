<template>
    <el-pagination
        class="robo-pagination"
        background
        :hide-on-single-page="false"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator';

@Component
export default class RoboPagination extends Vue {
    @Prop({default: 1, type: Number}) readonly currentPage!: number;
    @Prop({default: 10, type: Number}) readonly pageSize!: number;
    @Prop({default: 0, type: Number}) readonly total!: number;

    @Emit('size-change')
    handleSizeChange(size: number) {
        return size;
    }

    @Emit('current-change')
    handleCurrentChange(currentPage: number) {
        return currentPage;
    }
}
</script>
<style lang="less">
.robo-pagination.el-pagination.is-background {
    .btn-next,
    .btn-prev,
    .el-pager li {
        background-color: #fff;
    }
}
</style>
<style scoped lang="less">
.robo-pagination {
    margin-top: 15px;
    text-align: right;
}
</style>
