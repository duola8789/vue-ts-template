<template>
    <div class="robo-map-viewport-btn">
        <el-tooltip effect="dark" content="固定视野" placement="top" :open-delay="1000">
            <div class="btn static" :class="mode === 'static' ? 'active' : ''" @click="setViewportMode('static')">
                <i class="icon"></i>
            </div>
        </el-tooltip>
        <div class="sep"></div>
        <el-tooltip effect="dark" content="动态视野" placement="top" :open-delay="1000">
            <div class="btn dynamic" :class="mode === 'dynamic' ? 'active' : ''" @click="setViewportMode('dynamic')">
                <i class="icon"></i>
            </div>
        </el-tooltip>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator';
import {CURRENT_PROJECT_INFO} from '@/config';

@Component
export default class RoboViewportBtn extends Vue {
    @Prop({required: true}) map!: TypeRMap | null;
    @Prop({type: Number}) zoom!: number;
    @Prop({type: Object}) center!: TypeRPoint;
    @Prop({type: String, required: true}) mode!: 'dynamic' | 'static';

    get mapInstance() {
        return this.map;
    }

    @Emit('update:mode')
    setViewportMode(mode: 'dynamic' | 'static') {
        if (mode === 'static') {
            this.locateHandler();
        }
        return mode;
    }

    async locateHandler() {
        const zoom = this.zoom ? this.zoom : CURRENT_PROJECT_INFO.mapZoom;
        const center = this.center ? this.center : CURRENT_PROJECT_INFO.mapCenter;
        if (this.mapInstance) {
            this.mapInstance.setZoom(zoom);
            this.mapInstance.panTo(center, {noAnimation: false});
        }
    }
}
</script>

<style scoped lang="scss">
.robo-map-viewport-btn {
    display: flex;
    border-radius: px2vw(26px);
    overflow: hidden;
    margin-left: px2vw(10px);

    @include nice-btn();

    .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: px2vw(32px);
        min-width: min-w(32px);
        height: px2vw(32px);
        min-height: min-w(32px);
        font-size: px2vw(20px);
        color: #dce2ea;
        background: linear-gradient(179deg, #5f6777 0%, #484f5d 100%);
        transition: background linear 0.3s;

        .icon {
            display: block;
            width: 50%;
            height: 50%;
        }

        &.static {
            .icon {
                background: url('./icons/static.png') no-repeat left center;
                background-size: auto 100%;
            }
        }

        &.dynamic {
            .icon {
                background: url('./icons/dynamic.png') no-repeat left center;
                background-size: auto 100%;
            }
        }

        &:hover {
            .icon {
                background-position: center center;
            }
        }

        &.active,
        &:active {
            background: #ff8400;

            .icon {
                background-position: right center;
            }
        }
    }

    .sep {
        width: 1px;
        height: 100%;
        background: #1d2127;
    }
}
</style>
