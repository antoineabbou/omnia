<template>
    <div class="loader"> 
        <img class="loader__img" src="../static/assets/images/logo.gif" alt="loader"/>
    </div>
     
</template>

<script>

// Libs
import {TweenMax, Power2, TimelineLite} from 'gsap'

const bpLarge = 999

export default {
  components: {
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
    }

  },

  beforeDestroy () {
    this.smooth && this.smooth.destroy()
    this.removeListeners()
  }
}
</script>

<style lang="stylus" scoped>
.loader
    position absolute
    top 0; left 0; right 0; bottom 0
    width 100vw
    height 100vh
    background color_white
    z-index 1000

    &__img
        width 100px
        position absolute 
        left 0 
        right 0 
        top 0 
        bottom 0
        margin auto
                    


</style>
