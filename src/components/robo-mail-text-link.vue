<template>
    <a class="robo-mail-text-link" type="email" :href="mailInfo"><robo-overflow-text :content="text" /></a>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import RoboOverflowText from './robo-overflow-text.vue';

@Component({
    components: {RoboOverflowText}
})
export default class RoboMailTextLink extends Vue {
    @Prop({type: String, required: true}) href!: string;
    @Prop({type: String, required: false}) label!: string;

    get mailInfo() {
        return `mailto:${this.href}`;
    }

    get text() {
        return this.label || this.href;
    }
}
</script>

<style scoped lang="scss">
.robo-mail-text-link {
    color: #8e9aae;
    transition: 0.1s;
    font-size: inherit;
    vertical-align: middle;

    &:hover {
        color: #409eff;
    }
}
</style>
