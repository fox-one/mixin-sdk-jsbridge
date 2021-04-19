<template>
  <div class="home">
    <h1 class="home-title">JSBridge-Debug</h1>
    <p class="home-description">基于 Mixin 的 JSBridge Debug 机器人</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage'
});
</script>

<style lang="less">
@import './style/home.less';
</style>