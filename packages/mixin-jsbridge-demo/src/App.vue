<template>
  <el-container class="main">
    <el-header>
      <template v-if="avatarUrl">
        <el-avatar :size="50" :src="avatarUrl" />
        <span>{{ userName }}</span>
      </template>
      <template v-else>
        <el-button icon="el-icon-user" type="info" plain @click="goLogin">
          登录
        </el-button>
      </template>
    </el-header>
    <el-main>
      <router-view />
    </el-main>

    <span class="main-btn main-btn-home">
      <router-link to="/">Home</router-link>
    </span>
    <span class="main-btn main-btn-detail">
      <router-link to="/detail">Go Detail</router-link>
    </span>
    <span class="main-btn main-btn-detail-1">
      <router-link to="/detail/1"> Detail - Part1 </router-link>
    </span>
    <span class="main-btn main-btn-detail-2">
      <router-link to="/detail/2"> Detail - Part2 </router-link>
    </span>
    <el-footer class="main-footer"> FoxONE FED ©foxone </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Bridge from '@foxone/mixin-sdk-jsbridge';

const bridge = new Bridge({
  client_id: '86cf39ad-4e63-46c6-a6db-90cea8d05c1d'
});

export default defineComponent({
  setup() {},
  data() {
    return {
      token: '',
      avatarUrl: '',
      userName: ''
    };
  },
  async mounted() {
    this.token = bridge.token;
    if (!this.token) {
      this.token = await bridge.requestToken();
    }

    console.info(555, this.token);
  },
  methods: {
    goLogin: function () {
      bridge.login({
        profile: true,
        phone: true,
        contacts: false,
        assets: true,
        snapshots: false
        // messages: false,
        // represent: false
      });
    }
  }
});
</script>

<style lang="less" scoped>
@import './App.less';
</style>