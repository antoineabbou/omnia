<template>
  <section class="layout layout--home">
    <app-header/>
    <app-loader v-show="!loaded && !this.mobile"/>

    <div class="content">
      <div class="content__inner" ref="vsSection">
        <div class="text"> 
          <h1 class="title stagger"> Bienvenue sur Omnia </h1>
          <img class="logo stagger" src="../static/assets/images/logos/logo-white.gif" alt="logo"/>
          <p class="sentence stagger"> Êtes-vous prêt à rentrer dans un nouveau monde ? </p>
        </div>
        <div class="press-bar"> </div>
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
  var PIXI = require('pixi.js')
}

// Components
import AppFooter from '~/components/Footer.vue'
import AppHeader from '~/components/Header.vue'
import AppLoader from '~/components/Loader.vue'

// Libs
import {TweenMax, Power2, TimelineLite} from 'gsap'
const bpLarge = 999

export default {
  components: {
    AppFooter,
    AppHeader,
    AppLoader
  },
  data () {
    return {
      loaded: false, 
      mobile: true
    }
  },
  created () {
  },
  mounted () {
    this.mobile = window.innerHeight <= 768
    setTimeout(() => {
      TweenMax.to('.loader__img', 0.2, {
        opacity: 0,
        onComplete: () => {
          this.loaded = true
          if(this.loaded) {
            this.width = 0
            this.node = this.$el.querySelector('.content')
            this.longpress = false;
            this.presstimer = null;
            this.longtarget = null;

            this.bindAll()
            this.addListeners()
            this.$nextTick(this.onResize)

            this.initAnimation()
          }
        }
      })
    }, 500);
    
  },

  methods: {
    
    initAnimation () {
      this.initTimeline = new TimelineLite()
      this.initTimeline.to(this.$refs.vsSection, 1, {
        width: '100%',
        ease: Expo.easeOut
      }, 'start')
      .to(this.$refs.vsSection, 1, {
        height: '100%',
        ease: Expo.easeOut
      }, 'start+=1')
      .staggerFrom('.stagger', 0.8, {
        opacity: 0, 
        cycle: {
          y: (i) => {
            return (i + 1) * 20
          }
        },
        ease: Power3.easeOut
      }, 0.2)
      .to('.link', 1, {
        opacity: 1, 
        ease: Expo.easeOut
      })
      
    }, 

    lastAnimation () {
      this.lastTimeline = new TimelineLite( { 
        delay: 0.1,
        onComplete: () => {
          setTimeout(() => {
            this.$router.push({ path: 'presentation' })  
          }, 400);
        }
      })
      this.lastTimeline.add('start')
      this.lastTimeline.to('.text', 1.3, {
        scale: 1.2, 
        opacity: 0,
        ease: Expo.easeOut
      }, 'start')
      .to(this.$refs.vsSection, 1.3, {
        opacity: 0, 
        ease: Expo.easeOut
      }, 'start')
      .to('.link', 1.3, {
        opacity: 0, 
        ease: Expo.easeOut
      }, 'start')
    },
    
    onKeyDown ( event ) {
    },

    onClick ( event ) {
      this.animate()
      this.pressing = true;
    },

    onRelease ( event ) {
      this.pressing = false;
    },




    bindAll () {
      [
        'onResize'
      ].forEach((fn) => (this[fn] = this[fn].bind(this)))
    },

    addListeners () {
      window.addEventListener('resize', this.onResize)

      this.node.addEventListener( 'mousedown', this.onClick, false );
      this.node.addEventListener( 'touchstart', this.onClick, false );
      this.node.addEventListener( 'mouseup', this.onRelease, false );
      this.node.addEventListener( 'touchend', this.onRelease, false );
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

      let layout = document.querySelector('.layout')
      layout.style.height = window.innerHeight + 'px'
    },

    animate() {

      // this.count += 0.005;

      // var blurAmount = Math.cos(this.count) ;
      // var blurAmount2 = Math.sin(this.count) ;


      // this.blurFilter1.blur = 20 * (blurAmount);
      // this.blurFilter2.blur = 20 * (blurAmount2);
      // this.renderer.render(this.stage);
      requestAnimationFrame( this.animate );

      this.render();
    },

    render() {
      if(this.pressing) {
        if(this.width < 100) {
          this.width += 2
        }
        if(this.width >= 100) {
          this.complete = true
          this.lastAnimation()
        } 
      } else { 
        if(this.width > 0 && !this.complete) this.width -= 2
      }
      TweenMax.to('.press-bar', 0, { width: this.width + '%'}   )
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
    cursor pointer!important
    width 100vw 
    height 100vh
  
    .content 
      position relative
      width 100% 
      height 100%

      .content__inner
        position absolute
        top 0
        bottom 0
        display flex
        align-items center 
        justify-content center 
        background color_blue
        text-align center 
        height 1px
        width 0px

        .text
          .title
            font-size 36px 
            font-family "circularblack"
            color color_white 

            +For-wide()
              font-size 30px

            +For-large()
              font-size 28px
            
            +For-phone-only()
              font-size 20px

          .logo
            width 250px 
            height auto 
            margin 60px 0px

            +For-wide()
              width 200px

            +For-large() 
              width 180px
            
            +For-phone-only()
              width 100px

          .sentence
            font-size 24px 
            font-family "circularbook"
            color white
            max-width 290px
            margin auto

            +For-wide()
              font-size 18px
            
            +For-large()
              font-size 16px
            
            +For-phone-only()
              max-width 150px
              font-size 14px
        
        .press-bar
          position absolute
          left 0; bottom 0;
          height 4px
          width 0
          background white
          
      .link
        position absolute
        opacity 0
        bottom -45px
        left 0; right 0;
        text-align center

        +For-wide()
          bottom -37px

</style>
