<template>
  <div class="main">
    <router-view />
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
    <footer class="main-footer">OMNI-DOOR TEAM ©omni-door</footer>
  </div>
</template>

<style lang="less" scoped>
@import './App.less';
</style>