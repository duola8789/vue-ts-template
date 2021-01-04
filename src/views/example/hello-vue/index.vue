<template>
    <div class="container">
        <h1>{{ msg }}</h1>
        <p>{{ test }}</p>
        <el-button type="primary" @click="visible = true">Show Dialog</el-button>
        <el-dialog
            v-robo-drag.forEl="'.el-dialog__header'"
            :visible.sync="visible"
            title="Dialog"
            :append-to-body="true"
            :close-on-click-modal="false"
            :modal-append-to-body="true"
        ></el-dialog>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

import {namespace} from 'vuex-class';
import {storeModules} from '@/store/modules';

const exampleStore = namespace(storeModules.example.path);

@Component
export default class HelloVue extends Vue {
    @exampleStore.State test!: string;

    msg: string = 'Hello Vue Hello Example';

    visible = false;
}
</script>
