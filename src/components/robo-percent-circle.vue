<!-- 百分比圆环进度 -->
<template>
    <div class="chart-container">
        <div :id="containerId" class="chart"></div>
    </div>
</template>

<script lang="ts">
// chart 实例的声明以及 resize 事先的监听和销毁都在 EchartMixin 中完成
import {Component, Mixins, Prop, Watch} from 'vue-property-decorator';
import EchartMixin from '@/mixins/echart-mixin';
import {echarts} from '@/utils';

@Component
export default class RoboPercentCircle extends Mixins(EchartMixin) {
    @Prop({default: '#2B4A8F', type: String}) unFinishedColor!: string;
    @Prop({default: () => ['#0087ff', '#1feeff']}) finishedColor!: string | string[];

    // 当 showPercent 为 true 时，展示百分比，否则直接展示传入的数值
    @Prop({default: true, type: Boolean}) showPercent!: boolean;
    @Prop({default: 100, type: Number}) total!: number;
    @Prop({required: true, type: Number}) value!: number;

    @Prop({required: true, type: String}) id!: string;

    // size 分为 mini/small/normal
    @Prop({default: 'normal', type: String}) size!: string;

    get chartValue() {
        if (!this.showPercent) {
            return this.value;
        }
        return Math.floor(this.value * 100);
    }

    get numberFontSize() {
        if (this.size === 'mini') {
            return 0.16;
        }
        if (this.size === 'small') {
            return 0.24;
        }
        return 0.28;
    }

    get containerId() {
        return `percent-chart-${this.id}`;
    }

    @Watch('value', {immediate: true, deep: true})
    valueChanged(): void {
        this.$nextTick(() => {
            this.renderChart();
        });
    }

    renderChart() {
        this.chart = echarts.init(document.querySelector(`#${this.containerId}`));

        const rem = parseInt(getComputedStyle(document.documentElement).fontSize as string, 10);
        const numberFontSize = Math.floor(this.numberFontSize * rem);

        // 瞎搞的渐变色 https://www.jianshu.com/p/9cb7a0320a8c
        const finishedColor = Array.isArray(this.finishedColor)
            ? new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                  {offset: 0.1, color: '#0087ff'},
                  {offset: 0.5, color: '#1feeff'},
                  {offset: 0.8, color: '#1feeff'},
                  {offset: 1, color: '#0087ff'}
              ])
            : this.finishedColor;

        const option = {
            series: [
                {
                    name: 'percent',
                    type: 'pie',
                    radius: ['85%', '100%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    silent: true,
                    color: [this.unFinishedColor, finishedColor],
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: this.showPercent
                                ? `{number|${this.chartValue}}{percent|%}`
                                : `{number|${this.chartValue}}`,
                            textStyle: {
                                verticalAlign: 'baseline'
                            },
                            rich: {
                                number: {
                                    color: '#d6e7ff',
                                    fontSize: numberFontSize,
                                    verticalAlign: 'bottom'
                                },
                                percent: {
                                    color: '#fff',
                                    fontSize: 12,
                                    verticalAlign: 'bottom'
                                }
                            }
                        }
                    },
                    data: [{value: this.total - this.chartValue, name: '123123'}, {value: this.chartValue}]
                }
            ]
        };

        this.chart.setOption(option);
    }

    mounted() {
        this.$nextTick(() => {
            this.renderChart();
        });
    }
}
</script>

<style scoped lang="scss">
.chart-container {
    position: relative;
    width: 100%;
    height: 100%;

    .chart {
        width: 100%;
        height: 100%;
    }
}
</style>
