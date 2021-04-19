<template>
  <el-container class="wrapper">
    <el-header class="header">
      <template v-if="avatarUrl || userName">
        <el-avatar class="header-avatar" :size="30" :src="avatarUrl" />
        <span class="header-username">{{ userName }}</span>
      </template>
      <template v-else>
        <el-button
          class="header-login"
          icon="el-icon-user"
          type="info"
          @click="goLogin"
        >
          登录
        </el-button>
      </template>
    </el-header>

    <el-main class="main">
      <router-view />
      <div class="main-operation">
        <el-select v-model="currentBridge">
          <el-option
            v-for="bridge in bridgeOptions"
            :key="bridge"
            :value="bridge"
          />
        </el-select>
        <el-input
          v-model="textarea"
          type="textarea"
          :rows="2"
          placeholder="暂无数据……"
        />
        <el-button> 快猛戳我 </el-button>
      </div>
    </el-main>

    <el-footer class="footer"> FoxONE FED ©foxone </el-footer>
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
      userName: '',
      bridgeOptions: ['getContext', 'reloadTheme', 'playlist'],
      currentBridge: ''
    };
  },
  async mounted() {
    let token = bridge.token;
    if (!token) {
      token = await bridge.requestToken();
    }

    if (token) {
      this.token = token;
      try {
        const { avatar_url, full_name } = await bridge.getUserInfo();
        this.avatarUrl = avatar_url;
        this.userName = full_name;
      } catch (err) {
        console.error(err);
      }
    }
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