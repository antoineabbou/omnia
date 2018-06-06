<template>
  <section class="layout layout--presentation">
    <div class="overlay"> 
      <img src="../static/assets/images/phone.gif" alt="phone"/>
    </div>

    <img class="cross" src="../static/assets/images/logos/cross.svg" alt="cross"/>

    <div class="content">
        <app-novlangue-toggle/>
      	<div class="content__inner" ref="vsSection">
			    <div class="grid"> 
            <div class="part part--left">
              <img class="image" ref="image" v-show="step < 3" :src=src alt="image"/>
              <img class="circle" ref="circle" v-show="step === 2" src="../static/assets/images/circle.png" alt="circle"/>

              <app-translator v-show="step===3"/>
            </div>

            <div class="part part--right">
              <app-paragraph> 
                <h3 class="subtitle" v-html="subtitle">  </h3>
                <h1 class="title" v-html="title"> </h1>
                <p class="sentence" v-html="sentence"> </p>
              </app-paragraph>
              
              <app-button-nav/>
            </div>
          </div>
          <app-about/>
        </div>
        <div class="bottom-nav">
          <app-progress-bar/>
      	  <app-footer/>
        </div>
        
    </div>


  </section>
</template>

<script>
if (process.browser) {
  var mousePosition = require('touch-position')()
  // require('smooth-scrolling/smooth-scrolling')
  var MobileDetect = require('mobile-detect')
  var loop = require('raf-loop')
}

import Emitter from '~/assets/js/utils/events'

// Components
import AppParagraph from '~/components/Paragraph.vue'
import AppFooter from '~/components/Footer.vue'
import AppHeader from '~/components/Header.vue'
import AppButtonNav from '~/components/ButtonNav.vue'
import AppProgressBar from '~/components/ProgressBar.vue'
import AppAbout from '~/components/About.vue'
import AppNovlangueToggle from '~/components/NovlangueToggle.vue'
import AppTranslator from '~/components/Translator.vue'

// Libs
import {TweenMax, Power2, TimelineLite} from 'gsap'

const bpLarge = 999

export default {
  components: {
    AppFooter,
    AppHeader,
    AppParagraph, 
    AppButtonNav,
    AppProgressBar,
    AppAbout,
    AppNovlangueToggle,
    AppTranslator
    },
  data () {
    return {
      currentLanguage: 'french',
      step: 0,
      subtitle: 'Qu\'est-ce ?', 
      title: 'Omnia, <br> plus qu\'un univers, <br> une expérience.',
      sentence: 'N\'avez-vous jamais rêvé de vous immerger complètement dans l\'histoire que vous être en train de lire ? Mieux encore, d\'interagir avec celle-ci ? C\'est la pari risqué d\'Omnia, permettre une <span class="link"> lecture interactive </span> qui donne envie. Destiné à des adolescents âgés de 12 à 17 ans, Omnia fait découvrir une nouvelle façon d\'appréhender la lecture. Prendre part à un nouvel univers avec l\'alliance d\'un livre, de prime abord normal, mais au final différent et une application mobile fonctionnant comme un <span class="link"> outil augmenté </span> de la lecture. ',
      src: '/assets/images/city.jpg'
    }
  },
  created () {
    this.easing = {
      cta: {
        x: 0,
        y: 0
      }
    } 
  },
  mounted () {
    this.links = this.$el.querySelectorAll('.link')
    document.body.style.margin = "0px"
    this.engine = loop(this.loop)
    this.engine.start()
    
    this.step = 0

    this.bindAll()
    this.addListeners()
    this.$nextTick(this.onResize)

    this.btnFooter = (this.$el.querySelector('.footer .link'))
    this.about = this.$el.querySelector('.about')
    this.cross = this.$el.querySelector('.cross')
    this.btnFooter.addEventListener('click', this.showAbout)
    this.cross.addEventListener('click', this.hideAbout)
    this.staggerElements = this.$el.querySelectorAll('.stagger')

    this.btnNext = this.$el.querySelector('.btn--next')
    this.btnPrevious = this.$el.querySelector('.btn--previous')
    console.log(this.btnNext)

    this.btnNext.addEventListener('click', this.goToNextStep)
    this.btnPrevious.addEventListener('click', this.goToPreviousStep)
  },

  methods: {

    loop (dt) {
      let mouseX = (((mousePosition[0] / window.innerWidth)) - 0.5) * 2
      let mouseY = (((mousePosition[1] / window.innerHeight)) - 0.5) * 2

      let ctaX = mouseX * 20
      let ctaY = mouseY * 20

      this.easing.cta.x += (ctaX - this.easing.cta.x) * 0.2
      this.easing.cta.y += (ctaY - this.easing.cta.y) * 0.2


      TweenLite.set(this.$refs.image, {
        x : this.easing.cta.x * 0.5,
        y : this.easing.cta.y * 0.5
      })

      TweenLite.set(this.$refs.circle, {
        x : this.easing.cta.x * 0.8,
        y : this.easing.cta.y * 0.8
      })

    },

    goToNextStep () {

      this.goToNextStepTimeline = new TimelineLite({
        onComplete: () => {
          clearProps: 'all'
        }
      })

      if(this.step === 2) {
        this.goToNextStepTimeline.to(this.$refs.circle, 0.1, {
          opacity: 0,
          ease: Power4.easeOut
        })
      }

      console.log(this.step)
      this.goToNextStepTimeline.add('start')
      .to('.image', 0.75, {
        yPercent: 100,
        ease: Power4.easeOut
      }, 'start')

      .to('.part--right', 0.75, {
        yPercent: -100,
        ease: Power4.easeOut
      }, 'start')

      if(this.step === 2) {
        this.goToNextStepTimeline.from(this.$el.querySelector('.translator'), 0.75, {
          yPercent: 100,
          ease: Power4.easeOut
        }, 'start+=1')
      }


      setTimeout(() => {
        this.step ++
        this.getContent(this.step)
        if (this.step%2 == 0) {
          this.$el.querySelector('.grid').style.flexDirection = "row"
        } else {
          this.$el.querySelector('.grid').style.flexDirection = "row-reverse"
        }
      }, 700);


      this.goToNextStepTimeline.to('.image', 0.75, {
        yPercent: 0,
        ease: Power4.easeOut
      }, 'start+=1')

      if(this.step === 1) {
        this.goToNextStepTimeline.to(this.$refs.circle, 0.75, {
          opacity: 1,
          ease: Power4.easeOut
        }, 'start+=1.6')
      }

      

      this.goToNextStepTimeline.to('.part--right', 0.75, {
        yPercent: 0,
        ease: Power4.easeOut
      }, 'start+=1')


      
    },
    
    goToPreviousStep () {
      this.goToPreviousStepTimeline = new TimelineLite({
        onComplete: () => {
          clearProps: 'all'
        }
      })
      this.goToPreviousStepTimeline.add('start')
      .to('.image', 0.75, {
        yPercent: 100,
        ease: Power4.easeOut
      }, 'start')

      .to('.part--right', 0.75, {
        yPercent: -100,
        ease: Power4.easeOut
      }, 'start')

      setTimeout(() => {
        this.step --
        this.getContent(this.step)
        if (this.step%2 == 0) {
          this.$el.querySelector('.grid').style.flexDirection = "row"
        } else {
          this.$el.querySelector('.grid').style.flexDirection = "row-reverse"
        }
      }, 700);


      this.goToPreviousStepTimeline.to('.image', 0.75, {
        yPercent: 0,
        ease: Power4.easeOut
      }, 'start+=1')

      .to('.part--right', 0.75, {
        yPercent: 0,
        ease: Power4.easeOut
      }, 'start+=1')


      
    },

    getContent(step) {
      Emitter.emit('GLOBAL:STEP', this.step)
      switch (step) {
        case 0:


          if (!this.novlangue) {
            this.subtitle = 'QU\'EST-CE ?'
            this.title = 'Omnia, <br> plus qu\'un univers, <br> une expérience.',
            this.sentence = 'N\'avez-vous jamais rêvé de vous immerger complètement dans l\'histoire que vous être en train de lire ? Mieux encore, d\'interagir avec celle-ci ? C\'est la pari risqué d\'Omnia, permettre une <span class="link"> lecture interactive </span> qui donne envie. Destiné à des adolescents âgés de 12 à 17 ans, Omnia fait découvrir une nouvelle façon d\'appréhender la lecture. Prendre part à un nouvel univers avec l\'alliance d\'un livre, de prime abord normal, mais au final différent et une application mobile fonctionnant comme un <span class="link"> outil augmenté </span> de la lecture. ',
            this.src ='/assets/images/city.jpg'
          } 

          if (this.novlangue) {
            this.subtitle = 'LOREM'
            this.title = 'IPSUM DOLOR SIT',
            this.sentence = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            this.src ='/assets/images/city.jpg'
          } 


          break;


        case 1:
          if (!this.novlangue) {
            this.subtitle = 'QU\'EST-CE ?'
            this.title = 'Omnia, <br/> le livre qui vous lie.'
            this.sentence = '<span class="link">1984 de George Orwell </span> nous paraissait un choix judicieux par rapport à notre objectif : sensibiliser les adolescents à l\'usage de leurs données, mais surtout leur redonner le goût de la lecture. À l\'ère où les questions se posent sur l\'usage de nos données personnelles, à l\'ère où <span class="link"> des lois sont votées </span> pour nous protéger, à l\'ère où l\'utilisateur veut avoir le choix, nous ne pouvions pas trouver meilleur récit qui corresponde à ce thème si important à notre époque.'
            this.src = '/assets/images/book.jpg'
          }
          
          if (this.novlangue) {
            this.subtitle = 'LOREM'
            this.title = 'IPSUM DOLOR SIT',
            this.sentence = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            this.src ='/assets/images/book.jpg'
          } 
          break;

        case 2:

          if (!this.novlangue) {
            this.subtitle = 'QU\'EST-CE ?'
            this.title = 'Omnia, <br/> une nouvelle lecture.'
            this.sentence = 'Une façon ludique de lire un livre dit classique. Tous les adolescents d\'aujourd\'hui sont à l\'aise avec les usages des smartphones, c\'est pourquoi le choix de deux objets simples était primordial. L\'idée est de faire vivre une expérience en facilitant son accès. L\'application Omnia va servir de guide à la lecture mais également <span class="link"> d\'outil d\'exploration </span> de l\'univers. Avec son smartphone, l\'adolescent a toutes les clés en mains pour déchiffrer l\'histoire comme s\'il y était.'
            this.src = '/assets/images/phone.gif'
          } 

          if (this.novlangue) {
            this.subtitle = 'LOREM'
            this.title = 'IPSUM DOLOR SIT',
            this.sentence = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            this.src ='/assets/images/phone.gif'
          } 

          break;
        case 3:
        
          if (!this.novlangue) {
            this.subtitle = 'QU\'EST-CE ?'
            this.title = 'Omnia, <br/> un nouveau langage.'
            this.sentence = 'Qui dit nouvel univers, dit nouveau langage. George Orwell, en écrivant 1984, a mis en place un nouveau système de communication appelé la novlangue. Il s\'agit de la langue officielle du monde d\'Oceania. Le principe est simple : plus on diminue le nombre de mots d\'une langue, plus on diminue le nombre de concepts avec lesquels les gens peuvent réfléchir, plus on réduit les finesses du langage, moins les gens sont capables de réfléchir, et plus ils raisonnent à l\'affect.  </br> Saurez-vous parler le novlangue ?'
            this.src = null
          } 

          if (this.novlangue) {
            this.subtitle = 'LOREM'
            this.title = 'IPSUM DOLOR SIT',
            this.sentence = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            this.src = null
          } 

          break;
        default:
          console.log('Sorry, we are out of ' + step + '.');
      }

    },

    showAbout() {
      this.$el.querySelector('.about').style.display = 'flex'
      this.showAboutTimeline = new TimelineLite({
        onComplete: () => {
          clearProps: 'all'
        }
      })
      this.showAboutTimeline.add('start')
      .to(this.$el.querySelector('.novlangue-toggle'), 0.75, {
        opacity: 0,
        ease: Expo.easeOut
      })

      .to('.bottom-nav', 0.75, {
        opacity: 0,
        ease: Expo.easeOut
      }, 'start')
      .to('.about', 0.75, {
        yPercent: -100,
        ease: Power4.easeOut
      }, 'start')
      .staggerFrom(this.staggerElements, 1.2, {
        cycle: {
          y: (i) => {
            return (i + 1) * 20
          }
        },
        alpha: 0,
        ease: Expo.easeOut,
        clearProps: 'opacity'
      }, 0.1)
      .to('.cross', 0.75, {
        opacity: 1
      })
      
    },

    hideAbout() {
      this.hideAboutTimeline = new TimelineLite({
        onComplete: () => {
          this.$el.querySelector('.about').style.display = 'none'
        }
      })
      this.hideAboutTimeline.add('start')

      .to('.cross', 0.75, {opacity: 0, ease: Expo.easeOut }, 'start')

      .to('.about', 0.75, {
        yPercent: 0, 
        ease: Power4.easeOut
      }, 'start')

      .to('.bottom-nav', 0.75, {
        opacity: 1,
        ease: Expo.easeOut
      }, 'end')

      .to(this.$el.querySelector('.novlangue-toggle'), 0.75, {
        opacity: 1,
        ease: Expo.easeOut
      }, 'end')
    
    },

    bindAll () {
      [
        'onResize',
        'loop'
      ].forEach((fn) => (this[fn] = this[fn].bind(this)))
    },

    addListeners () {
      window.addEventListener('resize', this.onResize)
      this.links.forEach((link) => {
        link.addEventListener('mouseover', this.showOverlay)
        link.addEventListener('mouseout', this.hideOverlay)
      })
      Emitter.on('GLOBAL:CHECKED', this.setLanguage)
      
    },

    showOverlay () {
      this.$el.querySelector('.overlay').classList.add('visible')
    },

    hideOverlay () {
      this.$el.querySelector('.overlay').classList.remove('visible')
    },

    setLanguage () {
      this.novlangue = !this.novlangue
      this.getContent(this.step)
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

      // if (this.isBpLarge) {
      //   this.initScroll()
      // } else {
      //   this.removeScroll()
      // }
    }

  },

  beforeDestroy () {
    this.smooth && this.smooth.destroy()
    this.removeListeners()
  }
}
</script>

<style lang="stylus" scoped>
.layout
  &&--presentation
    width 100vw 
    height 100vh

    .content 
      	position relative
      	width 100%
      	height 100%

		.content__inner
			position relative
			width 100%
			height 100%
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
						// height 100%


.part--left
  margin-right 10px!important
  display flex!important
  align-items center!important
  position relative

  +For-tablet-only()
     width 0%!important
     margin 0 auto!important

  .image
    z-index 1

  .circle
    position absolute
    top 0; right 0; left 0; bottom 0
    margin auto;
    z-index 0
    width 70%!important
    opacity 0

    +For-wide()
      width 55%!important

.part--right 
  margin-left 10px!important

  +For-tablet-only()
     width 100%!important
     margin 0 auto!important
     display flex
     align-items center
     justify-content center
     flex-direction column


.cross 
  position absolute
  z-index 2
  bottom 30px
  left 0
  right 0
  margin auto
  opacity 0

  +For-wide()
    bottom 20px


.grid
  +For-phone-only()
    display block!important
    height auto!important

.content__inner 
  +For-phone-only()
    overflow scroll!important



.overlay
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  margin-left: -60px;
  margin-top: -60px;
  position: absolute;
  z-index: 10;
  display flex
  align-items center
  justify-content center
  opacity 0
  visibility hidden
  pointer-events none

  &.visible
    opacity 1
    visibility visible

  img
    width 30%
</style>
