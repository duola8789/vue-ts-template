<template>
    <robo403404 type="404" />
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Robo403404 from '@/components/robo-403-404/index.vue';

@Component({
    components: {Robo403404}
})
export default class Forbidden extends Vue {}
</script>
