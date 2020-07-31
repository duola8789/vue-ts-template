/**
 * 用来动态注册、卸载 Vuex 模块
 */
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {StoreModuleName} from '@/store/modules/types';
import {registerStoreModule} from '@/utils';

export default function registerModuleMixinCreator(moduleName: StoreModuleName) {
    @Component
    class RegisterModuleMixin extends Vue {
        beforeMount() {
            registerStoreModule(moduleName, true);
        }

        destroyed() {
            // 开发环境下不卸载 Store，因为热更新会首先执行新组件的
            if (process.env.NODE_ENV !== 'development') {
                registerStoreModule(moduleName, false);
            }
        }
    }
    return RegisterModuleMixin;
}
