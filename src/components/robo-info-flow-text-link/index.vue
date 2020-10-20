<template>
    <a class="info-flow" :href="infoId">
        <i class="info-flow-icon"></i>
        <span v-if="infoFlowName" class="info-flow-name">{{ infoFlowName }}</span>
    </a>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class InfoFlowTextLink extends Vue {
    @Prop({type: String, required: true}) infoFlowId!: string;
    @Prop({type: String, default: ''}) infoFlowName!: string;

    get infoId() {
        return `baidu://message/?id=${this.infoFlowId}`;
    }
}
</script>

<style scoped lang="scss">
.robo-info-flow-text-link {
    color: #74b2f3;
    transition: 0.2s;
    cursor: pointer;
    user-select: none;

    .info-flow-icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-top: -2px;
        margin-right: 2px;
        background: url('./icons/info-flow.png') no-repeat center center;
        background-size: cover;
        vertical-align: middle;
    }

    .info-flow-name {
        cursor: pointer;
        transition: 0.2s;
        color: inherit;

        &:hover {
            color: #409eff;
        }
    }
}
</style>
