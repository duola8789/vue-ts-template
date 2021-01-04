<template>
    <a class="robo-info-flow-button" :href="infoId">
        <i class="info-flow-icon"></i>
    </a>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class RoboInfoFlowButton extends Vue {
    @Prop({type: String, required: true}) infoFlowId!: string;
    @Prop({type: String, required: true}) infoFlowName!: string;

    get infoId() {
        return `baidu://message/?id=${this.infoFlowId}`;
    }
}
</script>

<style scoped lang="scss">
.robo-info-flow-button {
    display: inline-block;
    float: right;
    margin-top: 2px;
    cursor: pointer;

    .info-flow-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('./icons/info-flow.png') no-repeat center center;
        background-size: cover;
        vertical-align: middle;
    }
}
</style>
