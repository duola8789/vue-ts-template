/**
 * echarts 相关的一些逻辑
 */
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {debounceHelper} from '@/utils';

@Component
export default class EchartMixin extends Vue {
    chart: any = {};
    resizeDebounceFn: any = {};
    // 图表节点位置
    pointPositions: number[][] = [];

    rem = 100;

    getRemSize(size: number) {
        return Math.floor(size * this.rem);
    }

    mounted() {
        this.$nextTick(() => {
            this.rem = parseInt(getComputedStyle(document.documentElement).fontSize as string, 10);
            this.resizeDebounceFn = debounceHelper(() => {
                if (this.chart) {
                    typeof this.chart.resize === 'function' && this.chart.resize();
                    if (typeof this.chart.roboGetPointPositions === 'function') {
                        this.pointPositions = this.chart.roboGetPointPositions(0);
                    }
                    this.rem = parseInt(getComputedStyle(document.documentElement).fontSize as string, 10);
                }
            });
            window.addEventListener('resize', this.resizeDebounceFn);
        });
    }

    beforeDestroy() {
        window.removeEventListener('resize', this.resizeDebounceFn);
    }
}
