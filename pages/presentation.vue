<template>
  <section class="layout layout--presentation">
    <app-header/>

    <div class="content">
      	<div class="content__inner" ref="vsSection">
			<div class="grid"> 
				<div class="part part--left">
					<img src="../static/assets/images/city.jpg" alt="city"/>
				</div>

				<div class="part part--right">
					<app-paragraph> 
						<h3 class="subtitle"> Qu'est-ce ? </h3>
						<h1 class="title"> Omnia, <br> plus qu'un univers, <br> une expérience. </h1>
						<p class="sentence"> N'avez-vous jamais rêvé de vous immerger complètement dans l'histoire que vous être en train de lire ? Mieux encore, d'interagir avec celle-ci ? C'est la pari risqué d'Omnia, permettre une <span class="link"> lecture interactive </span> qui donne envie. Destiné à des adolescents âgés de 12 à 17 ans, Omnia fait découvrir une nouvelle façon d'appréhender la lecture. Prendre part à un nouvel univers avec l'alliance d'un livre, de prime abord normal, mais au final différent et une application mobile fonctionnant comme un <span class="link"> outil augmenté </span> de la lecture. </p>
					</app-paragraph>
					
					<app-button-nav/>
				</div>
			</div>
      	</div>
		<app-progress-bar/>
      	<app-footer/>
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
import AppParagraph from '~/components/Paragraph.vue'
import AppFooter from '~/components/Footer.vue'
import AppHeader from '~/components/Header.vue'
import AppButtonNav from '~/components/ButtonNav.vue'
import AppProgressBar from '~/components/ProgressBar.vue'

// Libs
import {TweenMax, Power2, TimelineLite} from 'gsap'

const bpLarge = 999

export default {
  components: {
    AppFooter,
    AppHeader,
	AppParagraph, 
	AppButtonNav,
	AppProgressBar
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
  &&--presentation
    width 100vw 
    height 100vh

    .content 
      	position relative
      	width 100vw 
      	height 100vh

		.content__inner
			position relative
			border 80px solid color_white
			width 100vw 
			height 100vh
			overflow hidden


			.grid
				display flex
				align-items center
				justify-content center
				height 100%

				.part
					width 50%
					height 100%
					position relative
					img
						width 100%
						height 100%

				.part--left
					margin-right 10px
					
				.part--right 
					margin-left 10px
            

</style>
