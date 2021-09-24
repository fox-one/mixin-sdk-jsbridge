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
        <span class="right__version"> App Version: {{ appVersion }} </span>
        <span class="right__version">
          Bridge Version: {{ bridgeVersion }}
        </span>
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
        <el-button
          class="main-operation-btn main-operation-btn-schema"
          :type="isSchema ? 'warning' : 'info'"
          round
          :disabled="!isSchema"
          @click="rumSchema"
        >
          {{ 'Run Schema' }}
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

// eslint-disable-next-line no-undef
const pkj = require('../package.json');

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
        'supportAPIs',
        'getUserInfo',
        'getContext',
        'reloadTheme',
        'showToast',
        'playlist',
        'payment',
        'transfer',
        'share',
        'popup-user',
        'popup-bot',
        'snapshot',
        'addAddress',
        'delAddress',
        'withdrawal',
        'conversation'
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
      app_id: '86cf39ad-4e63-46c6-a6db-90cea8d05c1d',
      currentBridge: '',
      isSchema: false,
      appVersion: bridge.version ?? '-',
      isMixin: bridge.isMixin,
      bridgeVersion:
        pkj?.dependencies?.['@foxone/mixin-sdk-jsbridge'].match(
          /\d.\d.\d\S*/g
        )?.[0] ?? '-',
      result: ''
    };
  },
  watch: {
    result: function (val) {
      this.isSchema = /^mixin:\/\//g.test(val);
    }
  },
  async mounted() {
    let token = bridge.token;
    if (!token) {
      token = await bridge.requestToken();
    }

    if (token) {
      this.token = token;
      try {
        const { avatar_url, full_name } = (await bridge.getUserInfo()) || {};
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
        case 'supportAPIs':
          res = bridge.supportAPIs;
          break;
        case 'playlist':
          res = await bridge.playlist?.(this.playlists);
          break;
        case 'payment':
          res = bridge.payment?.(this.payment);
          break;
        case 'transfer':
          res = bridge.transfer?.(this.payment.recipient);
          break;
        case 'share':
          res = bridge.share?.('app_card', {
            action: 'https://fox-one.github.io/mixin-sdk-jsbridge-bot/#/',
            app_id: this.app_id,
            icon_url: 'https://www.fox.one/logo.png',
            title: 'Mixin-JSBridge',
            description: 'The Bot For Mixin-JSBridge Debugging'
          });
          break;
        case 'popup-user':
          res = bridge.popup?.('user', this.payment.recipient);
          break;
        case 'popup-bot':
          res = bridge.popup?.('bot', {
            app_id: this.app_id,
            action: 'open'
          });
          break;
        case 'showToast':
          res = bridge.showToast?.('Please give me a github-star!');
          break;
        case 'snapshot':
          res = bridge.snapshot({
            snapshot_id: '620b01bb-91be-45d9-9e0f-dc067310d079'
          });
          break;
        case 'withdrawal':
          res = bridge.withdrawal({
            address: '1CkFRshv9zX5B4W4wf9kz6MkxFs8AcD2sR',
            asset: 'c6d0c728-2624-429b-8e0d-d9d19b6592fa',
            amount: '0.001'
          });
          break;
        case 'addAddress':
          res = bridge.address('add', {
            asset: 'c6d0c728-2624-429b-8e0d-d9d19b6592fa',
            label: 'BigONE wallet - BTC',
            destination: '1CkFRshv9zX5B4W4wf9kz6MkxFs8AcD2sR',
            tag: 'BTC'
          });
          break;
        case 'delAddress':
          res = bridge.address('del', {
            asset: 'c6d0c728-2624-429b-8e0d-d9d19b6592fa',
            address: '1CkFRshv9zX5B4W4wf9kz6MkxFs8AcD2sR'
          });
          break;
        case 'conversation':
          res = bridge.conversation('51e0e886-fba7-3732-804f-2686e5bb459e');
          break;
        default:
          res = await bridge[this.currentBridge]?.();
      }

      let txt =
        this.currentBridge === 'getUserInfo' && !this.userName
          ? 'Please login first!'
          : '';

      const recursion = function (data, text) {
        Object.keys(data).forEach(v => {
          const dataType = Object.prototype.toString.call(data[v]);
          if (dataType.slice(8, dataType.length).toLowerCase() === 'object') {
            text = recursion(data[v], text);
          } else {
            text += `${v}: ${data[v]}; \n\n`;
          }
        });
        return text;
      };
      if (res && typeof res !== 'string') {
        txt = recursion(res, '');
      }
      this.result = txt || res;
    },
    rumSchema() {
      window.location.href = this.result;
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