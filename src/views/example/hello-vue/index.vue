<template>
    <div class="container">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class HelloVue extends Vue {
    msg: string = 'Hello Vue Hello Example';
}
</script>
