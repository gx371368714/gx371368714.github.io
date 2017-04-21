<template>
  <div>
    <head-comp></head-comp>
    <div class="rank-wrap">
      <template v-for="list in topList">
        <router-link :to="{name: 'ListDetail', params: {id: list.id}}" class="">
          <div class="top-img-wrap rel">
            <img :src="list.picUrl" alt="" class="top-img">
            <p class="nowrap">{{list.listenCount | smaller}}</p>
          </div>
          <div class="top-summary rel">
            <h3>{{list.topTitle}}</h3>
            <template v-for='(item, index) in list.songList'>
              <p><span>{{index + 1}}</span>&nbsp; {{item.songname}}&nbsp;<span>-&nbsp;{{item.singername}}</span></p>
            </template>
            <i class="icon icon-arrow"></i>
          </div>
        </router-link>
      </template>
    </div>
    <a href="" class="link2client">去客户端发现更多好音乐&gt;</a>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeadComp from '../../header/header.vue'
//https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&format=jsonp&key=1&g_tk=5381&jsonpCallback=SmartboxKeysCallbackmod_top_search8961&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0
  export default {
    data () {
      return {
        topList: []
      }
    },
    components: {
      HeadComp
    },
    filters: {
      smaller: function (num) {
        if (num) {

          return (num/10000).toFixed(1) + '万'
        }
      }
    },
    beforeMount () {
      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
        params: {
          g_tk: 5381,
          uin: 0,
          format: 'jsonp',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1,
          _: new Date().getTime()
        },
        jsonp: 'jsonpCallback'
      }).then(function (response) {
          console.log(response)
        this.topList = response.body.data.topList;
      })
    }
  }
</script>
<style lang="less">
  @import "index.less";
</style>
