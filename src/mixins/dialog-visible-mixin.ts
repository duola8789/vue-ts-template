/**
 * 用来控制 el-dialog 封装在单独的业务组件内时的可见性控制
 */
import Vue from 'vue';
import {Component, Emit, Prop} from 'vue-property-decorator';

@Component
export default class DialogVisibleMixin extends Vue {
    @Prop({type: Boolean, default: false, required: true}) visible!: boolean;

    get innerVisible() {
        return this.visible;
    }
    set innerVisible(visible) {
        this.toggleDialogVisible(visible);
    }

    @Emit('update:visible')
    toggleDialogVisible(visible: boolean) {
        return visible;
    }
}
