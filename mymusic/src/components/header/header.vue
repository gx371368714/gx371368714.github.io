<template>
  <div class="head f-cb">
    <router-link to="/recommend" :class="{'active' :curTab == 0}"><span @click="changeChannel(0)">推荐</span></router-link>
    <router-link to="/rank" :class="{'active' :curTab == 1}"><span @click="changeChannel(1)">排行榜</span></router-link>
    <router-link to="/search" :class="{'active' :curTab == 2}"><span @click="changeChannel(2)">搜索</span></router-link>
  </div>
</template>

<script>
  import router from 'vue-router'
  import store from '../../vuex/store'

  export default {
    data: function() {
      return {
        curTab: store.getters.getTab
      }
    },
    computed: {

    },
    methods: {
      changeChannel (arg) {
        store.commit('changeTab', arg);
      }
    }
  }
</script>

<style lang="less">
  @import "header.less";
</style>
