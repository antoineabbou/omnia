<template>
  <section class="layout layout--home">
    <app-header/>

    <div class="content">
      <div class="content__inner" ref="vsSection">
        <div class="text"> 
          <h1 class="title"> Bienvenue sur Omnia </h1>
          <img class="logo" src="../static/assets/svg/logo_omnia--white.svg" alt="logo"/>
          <p class="sentence"> Êtes-vous prêt à rentrer dans un nouveau monde ? </p>
        </div>
      </div>
      <a class="link"> Maintenir pour continuer </a>
    </div>


  </section>
</template>

<script>
if (process.browser) {
  var mousePosition = require('touch-position')()
  require('smooth-scrolling/smooth-scrolling')
  var MobileDetect = require('mobile-detect')
}

// Components
import AppFooter from '~/components/Footer.vue'
import AppHeader from '~/components/Header.vue'

// Libs
import {TweenMax, Power2, TimelineLite} from 'gsap'

const bpLarge = 999

export default {
  components: {
    AppFooter,
    AppHeader
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    this.bindAll()
    this.addListeners()
    this.$nextTick(this.onResize)
  },

  methods: {
    bindAll () {
      [
        'onResize'
      ].forEach((fn) => (this[fn] = this[fn].bind(this)))
    },

    addListeners () {
      window.addEventListener('resize', this.onResize)
    },

    removeListeners () {
      window.removeEventListener('resize', this.onResize)
    },

    initScroll () {
      if (this.smooth) return

      this.smooth = new Smooth({
        native: false,
        section: this.$refs.vsSection,
        ease: 0.1
      })
      this.smooth.extends = false
      this.$refs.vsSection.classList.add('vs-section')
      this.smooth.init()
    },

    removeScroll () {
      if (!this.smooth) return

      this.smooth.destroy()
      this.$refs.vsSection.style.transform = ''
      this.$refs.vsSection.style.webkitTransform = ''
      this.$refs.vsSection.classList.remove('vs-section')
      delete this.smooth
    },

    onResize () {
      this.isBpLarge = (window.innerWidth > bpLarge)

      if (this.isBpLarge) {
        this.initScroll()
      } else {
        this.removeScroll()
      }
    }

  },

  beforeDestroy () {
    this.smooth && this.smooth.destroy()
    this.removeListeners()
  }
}
</script>

<style lang="stylus">
.layout
  &&--home
    width 100vw 
    height 100vh
  
    .content 
      position relative
      width 100vw 
      height 100vh

      .content__inner
        position relative
        display flex
        align-items center 
        justify-content center 
        background color_blue
        border 80px solid color_white
        text-align center
        width 100vw 
        height 100vh

        .text
          .title
            font-size 36px 
            font-family "circularblack"
            color color_white 

          .logo
            width 250px 
            height auto 
            margin 60px 0px

          .sentence
            font-size 24px 
            font-family "circularbook"
            color white
            max-width 290px
            margin auto
        
      .link
        position absolute
        bottom 30px
        left 0; right 0;
        text-align center

</style>
