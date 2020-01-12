<template>
  <div class="home">
    <img alt="Vue logo" src="~@/assets/images/logo.png" class="logo" />
    <h1 class="title">Vue TypeScript Project</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>

<style scoped lang="less">
.home {
  margin-top: 250px;
  text-align: center;

  .title {
    margin-top: 10px;
    font-size: 30px;
    color: @mainColor;
  }
}
</style>
