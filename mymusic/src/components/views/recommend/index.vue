<template>
 <div>
   <head-comp></head-comp>
   <div id="main">
     <swiper class="my-swipe">
       <swiper-slide class="slide" v-for="item in sliderData" :key="item.alt">
         <a :href="item.href">
           <img :src=item.src :alt=item.alt>
         </a>
       </swiper-slide>
     </swiper>
   </div>
   <div class="radio-wrap section-wrap">
     <h3 class="sub-title">电台</h3>
     <ul class="radio-list">
       <li>
         <div>
           <div class="radio-img-wrap rel">
             <img src="http://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg" class="cover-img" >
             <span class="icon-play"></span>
           </div>
           <p class="radio-name">电台</p>
         </div>
       </li>
       <li>
         <div>
           <div class="radio-img-wrap rel">
             <img src="http://y.gtimg.cn/music/photo_new/T002R300x300M000002WVOZ73U1VsE.jpg" class="cover-img" >
             <span class="icon-play"></span>
           </div>
           <p class="radio-name">乐活电台</p>
         </div>
       </li>

     </ul>
   </div>
   <div class="songList-wrap section-warp">
     <h3 class="sub-title">热门歌单</h3>
     <ul class="songList" >
       <li v-for="songListDesc in songListDesc">
        <div>
          <div class="song-list-img rel">
            <img :src="songListDesc.picUrl"class="list-img">
            <span class="icon-play"></span>
            </div>
         <p class="list-name">{{songListDesc.songListDesc}}</p>
        </div>
       </li>
     </ul>
   </div>
   <div class="more-info">
     <a href="" class="go2app">去客户端发现更多好音乐</a>
     <a href="" class="go2pc">查看电脑版网页</a>
     <img src="https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/logo_footer.png?max_age=19830212&d=20151105145423" alt="" class="logo">
     <p class="copy-right">write by star</p>
   </div>
 </div>
</template>
<script>
  import HeadComp from '../../header/header.vue'
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
  import {mapGetters} from 'vuex'
  export default{
      data(){
          return {
              sliderData:[],
              radioList:[],
              songListDesc:[]
          }
      },
    components:{
          HeadComp,swiper,swiperSlide
    },
    beforeMount(){

          this.$http.jsonp('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',{
              params:{
                  g_tk:5381,
                uin:0,
                format:'jsonp',
                inCharset:'utf-8',
                outCharset:'utf-8',
                notice:0,
                platform:'h5',
                needNewCode:1,
                _:new Date().getTime()
              },
            jsonp:'jsonpCallback'
          }).then(function(res){
              let slider = res.data.data.slider;
              for(let i =0;i<slider.length;i++){
                  this.sliderData.push({src:slider[i].picUrl,alt:slider[i].id, href:slider[i].linkUrl})
              }
              this.radioList=res.data.data.radioList;
              this.songListDesc = res.data.data.songList;
          })
    },
    mounted(){

    }
  }
</script>
<style lang="less">
  @import "index.less";
</style>

