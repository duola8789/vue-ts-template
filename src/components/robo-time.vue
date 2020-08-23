<template>
    <div class="robo-time-container">
        <div class="robo-time">
            <p class="robo-time-top">{{ dateString }}</p>
            <p class="robo-time-bottom">{{ timeString }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import {formatTimeHelper} from '@/utils';

@Component
export default class RoboTime extends Vue {
    @Prop({required: true, type: Number}) time!: number;

    @Watch('time')
    onTimePropChange(newVal: number, oldVal: number) {
        if (newVal === oldVal) {
            return;
        }
        this.innerTime = newVal;
        this.timeDiff = newVal - Date.now();
        this.changeTimeInterval();
    }

    intervalTimer = 0;
    timeDiff = 0;
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
            this.innerTime = Date.now() + this.timeDiff;
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

<style scoped lang="scss">
.robo-time-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: inherit;
    line-height: inherit;
    font-size: inherit;
    color: #fff;
    cursor: default;
    font-family: inherit;

    .robo-time-top {
        font-family: inherit;
    }

    .robo-time-bottom {
        font-family: inherit;
    }
}
</style>
