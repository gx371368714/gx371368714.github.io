<template>
  <li class="song-list">
    <h3 class="song-list-no">{{listindex + 1}}</h3>
    <router-link :to="{name: 'Playing', params: {songid: listdata.songid}}" class="song-list-cont">
      <div @click='toPlay(listdata)'>
        <p class="song-name nowrap">{{listdata.songname}}</p>


        <p class="song-info nowrap">
          <template v-for='(item, index) in listdata.singer'>
            <span v-if='index > 0'>&nbsp;/&nbsp;</span>{{item.name}}
          </template>
          <span class="icon icon-point"></span>
          {{listdata.albumname}}
          <template v-if='listdata.albumdesc'>
            <span class="icon icon-point"></span>
            {{listdata.albumdesc}}
          </template>
        </p>
      </div>
    </router-link>
  </li>
</template>

<script>
  import store from '../vuex/store'

  export default {
    props: {
      listdata: {
        type: Object,
        default: {}
      },
      listindex: {
        type: Number,
        default: 1
      }
    },
    methods: {
      toPlay: function(songInfo) {
        store.commit('changeSong', songInfo);
      }
    }
  }
</script>
<style lang="less">
  @import "song-list.less";
</style>
