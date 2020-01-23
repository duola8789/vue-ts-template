<template>
    <div class="container">
        <div class="content">
            <el-alert type="error" title="您没有此页面的权限" center :closable="false" effect="dark" />
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Forbidden extends Vue {}
</script>

<style scoped lang="less">
.container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
        width: 200px;
        margin: 0 auto;
    }
}
</style>
