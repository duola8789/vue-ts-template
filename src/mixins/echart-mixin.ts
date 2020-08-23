/**
 * echarts 相关的一些逻辑
 */
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {debounceHelper} from '@/utils';
import {EChartOption, ECharts} from 'echarts';

@Component
export default class EchartMixin extends Vue {
    chart: any = {};
    chartOption: any = {};
    resizeDebounceFn: any = {};
    chartInitDone = false;

    mounted() {
        this.$nextTick(() => {
            this.resizeDebounceFn = debounceHelper(() => {
                if (this.chart) {
                    typeof this.chart.resize === 'function' && this.chart.resize();
                }
            });
            window.addEventListener('resize', this.resizeDebounceFn);
        });
    }

    beforeDestroy() {
        window.removeEventListener('resize', this.resizeDebounceFn);
    }
}
