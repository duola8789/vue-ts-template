<template>
    <ul class="robo-map-type-switcher">
        <li
            v-for="type in types"
            :key="type.value"
            class="robo-map-type-switcher-btn"
            :class="activeType === type.value ? 'robo-map-active-switcher' : ''"
            @click="changeActiveType(type.value)"
        >
            {{ type.name }}
        </li>
    </ul>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator';

@Component
export default class RoboMapTypeSwitcher extends Vue {
    @Prop({required: true, type: Array}) types!: {value: string; name: string}[];
    @Prop({required: true, type: String}) activeType!: string;

    @Emit('update:activeType')
    changeActiveType(type: string) {
        if (this.activeType === type) {
            return;
        }
        return type;
    }
}
</script>

<style scoped lang="scss">
.robo-map-type-switcher {
    color: #9fbcff;
    font-size: 0.16rem;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    background: #1e366e;
    border-radius: 0.15rem;

    .robo-map-type-switcher-btn {
        display: inline-block;
        padding: 0 0.24rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        border-radius: 0.15rem;
        transition: all linear 0.1s;

        &.robo-map-active-switcher {
            background: #2b4687;
            color: #fff;
        }
    }
}
</style>
