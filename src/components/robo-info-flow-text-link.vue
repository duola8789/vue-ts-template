<template>
    <a class="robo-info-flow-text-link" :href="infoId">
        {{ infoFlowName }}
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

    &:hover {
        color: #409eff;
    }
}
</style>
