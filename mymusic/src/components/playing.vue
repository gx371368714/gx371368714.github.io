<template>
  <div class="song-wrap">
    <div class="song-bg" :style="bodyStyle"></div>
    <div class="song-mask"></div>
    <audio :src='songUrl' autoplay="autoplay" id="audio" ></audio>
    <div class="song_info">
      <img :src="pic" alt="" class="album-cover">
      <div class="info">
        <h1 class="nowrap">{{playingsong.songname}}</h1>
        <p>
          <template v-for="item in playingsong.singer">{{item.name}}&nbsp;</template>
        </p>
      </div>
      <span class="icon" :class="[isPlaying ? 'pause-icon' : 'play-icon']" @click="palyOrPause"></span>
    </div>

    <div class="lyc-wrap">
      <div class="lyc">
            <p ref="firstLine"></p>
            <lyc-item v-for="(lycItem, index) in lycArr" :lyc=lycItem :index=index :lines=lines></lyc-item>
      </div>
    </div>

    <div class="controller">

    </div>
  </div>
</template>

<script>
  import Base64 from '../base64'
  import store from '../vuex/store'
  import LycItem from '../lyric.vue'

  export default {
    data () {
      let song = store.getters.getSong,
        pic = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000' + song.albummid +'.jpg';
//http://y.gtimg.cn/music/photo_new/T002R300x300M008119526798573122014.jpg
      return {
          time:0,
        songId: this.$route.params.songid,
        playingsong: song,
        bodyStyle: {
          color: '#f30',
          backgroundImage: "url(" + pic + ")",
          fontSize: '12px'
        },
        isPlaying: true,
        pic: pic,
        timer:null,
        lycArr: [],
        lines:-1
      }
    },
//http://ws.stream.qqmusic.qq.com/001Js78a40BZU6.m4a?fromtag=46
    components:{
      Base64,
      LycItem
    },
    computed: {
      songUrl: function () {
        return 'http://ws.stream.qqmusic.qq.com/'+this.songId+'.m4a?fromtag=46';
      }
    },
    props: {

    },
    methods: {
      palyOrPause: function () {
        console.log(this.song)
        let audio = document.getElementById('audio');
        if (this.isPlaying) {
          audio.pause();

        } else {
          audio.play();

        }
        this.isPlaying = !this.isPlaying;
      },
      fomatFloat:function(f, digit){
        var m = Math.pow(10, digit);
        return parseInt(f * m, 10) / m;
      }
    },
   mounted(){
      var _that = this;
      var nowTime;
      var audio = document.getElementById('audio');
      audio.onended = function(){
          clearInterval(_that.timer)
      }

     _that.timer = setInterval(function(){
         nowTime = audio.currentTime;
        nowTime = _that.fomatFloat(nowTime, 2);

          for(var i =0; i<_that.lycArr.length;i++){
            if(nowTime == _that.lycArr[i].time&&nowTime>0){
                  _that.lines++;
              if(_that.lines>4){
              _that.$refs.firstLine.style.marginTop = -(_that.lines-4)*40 +'px'
              }
            }
          }
      },10)

    },
    beforeMount () {
      this.playingsong = store.getters.getSong;

      let getTime = function (time) {
        let secArr = time.split('.'),
          secArr2 = secArr[0].split(':'),
          sec = +secArr2[0] * 60 + secArr2[1] * 1;
        return sec + '.' + secArr[1]
      }

      let _this = this;

      this.$http.jsonp('https://api.darlin.me/music/lyric/' + this.songId , {
        jsonp: 'callback'
      }).then(function (response) {

        Base64.decode(response.data.lyric)
          .split('[')
          .slice(7)
          .map(function(str) {
              var t = str.split(']');
              if (t[1].length > 1) {
                _this.lycArr.push({
                  time: getTime(t[0]),
                  lyc: t[1]
                });
              }
            }
          )
//        console.log(_this.lycArr)
      });
    }
  }
</script>
<style lang="less">
 @import "playing.less";
</style>
