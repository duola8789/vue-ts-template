<template>
    <a class="robo-info-flow" :href="infoId">
        <i class="info-flow-icon"></i>
        <span v-if="infoFlowName" class="info-flow-name">{{ infoFlowName }}</span>
    </a>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class RoboInfoFlowButton extends Vue {
    @Prop({type: String, required: true}) infoFlowId!: string;
    @Prop({type: String, default: ''}) infoFlowName!: string;

    get infoId() {
        return `baidu://message/?id=${this.infoFlowId}`;
    }
}
</script>

<style scoped lang="scss">
.robo-info-flow {
    display: inline-block;
    float: right;
    margin-top: 2px;

    .info-flow-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('./icons/info-flow.png') no-repeat center center;
        background-size: cover;
    }

    .info-flow-name {
        transition: 0.2s;
        color: rgba(0, 0, 0, 0.65);
        cursor: pointer;
        user-select: none;

        &:hover {
            color: #409eff;
        }
    }
}
</style>
