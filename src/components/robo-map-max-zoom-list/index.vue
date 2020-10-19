<template>
    <ul v-show="maxZoomListVisible" class="robo-max-zoom-list" :style="maxZoomListStyle">
        <li
            v-for="item in maxZoomList"
            :key="item.eventId"
            class="max-zoom-item"
            :class="item.eventType"
            @click="showEventDetail(item.eventId)"
        >
            <p class="item-time">{{ item.eventTime | eventTime }}</p>
            <p class="item-obj-number">{{ item.objectNo }}</p>
            <p class="item-detail">{{ item.eventSubTypeName }}</p>
        </li>
    </ul>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator';
import {formatTimeHelper} from '@/utils';
import {TypeMaxZoomItem} from './types';

@Component({
    filters: {
        eventTime(val: number) {
            if (!val || val === -1) {
                return '-';
            }
            return formatTimeHelper(val, 'HH:mm:ss');
        }
    }
})
export default class RoboMapMaxZoomList extends Vue {
    @Prop({type: Number, default: 0}) maxZoomId!: number;
    @Prop({type: Object, default: () => {}}) maxZoomListStyle!: any;
    @Prop({type: Array, default: () => []}) maxZoomList!: TypeMaxZoomItem[];

    get maxZoomListVisible() {
        return !!this.maxZoomId;
    }

    // 事件详情
    @Emit('show-detail')
    showEventDetail(eventId: number) {
        return eventId;
    }
}
</script>

<style scoped lang="scss">
$illegalParkingColor: #48a0ff;
$abandonedObjectColor: #ff9421;
$trafficLightingColor: #fbfbfb;

.robo-max-zoom-list {
    position: absolute;
    max-height: px2vw(216px);
    overflow-y: scroll;

    .max-zoom-item {
        display: flex;
        max-width: px2vw(450px);
        height: px2vw(40px);
        line-height: px2vw(40px);
        padding: 0 px2vw(20px);
        background: rgba(57, 61, 72, 0.8);
        backdrop-filter: blur(2px);
        margin-bottom: px2vw(4px);
        white-space: nowrap;

        @include nice-btn();

        &:last-child {
            margin-bottom: 0;
        }

        &.illegalParking {
            border-left: 1px solid $illegalParkingColor;
            box-shadow: px2vw(16px) px2vw(16px) px2vw(16px) 0 rgba(0, 0, 0, 0.16), inset 2px 0 0 0 $illegalParkingColor;
        }

        &.trafficLight {
            border-left: 1px solid $trafficLightingColor;
            box-shadow: px2vw(16px) px2vw(16px) px2vw(16px) 0 rgba(0, 0, 0, 0.16), inset 2px 0 0 0 $trafficLightingColor;
        }

        &.abandonedObject {
            border-left: 1px solid $abandonedObjectColor;
            box-shadow: px2vw(16px) px2vw(16px) px2vw(16px) 0 rgba(0, 0, 0, 0.16), inset 2px 0 0 0 $abandonedObjectColor;
        }

        &:hover {
            background: lighten(rgba(57, 61, 72, 0.8), 10%);
        }

        &:active {
            background: darken(rgba(57, 61, 72, 0.8), 10%);
        }

        .item-time {
            flex: 0;
            display: inline-block;
            font-size: px2vw(14px);
            color: #fff;
        }

        .item-obj-number {
            flex: 0;
            display: inline-block;
            margin: 0 px2vw(17px) 0 px2vw(24px);
            font-size: px2vw(14px);
            color: #8997ab;
        }

        .item-detail {
            flex: 1;
            display: inline-block;
            color: rgba(149, 164, 185, 0.88);
            opacity: 0.88;

            @include fontSize12();
            @include text-overflow();
        }
    }
}
</style>
