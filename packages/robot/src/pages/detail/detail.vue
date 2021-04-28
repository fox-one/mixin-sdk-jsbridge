<template>
  <div class="detail">Detail Page <router-view /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DetailPage'
});
</script>

<style lang="less">
@import './style/detail.less';
</style>