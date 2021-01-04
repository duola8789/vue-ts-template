<template>
    <svg class="icon-font" aria-hidden="true">
        <use :xlink:href="iconHref"></use>
    </svg>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import {formatTimeHelper} from '@/utils';

@Component
export default class RoboSymbolIcon extends Vue {
    @Prop({required: true, type: String}) href!: string;

    get iconHref() {
        return `#${this.href}`;
    }
}
</script>
