<template>
    <div class="container">
        <h1>{{ msg }}</h1>
        <p>{{ test }}</p>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

import {namespace} from 'vuex-class';
import storeModules from '@/store/modules';
const store = namespace(storeModules.example.path.join('/'));

@Component
export default class HelloVue extends Vue {
    @store.State test!: string;

    msg: string = 'Hello Vue Hello Example';
}
</script>
