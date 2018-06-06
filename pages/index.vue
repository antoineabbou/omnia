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
  var PIXI = require('pixi.js')
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
    this.value = 0
    this.node = this.$el.querySelector('.link')
    this.longpress = false;
    this.presstimer = null;
    this.longtarget = null;


    this.bindAll()
    this.addListeners()
    this.$nextTick(this.onResize)
    console.log(PIXI)
    // this.renderer = PIXI.autoDetectRenderer(800, 600);
    // document.body.appendChild(this.renderer.view);
    // this.renderer.view.style.position = 'absolute'
    // this.renderer.view.style.top = 0

    // this.stage = new PIXI.Container();

    // var bg = PIXI.Sprite.fromImage('/assets/images/city.jpg');
    // bg.width = this.renderer.width;
    // bg.height = this.renderer.height;
    // this.stage.addChild(bg);

    // var littleDudes = PIXI.Sprite.fromImage('/assets/images/city.jpg');
    // littleDudes.position.x = (this.renderer.width / 2) - 315;
    // littleDudes.position.y = 200;
    // this.stage.addChild(littleDudes);

    // var littleRobot = PIXI.Sprite.fromImage('/assets/images/city.jpg');
    // littleRobot.position.x = (this.renderer.width / 2) - 200;
    // littleRobot.position.y = 100;
    // this.stage.addChild(littleRobot);

    // this.blurFilter1 = new PIXI.filters.BlurFilter();
    // this.blurFilter2 = new PIXI.filters.BlurFilter();

    // littleDudes.filters = [this.blurFilter1];
    // littleRobot.filters = [this.blurFilter2];

    // this.count = 0;

    // requestAnimationFrame(this.animate);


    
  },

  methods: {
    onKeyDown ( event ) {
      console.log("keydown");
    },

    onClick ( event ) {
      this.animate()
      console.log("click");
      this.pressing = true;
    },

    onRelease ( event ) {
      console.log("release");
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
        if (this.value < 2) {
          this.value += 0.01
          console.log(this.value)
        }
      } else {
        if (this.value > 0) {
          this.value -= 0.01
          console.log(this.value)
        }
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
      width 100% 
      height 100%

      .content__inner
        position relative
        display flex
        align-items center 
        justify-content center 
        background color_blue
        text-align center 
        height 100%

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
        
      .link
        position absolute
        bottom -45px
        left 0; right 0;
        text-align center

        +For-wide()
          bottom -37px

</style>
