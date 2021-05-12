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
              <el-dropdown-item @click="goLogout">logout</el-dropdown-item>
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
          login
        </el-button>
      </template>
      <div class="header-right">
        <span class="right__version"> version: {{ bridgeVersion }} </span>
        <span class="right__mixin"> inMixin: {{ isMixin }} </span>
      </div>
    </el-header>

    <el-main class="main">
      <router-view />
      <div class="main-operation">
        <el-select
          v-model="currentBridge"
          class="main-operation-selector"
          placeholder="Select Bridge"
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
          :rows="12"
          placeholder="No data available……"
        />
        <el-button
          class="main-operation-btn"
          :type="currentBridge ? 'danger' : 'info'"
          round
          :disabled="!currentBridge"
          @click="callBridge"
        >
          {{ currentBridge ? 'Click Me' : 'Select Bridge' }}
        </el-button>
      </div>
    </el-main>

    <el-footer class="footer">
      <el-link
        type="primary"
        href="https://fox-one.github.io/mixin-sdk-jsbridge/#/"
      >
        Docs
      </el-link>
      <el-divider direction="vertical" />
      <el-link type="primary" href="https://www.fox.one/#/">
        © Fox.ONE
      </el-link>
    </el-footer>
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
      bridgeOptions: ['getUserInfo', 'getContext', 'reloadTheme', 'playlist'],
      playlists: [
        'https://dev-courses-storage.firesbox.com/7000103418/replay/82480598-1d75-40d9-9317-d4850c980eb6.mp3',
        'https://dev-courses-storage.firesbox.com/7000103418/replay/0e43761b-4065-46ee-b0a1-a96aea13414a.mp3'
      ],
      currentBridge: '',
      bridgeVersion: bridge.version,
      isMixin: bridge.isMixin,
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
        contacts: true,
        assets: true,
        snapshots: true,
        messages: true
      });
    },
    callBridge: async function () {
      if (this.currentBridge) {
        const params =
          this.currentBridge === 'playlist' ? this.playlists : void 0;
        const res = await bridge[this.currentBridge]?.(params);
        let txt =
          this.currentBridge === 'getUserInfo' && !this.userName
            ? 'Please login first!'
            : '';
        if (res) {
          Object.keys(res).forEach(v => {
            txt += `${v}: ${res[v]}; \n\n`;
          });
        }
        this.result = txt;
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