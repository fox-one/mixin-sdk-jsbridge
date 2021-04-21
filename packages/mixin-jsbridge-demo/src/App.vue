<template>
  <el-container class="wrapper">
    <el-header class="header">
      <template v-if="avatarUrl || userName">
        <el-dropdown>
          <div>
            <el-avatar class="header-avatar" :size="30" :src="avatarUrl" />
            <span class="header-username">{{ userName }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goLogout">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
        <el-select
          v-model="currentBridge"
          class="main-operation-selector"
          placeholder="选择调用的 Bridge"
        >
          <el-option
            v-for="bridge in bridgeOptions"
            :key="bridge"
            :value="bridge"
          />
        </el-select>
        <el-input
          v-model="result"
          class="main-operation-textarea"
          type="textarea"
          :rows="6"
          placeholder="暂无数据……"
        />
        <el-button
          class="main-operation-btn"
          type="danger"
          round
          @click="callBridge"
        >
          快猛戳我
        </el-button>
      </div>
    </el-main>

    <el-footer class="footer"> © Fox.ONE FED </el-footer>
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
      playlists: [
        'https://dev-courses-storage.firesbox.com/7000103418/replay/0880eec2-baaa-41be-b7c7-3c4cbaab411d.mp4',
        'https://dev-courses-storage.firesbox.com/7000103418/replay/ab1984c4-1d3f-46fd-8108-f0698d502a3f.mp4',
        'https://dev-courses-storage.firesbox.com/7000103418/replay/304c4e1f-16c2-4611-803c-b8aa64febd44.mp4'
      ],
      currentBridge: '',
      result: ''
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
        console.info(123, this.avatarUrl);
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
    },
    callBridge: function () {
      if (this.currentBridge) {
        const res = bridge[this.currentBridge]?.(this.playlists);
        this.result = res;
      }
    },
    goLogout() {
      bridge.logout();
    }
  }
});
</script>

<style lang="less" scoped>
@import './App.less';
</style>