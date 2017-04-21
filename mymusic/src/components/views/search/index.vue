<template>
  <div>
    <head-comp></head-comp>
    <div class="search-wrap">
      <form action="">
        <span class="icon icon-search"></span>
        <input type="text"  @keyup="change()" class="key-word" v-model="search" placeholder="搜索歌曲、歌单、专辑">
        <span class="icon icon-del"></span>
      </form>
      <button class="search-btn" @click='change()' >搜索</button>
    </div>
    <div class="songList">
      <ul>
        <li v-for="song in song"><router-link class="theList" :to="{name: 'Playing', params: {songid: song.id,name:song.name,singer:song.singer}}" >{{song.name}}</router-link></li>
      </ul>
    </div>
    <div class="hot-keys">
      <h3 class="hot-title">热门搜索</h3>
      <div class="hot-wrap">
        <a href="" class="highlight" v-if="special_key">{{special_key}}</a>
        <template v-for="(item,index) in hotkeys">
          <a href="/playing" v-if="item.k.length > 4">{{item.k}}</a>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import HeadComp from '../../../components/header/header.vue'
  import playing from '../../../components/playing.vue'
  export default{
      data(){
          return{
              hotkeys:[],
            showHistory:true,
            special_key:'',
            search:'',
            song:[],
            pic:'',
          }
      },
    components:{
          HeadComp,playing
    },
    methods:{
          change:function () {
              if(this.search == ''){
                this.song = [];
                  return
              }
            this.$http.jsonp("https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?key="+this.search,{

              jsonp:'jsonpCallback'
            }).then(function (res) {
//
                if(res.data.data.song=="" &&res.data.data.mv==''){
                    return
                }
              this.song = res.data.data.song.itemlist;
              this.pic = res.body.data.album.itemlist[0].pic
              console.log(res)

            })
            //https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&format=jsonp&key=%E5%91%A8%E6%9D%B0%E4%BC%A6&g_tk=5381&jsonpCallback=SmartboxKeysCallbackmod_top_search5313&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0
            this.showHistory=!this.showHistory;
          }
    },
    beforeMount(){
          this.$http.jsonp('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',{
              params:{
                g_tk:5381,
                uin:0,
                format:'jsonp',
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'h5',
                needNewCode: 1,
                _:new Date().getTime()
              },
            jsonp:'jsonpCallback'
          }).then(function(res){
              console.log(res)
              this.hotkeys = res.body.data.hotkey;
              this.special_key = res.body.data.special_key;
          })
    }

  }

//http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n={2}&aggr=1&cr=1&loginUin={3}&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p={1}&catZhida=0&remoteplace=sizer.newclient.next_song&w={0}
</script>
<style lang="less">
  @import 'index.less';
</style>
