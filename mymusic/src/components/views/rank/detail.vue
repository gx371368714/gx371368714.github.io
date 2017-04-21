<template>
  <div>
    <div class="header rel">
      <img :src="topinfo.pic_album" alt="" class="header-bg">
      {{transferColor}}
      <div class="album-mask"></div>
      <div class="album-info">
        <div class="album-title">
          <h1 class="nowrap">{{topinfo.ListName}}</h1>
          <p class="nowrap">{{update_time}}&nbsp;更新</p>
        </div>
        <div class="album-play"></div>
      </div>
    </div>

    <ul class="list" :style="{backgroundColor: color}">
      <template v-for="(list, index) in songlist">
        <song-list :listdata=list.data :listindex=index></song-list>
      </template>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import SongList from '../../../components/song-list.vue'

  export default {
    data () {
      return {
        songlist: [],
        topinfo: [],
        id: this.$route.params.id,
        color: 0,
        update_time: ''
      }
    },
    computed: {
      transferColor: function() {
        var t = this.color;
        function n(t) {
          return t > 16 ? t.toString(16) : "0" + t.toString(16)
        }
        if (t) {
          var o = (16711680 & t) >> 16, a = (65280 & t) >> 8, i = 255 & t;

          var s = n(o) + n(a) + n(i);
          this.color = '#' + s;
        } else {
          this.color = '#000';
        }
      }
    },
    components: {
      SongList
    },
    beforeMount () {
      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
        params: {
          g_tk: 5381,
          uin: 0,
          format: 'jsonp',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1,
          page: 'detail',
          type: 'top',
          topid: this.id,
          _: new Date().getTime()
        },
        jsonp: 'jsonpCallback'
      }).then(function (response) {

        this.songlist = response.body.songlist;
        this.topinfo = response.body.topinfo;
        this.color = response.body.color;
        this.update_time = response.body.update_time;
        console.log(response)
      })
    }
  }
</script>
<style>
  @import "detail.less";
</style>
