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

const exampleStore = namespace(storeModules.example.path);

@Component
export default class HelloVue extends Vue {
    @exampleStore.State test!: string;

    msg: string = 'Hello Vue Hello Example';
}
</script>
