<template>
    <div class="container">
        <h1>{{ msg }}</h1>
        <p>{{ test }}</p>
        <p>{{ test2 }}</p>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

import {namespace} from 'vuex-class';
import storeModules from '@/store/modules';

const exampleStore = namespace(storeModules.example.path);
const demo1Store = namespace(storeModules.example.children.demo1);

@Component
export default class HelloVue extends Vue {
    @exampleStore.State test!: string;
    @demo1Store.State('test') test2!: string;

    msg: string = 'Hello Vue Hello Example';
}
</script>
