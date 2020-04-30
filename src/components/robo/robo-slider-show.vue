<!-- 用户展示百分比的滑块 -->
<template>
    <div class="robo-slider">
        <div class="slider-layer" :style="sliderLayerStyle"></div>
        <div class="slider-block" :style="sliderBlockStyle"></div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import {formatTimeHelper} from '@/utils';

const ratioValidator = (ratio: any): boolean => {
    if (typeof ratio !== 'number') {
        return false;
    }
    if (ratio === -1) {
        return true;
    }
    return ratio <= 1 && ratio >= 0;
};

@Component
export default class RoboSliderShow extends Vue {
    @Prop({default: false, type: Boolean}) disabled!: boolean;
    @Prop({required: true, type: Number, validator: ratioValidator}) ratio!: number;

    get sliderLayerStyle() {
        const disabledColor = '#2A354A';
        return {
            background: this.disabled
                ? disabledColor
                : `linear-gradient(90deg, #5BEEFF 0%, #2C85C3 ${this.sliderBlockLeftDistance}, #1A3671 ${this.sliderBlockLeftDistance})`
        };
    }

    get sliderBlockStyle() {
        const activeColor = this.sliderBlockLeftDistance === '0%' ? '#668AD7' : '#59EAFC';
        const disabledColor = '#697388';
        return {
            background: this.disabled ? disabledColor : activeColor,
            left: this.sliderBlockLeftDistance
        };
    }

    get sliderBlockLeftDistance() {
        if (this.disabled) {
            return '0%';
        }
        // ratio ∈ [0, 1]
        const ratio = Math.min(Math.max(this.ratio, 0), 1);
        return `${ratio * 100}%`;
    }

    @Watch('time')
    onTimePropChange(newVal: number, oldVal: number) {
        if (newVal === oldVal) {
            return;
        }
        this.clearTimeInterval();
        this.innerTime = newVal;
        this.changeTimeInterval();
    }

    intervalTimer = 0;

    innerTime = Date.now();

    get dateString() {
        return formatTimeHelper(this.innerTime, 'yyyy/MM/dd');
    }

    get timeString() {
        return formatTimeHelper(this.innerTime, 'HH:mm:ss');
    }

    clearTimeInterval() {
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer);
            this.intervalTimer = 0;
        }
    }

    changeTimeInterval() {
        this.clearTimeInterval();
        this.intervalTimer = setInterval(() => {
            this.innerTime += 1000;
        }, 1000);
    }

    mounted() {
        this.changeTimeInterval();
    }

    beforeDestroy() {
        this.clearTimeInterval();
    }
}
</script>

<style scoped lang="less">
.robo-slider {
    width: 100%;
    position: relative;
    height: 12px;

    .slider-layer {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        height: 8px;
        border-radius: 4px;
    }

    .slider-block {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
        width: 2px;
        height: 100%;
        transition: left linear 0.2s;
    }
}
</style>
