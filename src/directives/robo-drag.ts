/**
 * Created by zh on 2020/12/28.
 */
import Vue from 'vue';

let oldMargin = '';

//  在一定范围内拖动 div
//  bar：点击bar元素时开始拖动target
function dragDiv(bar: string | HTMLElement, target: string | HTMLElement, forElementUI = false) {
    let barEle = typeof bar === 'string' ? document.querySelector<HTMLElement>(bar) : bar,
        targetEle = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;

    if (forElementUI && targetEle) {
        targetEle = targetEle.querySelector('.el-dialog');
    }

    if (!barEle || !targetEle) {
        return;
    }

    barEle.style.cursor = 'move';
    barEle.style.userSelect = 'none';

    oldMargin = window.getComputedStyle(targetEle).margin || '';

    let disX = 0,
        disY = 0;

    barEle.onmousedown = function(event) {
        if (!targetEle) {
            return;
        }

        let viewPortWidth = document.documentElement.clientWidth, // 浏览器窗口可视区域宽度
            viewPortHeight = document.documentElement.clientHeight; // 浏览器窗口可视区域高度

        let targetRect = targetEle.getBoundingClientRect(),
            targetWidth = targetRect.width,
            targetHeight = targetRect.height,
            targetLeft = targetRect.left,
            targetTop = targetRect.top;

        // 获取鼠标到元素边界的距离，防止开始移动时出现跳动
        disX = event.clientX - targetLeft;
        disY = event.clientY - targetTop;

        document.onmousemove = function(e) {
            if (!targetEle) {
                return;
            }

            let x = e.clientX - disX,
                y = e.clientY - disY;

            if (x < 0) {
                x = 0;
            }
            if (x > viewPortWidth - targetWidth) {
                x = viewPortWidth - targetWidth;
            }

            if (y < 0) {
                y = 0;
            }
            if (y > viewPortHeight - targetHeight) {
                y = viewPortHeight - targetHeight;
            }

            targetEle.style.margin = '0';
            targetEle.style.left = x + 'px';
            targetEle.style.top = y + 'px';
        };

        document.onmouseup = function(e) {
            document.onmousemove = null;
            document.onmouseup = null;
            e.stopPropagation();
        };
    };
}

// robo-drag.js:40 1920 590 200 200 171 132.375

function resetDiv(target: string | HTMLElement, forElementUI = false) {
    let targetEle = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;

    if (forElementUI && targetEle) {
        targetEle = targetEle.querySelector('.el-dialog');
    }

    if (!targetEle) {
        return;
    }

    targetEle.style.left = '0px';
    targetEle.style.top = '0px';

    if (oldMargin) {
        targetEle.style.margin = oldMargin;
    }
}

Vue.directive('robo-drag', {
    inserted(el, binding) {
        dragDiv(binding.value, el, binding.modifiers.forEl);
    },
    componentUpdated(el, binding) {
        if (binding.modifiers.forEl && el.style.display === '') {
            setTimeout(() => {
                resetDiv(el, binding.modifiers.forEl);
            }, 500);
        }
    }
});
