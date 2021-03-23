<template>
  <div class="Detail">
    {{ `The params is：${$route?.params?.id}` }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Detail'
});
</script>

<style lang="less">
@import './style/Detail.less';
</style>