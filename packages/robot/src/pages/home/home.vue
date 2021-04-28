<template>
  <div class="home">
    <h1 class="home-title">Mixin-JSBridge</h1>
    <p class="home-description">The Mixin-JSBridge Robot Based On Mixin Eco</p>
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