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
    </el-header>

    <el-main class="main">
      <router-view />
      <div class="main-operation">
        <el-select
          v-model="currentBridge"
          class="main-operation-selector"
          placeholder="Select a Bridge"
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
          type="danger"
          round
          @click="callBridge"
        >
          Click Me
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
      bridgeOptions: ['getUserInfo', 'getContext', 'reloadTheme', 'playlist'],
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
    callBridge: async function () {
      if (this.currentBridge) {
        const res = await bridge[this.currentBridge]?.(this.playlists);
        let txt = '';
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