<template>
    <div class="robo-overflow-text-container">
        <div v-if="!isOverflow" ref="content" class="robo-normal-text">{{ content }}</div>
        <el-popover
            v-else
            :trigger="trigger"
            :placement="placement"
            class="robo-overflow-text-popover"
            :popper-class="innerPopperClass"
        >
            <p>{{ content }}</p>
            <div slot="reference" class="robo-overflow-text">
                {{ content }}
            </div>
        </el-popover>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch, Ref} from 'vue-property-decorator';

@Component
export default class RoboOverflowText extends Vue {
    @Prop({default: 'hover', type: String}) readonly trigger!: string;
    @Prop({default: 'top', type: String}) readonly placement!: string;
    @Prop({required: true, type: String}) readonly content!: string;
    @Prop({default: 1, type: Number}) readonly linesCount!: number;
    @Prop({default: '', type: String}) readonly popperClass!: string;

    @Ref('content') readonly contentEl!: HTMLElement;

    isOverflow = false;

    get innerPopperClass() {
        if (this.popperClass) {
            return this.popperClass;
        }
        return 'robo-overflow-default-popper-class';
    }

    // 判断元素的 clientWidth 是否小于 scrollWidth，是的话说明溢出，需要剪切
    @Watch('content', {immediate: true})
    onContentChange(newVal: string, oldVal: string) {
        if (newVal !== oldVal) {
            this.isOverflow = false;
            this.$nextTick(() => {
                this.isOverflow = this.contentEl.clientWidth < this.contentEl.scrollWidth;
            });
        }
    }
}
</script>

<style scoped lang="scss">
.robo-overflow-text-container {
    .robo-normal-text {
        overflow: hidden;
        white-space: nowrap;
    }

    .robo-overflow-text-popover {
        .robo-overflow-text {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>
<style lang="scss">
.robo-overflow-default-popper-class {
    &.el-popover {
        width: 22vw;
        min-width: 150px;
        max-width: 350px;
        font-size: 0.16rem;
        background: #2f9fff;
        border-color: #2f9fff;
        color: #fff;
        text-align: center;

        & .popper__arrow {
            border-bottom-color: #2f9fff !important;

            &::after {
                border-bottom-color: #2f9fff !important;
            }
        }
    }
}
</style>
