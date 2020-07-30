<!-- 展示当前时间 -->
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: inherit;
    line-height: inherit;
    font-size: inherit;
    color: #9fbcff;
    text-align: left;

    .robo-time-top {
        font-size: 0.12rem;
        line-height: 1;
        margin-bottom: 4px;
    }

    .robo-time-bottom {
        font-size: 0.14rem;
        line-height: 1;
    }
}
</style>
