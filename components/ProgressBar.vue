<template>
  <div class="progress-bar">
        <div class="progress-wrap progress" data-progress-percent="25">
            <div class="progress-current progress"></div>
        </div>
  </div>
</template>

<script>

import {TweenMax, Power2, TimelineLite} from 'gsap'
import Emitter from '~/assets/js/utils/events'


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
    TweenMax.to('.progress-current', 1, {
        width: '25%',
        ease: Expo.easeOut
    })
    this.addListeners()
  },

  methods: {
    addListeners() {
        Emitter.on('GLOBAL:STEP', (step) => {
            this.step = step
            TweenMax.to('.progress-current', 1, {
                width: 25 + (this.step * 25) + '%',
                ease: Expo.easeOut
            })
        })
    }
  },

  beforeDestroy () {

  }

}
</script>
<style lang="stylus" scoped>
.progress-bar
    position absolute
    bottom -40px
    width 130px 
    left 0
    right 0
    margin auto

    +For-wide()
        bottom -35px

    +For-phone-only()
        right auto

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
            width 0%
    



</style>
