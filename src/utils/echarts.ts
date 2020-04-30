import {ECharts} from 'echarts';

// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');

// 引入工具函数（为了在 echarts上 添加原型方法引入）
const modelUtil = require('echarts/lib/util/model');

// 引入折线图
require('echarts/lib/chart/line');
// 引入饼图
require('echarts/lib/chart/pie');
// 引入柱状图
require('echarts/lib/chart/bar');

require('echarts/lib/component/graphic');

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legendScroll');

// 在 echarts 上添加原型方法，获取节点位置
Object.defineProperty(echarts.__proto__, 'roboGetPointPositions', {
    enumerable: false,
    value: function(seriesIndex: number = 0) {
        const ecModel = this._model;

        const finder = modelUtil.parseFinder(ecModel, {finder: {seriesIndex}}, {defaultMainType: 'series'});

        const seriesModel = finder.seriesModel;

        if (seriesModel && typeof seriesModel.getData === 'function') {
            const list = seriesModel.getData();
            if (list) {
                return list._itemLayouts || null;
            }
        }
        return null;
    }
});

// 展示最后一个点的悬浮框（tooltip 的 trigger 必须设置为 axis）
const showLastToolTip = (echart: ECharts, dataIndex: number, seriesIndex = 0): void => {
    setTimeout(() => {
        echart.dispatchAction({
            type: 'showTip',
            // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
            seriesIndex,
            // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
            dataIndex
        });
    }, 0);
};

export {echarts, showLastToolTip};
