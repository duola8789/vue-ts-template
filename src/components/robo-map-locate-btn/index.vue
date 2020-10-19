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

<style scoped lang="scss">
.robo-map-locate-btn {
    width: px2vw(40px);
    height: px2vw(40px);
    background: url('./icons/bd-map/icon-map-locate.png') no-repeat center center;
    background-size: cover;
    cursor: pointer;
    user-select: none;
    transition: all linear 0.3s;
}
</style>
