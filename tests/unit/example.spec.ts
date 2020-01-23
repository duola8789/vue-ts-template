import {shallowMount} from '@vue/test-utils';
import HelloVue from '@/views/example/hello-vue/index.vue';

describe('HelloVue.vue', () => {
    it('renders data.msg when passed', () => {
        const msg = 'Hello Vue Hello Example';
        const wrapper = shallowMount(HelloVue, {
            propsData: {msg}
        });
        expect(wrapper.text()).toMatch(msg);
    });
});
