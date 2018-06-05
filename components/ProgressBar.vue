<template>
  <div class="progress-bar">
        <div class="progress-wrap progress" data-progress-percent="25">
            <div class="progress-current progress"></div>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  computed: {
  },

  props: [],

  created () {

  },

  mounted () {

  },

  beforeDestroy () {

  }

}
</script>
<style lang="stylus" scoped>
.progress-bar
    position absolute
    bottom 30px
    width 130px 
    left 0
    right 0
    margin auto
    .progress 
        width 100%
        height 3px

    .progress-wrap 
        background color_grey_light
        overflow hidden
        position relative

        .progress-current 
            background color_blue
            left 0
            position absolute
            top 0
            width 25%
    



</style>
