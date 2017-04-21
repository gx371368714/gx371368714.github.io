<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>
import Hello from './components/Hello'

import store from './vuex/store'
export default {
  name: 'app',
  components: {

  }
}
</script>

<style lang="less">
@import "app.less";
</style>
