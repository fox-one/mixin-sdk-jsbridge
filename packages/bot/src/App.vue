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
      bridgeOptions: [
        'getUserInfo',
        'getContext',
        'reloadTheme',
        'playlist',
        'payment',
        'transfer',
        'share',
        'popup'
      ],
      playlists: [
        'https://dev-courses-storage.firesbox.com/7000103418/replay/82480598-1d75-40d9-9317-d4850c980eb6.mp3',
        'https://dev-courses-storage.firesbox.com/7000103418/replay/0e43761b-4065-46ee-b0a1-a96aea13414a.mp3'
      ],
      payment: {
        recipient: '0286485f-14a5-4d82-b4de-56a3b8b9f044',
        asset: '965e5c6e-434c-3fa9-b780-c50f43cd955c',
        amount: 1
      },
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
      let res;
      switch (this.currentBridge) {
        case 'playlist':
          res = await bridge[this.currentBridge]?.(this.playlists);
          break;
        case 'payment':
          res = await bridge[this.currentBridge]?.(this.payment);
          break;
        case 'transfer':
          res = await bridge[this.currentBridge]?.(this.payment.recipient);
          break;
        case 'share':
          res = await bridge[this.currentBridge]?.('app_card', {
            action: 'https://fox-one.github.io/mixin-sdk-jsbridge-bot/#/',
            app_id: '86cf39ad-4e63-46c6-a6db-90cea8d05c1d',
            title: 'Mixin-JSBridge',
            description: 'The Bot For Mixin-JSBridge Debugging'
          });
          break;
        case 'popup':
          res = await bridge[this.currentBridge]?.(
            'user',
            this.payment.recipient
          );
          break;
        default:
          res = await bridge[this.currentBridge]?.();
      }

      let txt =
        this.currentBridge === 'getUserInfo' && !this.userName
          ? 'Please login first!'
          : '';
      if (res && typeof res !== 'string') {
        Object.keys(res).forEach(v => {
          txt += `${v}: ${res[v]}; \n\n`;
        });
      }
      this.result = txt || res;
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