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

    mounted() {
        this.$nextTick(() => {
            this.resizeDebounceFn = debounceHelper(() => {
                if (this.chart) {
                    typeof this.chart.resize === 'function' && this.chart.resize();
                    if (typeof this.chart.roboGetPointPositions === 'function') {
                        this.pointPositions = this.chart.roboGetPointPositions(0);
                    }
                }
            });
            window.addEventListener('resize', this.resizeDebounceFn);
        });
    }

    beforeDestroy() {
        window.removeEventListener('resize', this.resizeDebounceFn);
    }
}
