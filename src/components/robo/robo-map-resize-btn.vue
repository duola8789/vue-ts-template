<template>
    <div class="robo-map-resize-btn">
        <div class="zoom-btn zoom-in-btn" @click="zoomHandler(true)">+</div>
        <div class="zoom-btn zoom-out-btn" @click="zoomHandler(false)">—</div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class RoboMapResizeBtn extends Vue {
    @Prop({required: true}) map!: BMap.Map;

    get mapInstance() {
        return this.map;
    }

    zoomHandler(isZoomIn: boolean) {
        if (this.mapInstance && typeof this.mapInstance.zoomIn === 'function') {
            if (isZoomIn) {
                this.mapInstance.zoomIn();
            } else {
                this.mapInstance.zoomOut();
            }
        }
    }
}
</script>

<style scoped lang="less">
.robo-map-resize-btn {
    width: 0.4rem;
    height: 0.8rem;
    cursor: pointer;

    .zoom-btn {
        height: 0.4rem;
        line-height: 0.35rem;
        text-align: center;
        font-size: 0.26rem;
        color: #8aadff;
        background: #213c75;
        .linear-transition(0.1s);

        &:hover {
            color: #fff;
            background: #325199;
        }

        &:active {
            color: #fff;
            background: #295cb4;
        }

        &.zoom-in-btn {
            border-bottom: 1px solid #375599;
            border-radius: 0.2rem 0.2rem 0 0;
        }

        &.zoom-out-btn {
            font-size: 0.18rem;
            border-radius: 0 0 0.2rem 0.2rem;
        }
    }
}
</style>
