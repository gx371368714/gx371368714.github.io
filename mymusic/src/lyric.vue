<template>

  <p :data-time=lyc.time :class='{"lyc-active":index==lines}' >{{lyc.lyc}}</p>



</template>

<script>
  export default {
    props: {
      lyc: {
        type: Object,
        default: {}
      },
      index: {
        type: Number,
        default: {}
      },
      lines:Number

    },
    methods: {

    }
  }

</script>
<style lang="less">
  .lyc-active{
    color: #31c27c;
  }

</style>
