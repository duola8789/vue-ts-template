<template>
    <div class="robo-map-locate-btn" @click="locateHandler"></div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class RoboMapLocateBtn extends Vue {
    @Prop({type: Object, required: true}) map!: BMap.Map;
    @Prop({type: Number, required: true}) zoom!: number;
    @Prop({type: Object, required: true}) centerPoint!: BMap.Point;

    get mapInstance() {
        return this.map;
    }

    async locateHandler() {
        if (this.mapInstance) this.mapInstance.closeInfoWindow();

        if (this.mapInstance && typeof this.mapInstance.panTo === 'function') {
            this.mapInstance.closeInfoWindow();
            this.mapInstance.setZoom(this.zoom);
            this.mapInstance.panTo(this.centerPoint, {noAnimation: false});
        }
    }
}
</script>

<style scoped lang="less">
.robo-map-locate-btn {
    width: 0.4rem;
    height: 0.4rem;
    background: url('~@/assets/icons/bd-map/icon-map-locate.png') no-repeat center center;
    background-size: cover;
    cursor: pointer;
    .linear-transition();
}
</style>
