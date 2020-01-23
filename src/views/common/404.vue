<template>
    <div class="container">
        <img :src="notFoundImg" alt="404" class="not-found-img" />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import notFoundImg from '@/assets/images/404.png';

@Component
export default class NotFound extends Vue {
    notFoundImg: string = notFoundImg;
}
</script>

<style scoped lang="less">
.container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .not-found-img {
        max-width: 600px;
    }
}
</style>
