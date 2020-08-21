<template>
    <div class="robo-map-legend" :class="isCollapsed ? 'show' : ''">
        <div class="legend-btn" @click="isCollapsed = !isCollapsed">
            <i :class="isCollapsed ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
        </div>
        <ul class="legend-list">
            <li v-for="item in legends" :key="item.label" class="legend-item">
                <i class="legend-item-icon" :style="{backgroundImage: `url(${item.icon})`}"></i>
                <span class="legend-item-text">{{ item.label }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class RoboMapLegend extends Vue {
    @Prop({type: Array, default: () => []}) legends!: {icon: string; label: string}[];

    isCollapsed = false;
}
</script>

<style scoped lang="scss">
.robo-map-legend {
    display: flex;
    align-items: center;
    height: px2vw(44px);
    border-radius: px2vw(22px);
    overflow: hidden;
    transform: translateZ(0);
    transform-origin: 100% 50%;
    transition: all 0.1s ease;

    @include nice-btn();

    .legend-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: px2vw(32px);
        height: px2vw(32px);
        border-radius: 50%;
        color: #dce2ea;
        font-size: px2vw(20px);
        background-image: linear-gradient(179deg, #5f6777 0%, #484f5d 100%);
        transition: all 0.1s ease;

        &:hover {
            color: #ff8400;
        }
    }

    .legend-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 0;
        opacity: 0;
        margin-left: 0;
        transition: all 0.1s ease;

        .legend-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-right: px2vw(16px);

            &:last-child {
                margin-right: 0;
            }

            .legend-item-icon {
                display: block;
                width: px2vw(24px);
                height: px2vw(24px);
                border-radius: 50%;
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
                margin-right: px2vw(8px);
                opacity: 0;
            }

            .legend-item-text {
                @include fontSize12();

                color: #dce2ea;
            }
        }
    }

    &.show {
        background: #2b303a;
        padding: 0 px2vw(20px) 0 px2vw(6px);

        .legend-btn {
            background: none;
        }

        .legend-list {
            width: auto;
            opacity: 1;
            margin-left: px2vw(12px);

            .legend-item {
                .legend-item-icon {
                    opacity: 1;
                }
            }
        }
    }
}
</style>
