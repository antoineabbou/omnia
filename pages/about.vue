<template>
  <section class="layout layout--about">
    <div class="content">
      	<div class="content__inner" ref="vsSection">
			<div class="grid"> 
				<div class="part part--left">
					<h3 class="subtitle"> Qui ? </h3>
                    <h1 class="title"> À propos </h1>
                    <p class="sentence"> Nous sommes 5 étudiants en bachelor design et développement interactif à l’école des Gobelins. Nous avons imaginé et réalisé Omnia dans le cadre d’un projet de fin d’année ayant pour thématique : <br> 
                    <span class="sentence--bold">« Le livre du futur pour la jeunesse » </span> 
                    <br> <br> 
                    Omnia est pour nous un moyen de sensibiliser les jeunes à la lecture mais avant tout à l’utilisation de leurs données personnelles à travers le récit de George Orwell — 1984. </p>

                    <ul class="list list--names">
                        <li :key="index" v-for="(member, index) in members">
                            {{ member.name }} <span class="role"> - {{ member.function }} </span> 
                        </li>
                    </ul>

                    <p class="sentence sentence--bottom"> Si notre projet vous intéresse, n’hésitez pas à nous contacter pour en discuter ! </p>
				</div>

				<div class="part part--right">
				
				</div>
			</div>
      	</div>
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

// Libs
import {TweenMax, Power2, TimelineLite} from 'gsap'

const bpLarge = 999

export default {
  components: {
    },
  data () {
    return {
        members: [
            { 
                name: 'ABBOU Antoine',
                function: 'Presque développeur de map Unity',
                portfolio: 'http://antoineabbou.fr'
            },
            { 
                name: 'CORNIER Bastien',
                function: 'Directeur technique magique', 
                portfolio: 'https://bastiencornier.com/'
            },
            { 
                name: 'DUBOIS Elisa',
                function: 'Presque DA Digital',
                portfolio: 'http://elisadubois.fr/'
            },
            { 
                name: 'MINERVINI Robin',
                function: 'Master de la lampe torche',
                portfolio: 'http://www.robinminervini.fr/'
            },
            { 
                name: 'ROSTOUCHER Camille',
                function: 'Prêtresse du print',
                portfolio: 'http://www.camillerostoucher.fr/'
            }
        ]
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
  &&--about
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
        background color_blue
        padding 110px

        .grid
            display flex
            align-items center 
            justify-content center
            height 100%

            .part
                width 50%
                height 100%
                position relative

            .part--left
                margin-right 20px

                .subtitle 
                    text-transform uppercase
                    color color_grey_light
                    font-family "circularbook"
                    font-size 18px
                
                .title
                    font-family "circularblack"
                    color color_white
                    font-size 42px 
                    line-height 48px
                
                .sentence
                    margin-top 40px
                    color white
                    font-family "circularbook"
                    font-size 14px

                .sentence--bold
                    font-family "circularbold"
                
                
                .list
                    list-style-type none
                    color color_white
                    font-family "circularbook"
                    font-size 14px
                    padding 0
                    
                    li 
                        margin-top 40px

                        .role
                            font-size 12px
                            color color_grey_light


                .sentence--bottom 
                    position absolute 
                    bottom 0px
                    font-size 14px

                
            .part--right
                margin-left 20px
                    


</style>
