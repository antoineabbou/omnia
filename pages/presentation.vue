<template>
  <section class="layout layout--presentation">
    <router-link to="/">
      <svg class="eye" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.15 50.62">
        <path class="pupille" d="M39,23.18a7.92,7.92,0,1,0,7.92,7.92A7.93,7.93,0,0,0,39,23.18Z" transform="translate(-2.43 -0.69)" style="fill:#2c62ff"/>
        <path
          id="oeil"
          d="M74.62,19.34a2,2,0,0,0-2.75.66l-4.64,7.55A38.4,38.4,0,0,0,57.48,17.3l3-7.58a2,2,0,0,0-3.72-1.46L54,15.13a31.91,31.91,0,0,0-13.18-3.9V2.69a2,2,0,1,0-4,0v8.53a31.81,31.81,0,0,0-12.64,3.49L21.68,8.26A2,2,0,1,0,18,9.72l2.78,7A38.14,38.14,0,0,0,10.49,27.09L6.13,20a2,2,0,1,0-3.41,2.09l6,9.82h0l.43.67h0C15.82,44.35,26.88,51.31,39,51.31s23.35-7.1,30-19l.29-.43,6-9.8A2,2,0,0,0,74.62,19.34ZM39,47.31c-10.55,0-20.27-6.13-26.19-16.45,6-9.86,15.62-15.71,25.9-15.71,10.48,0,20.2,6,26.2,16.2C59,41.37,49.35,47.31,39,47.31Z"
          transform="translate(-2.43 -0.69)"
          style="fill:#2c62ff"/>
      </svg>
    </router-link>
    <app-inactive/>
    <div class="overlay"> 
      <img :src="dataSrc" alt="phone"/>
    </div>

    <img class="cross" src="../static/assets/images/logos/cross.svg" alt="cross"/>

    <div class="content">
        <app-novlangue-toggle/>
      	<div class="content__inner" ref="vsSection">
			    <div class="grid"> 
            <div class="part part--left">
              <img class="image" ref="image" :class="{ resized: step === 2 }" v-show="step < 3" :src=src alt="image"/>
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
import AppInactive from '~/components/Inactive.vue'

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
    AppTranslator,
    AppInactive
    },
  data () {
    return {
      dataSrc: '',
      inactive: false,
      currentLanguage: 'french',
      step: 0,
      subtitle: 'Qu\'est-ce ?', 
      title: 'Omnia, <br> plus qu\'un univers, <br> une expérience.',
      sentence: 'N\'avez-vous jamais rêvé de vous immerger complètement dans l\'histoire que vous être en train de lire ? Mieux encore, d\'interagir avec celle-ci ? C\'est la pari risqué d\'Omnia, permettre une <span class="link" data-src="/assets/images/gif/personnage.gif">lecture interactive</span> qui donne envie. Destiné à des adolescents âgés de 12 à 17 ans, Omnia fait découvrir une nouvelle façon d\'appréhender la lecture. Prendre part à un nouvel univers avec l\'alliance d\'un livre, de prime abord normal, mais au final différent et une application mobile fonctionnant comme un <span class="link" data-src="/assets/images/gif/journal.gif">outil augmenté</span> de la lecture. ',
      src: '/assets/images/city.jpg'
    }
  },
  created () {
    this.easing = {
      cta: {
        x: 0,
        y: 0
      },
      eye: {
        x: 0, 
        y: 0
      } 
    } 
  },
  mounted () {
    this.links = this.$el.querySelectorAll('.paragraph .link')
    document.body.style.margin = "0px"

    this.engine = loop(this.loop)
    this.engine.start()
    
    this.step = 0

    this.bindAll()
    this.addListeners()
    this.$nextTick(this.onResize)
    this.startTimer(7000)


    this.btnFooter = (this.$el.querySelector('.footer .link'))
    this.about = this.$el.querySelector('.about')
    this.cross = this.$el.querySelector('.cross')
    this.btnFooter.addEventListener('click', this.showAbout)
    this.cross.addEventListener('click', this.hideAbout)
    this.staggerElements = this.$el.querySelectorAll('.stagger')

    this.btnNext = this.$el.querySelector('.btn--next')
    this.btnPrevious = this.$el.querySelector('.btn--previous')

    this.btnNext.addEventListener('click', this.goToNextStep)
    this.btnPrevious.addEventListener('click', this.goToPreviousStep)

    this.$nextTick(this.initAnimation)

    
  },

  methods: {

    loop (dt) {
      let mouseX = (((mousePosition[0] / window.innerWidth)) - 0.5) * 2
      let mouseY = (((mousePosition[1] / window.innerHeight)) - 0.5) * 2

      let ctaX = mouseX * 20
      let ctaY = mouseY * 20

      let eyeX = mouseX * 15
      let eyeY = mouseY * 3

      this.easing.cta.x += (ctaX - this.easing.cta.x) * 0.2
      this.easing.cta.y += (ctaY - this.easing.cta.y) * 0.2

      this.easing.eye.x += (eyeX - this.easing.eye.x) * 0.1
      this.easing.eye.y += (eyeY - this.easing.eye.y) * 0.1


      TweenLite.set(this.$refs.image, {
        x : this.easing.cta.x * 0.5,
        y : this.easing.cta.y * 0.5
      })

      TweenLite.set(this.$refs.circle, {
        x : this.easing.cta.x * 0.8,
        y : this.easing.cta.y * 0.8
      })

      TweenLite.set('.pupille', {
        x : this.easing.eye.x * 0.8,
        y : this.easing.eye.y * 0.8
      })

    },

    startTimer(time = 5000) {
      clearTimeout(this.timeoutID);
      Emitter.emit('GLOBAL:ACTIVE')
      this.timeoutID = setTimeout(() => {
        this.goInactive();
      }, time);
    },

    initAnimation() {
      this.initTimeline = new TimelineLite({
        onComplete: () => {
          clearProps: 'all'
        }
      })

      this.initTimeline.add('start')
      .to(['.image', '.part--right', '.novlangue-toggle', '.progress-bar', '.footer', '.eye'], 1, {
        opacity: 1,
        ease: Power4.easeOut
      }, 'start+=0.3')

    },

    goToNextStep () {

      this.goToNextStepTimeline = new TimelineLite({
        onComplete: () => {
          clearProps: 'all',
          this.links = this.$el.querySelectorAll('.paragraph .link')
          this.links.forEach((link) => {
            link.addEventListener('mouseover', this.showOverlay)
            link.addEventListener('mouseout', this.hideOverlay)
          })
        }
      })

      if(this.step === 2) {
        this.goToNextStepTimeline.to(this.$refs.circle, 0.1, {
          opacity: 0,
          ease: Power4.easeOut
        })
      }

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
          clearProps: 'all',
          this.links = this.$el.querySelectorAll('.paragraph .link')
          this.links.forEach((link) => {
            link.addEventListener('mouseover', this.showOverlay)
            link.addEventListener('mouseout', this.hideOverlay)
          })
        }
      })

      if(this.step === 2) {
        this.goToPreviousStepTimeline.to(this.$refs.circle, 0.1, {
          opacity: 0,
          ease: Power4.easeOut
        })
      }

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
      this.$el.querySelector('.content__inner').scrollTo(0, 0)
      switch (step) {
        case 0:


          if (!this.novlangue) {
            this.subtitle = 'QU\'EST-CE ?'
            this.title = 'Omnia, <br> plus qu\'un univers, <br> une expérience.',
            this.sentence = 'N\'avez-vous jamais rêvé de vous immerger complètement dans l\'histoire que vous être en train de lire ? Mieux encore, d\'interagir avec celle-ci ? C\'est le pari risqué d\'Omnia, permettre une <span data-src="/assets/images/gif/personnage.gif" class="link">lecture interactive</span> qui donne envie. Destiné à des adolescents âgés de 12 à 17 ans, Omnia fait découvrir une nouvelle façon d\'appréhender la lecture. Prendre part à un nouvel univers avec l\'alliance d\'un livre, de prime abord normal, mais au final différent et une application mobile fonctionnant comme un <span class="link" data-src="/assets/images/gif/journal.gif">outil augmenté</span> de la lecture. ',
            this.src ='/assets/images/city.jpg'
          } 

          if (this.novlangue) {
            this.subtitle = 'QU\'EST-CE ?',
            this.title = 'Omnia, <br> un nouveau monde. ',
            this.sentence = 'Plongez vous dans l\'univers de Big Brother et d\'Océania à travers l\'application Omnia. C\'est le <span class="bold-italic">parisqué </span> d\'Omnia, permettre une <span class="bold-italic"> lective </span> qui donne envie. Destiné à la jeunesse prometteuse entre 12 et 17 ans, Omnia vous fera aimer lire. Omnia est Outifort qui vous fera vivre une nouvelle expérience de lecture. ',
            this.src ='/assets/images/city.jpg'
          } 


          break;


        case 1:
          if (!this.novlangue) {
            this.subtitle = 'QU\'EST-CE ?'
            this.title = 'Omnia, <br/> le livre qui vous lie.'
            this.sentence = '<span data-src="/assets/images/gif/orwell.gif" class="link">1984 de George Orwell</span>, choix judicieux par rapport à l\'objectif : sensibiliser les adolescents à l\'usage de leurs données, mais surtout leur redonner le goût de la lecture. À l\'ère où les questions se posent sur l\'usage de nos données personnelles, à l\'ère où des lois sont votées pour nous protéger, à l\'ère où l\'utilisateur veut avoir le choix, nous ne pouvions pas trouver meilleur récit qui corresponde à ce thème si important à notre époque.'
            this.src = '/assets/images/book.jpg'
          }
          
          if (this.novlangue) {
            this.subtitle = 'QU\'EST-CE ?'
            this.title = 'Omnia, <br/> le livre liant.'
            this.sentence = '<span data-src="/assets/images/gif/orwell.gif" class="link">1984 de George Orwell</span>, grand auteur de son époque, n\'est pas un choix anodin. Il remplit l\'objectif : instruire la jeunesse à la gestion de ses <span class="bold-italic"> donnéespersos </span>. Les <span class="bold-italic"> donnéespersos </span> sont importantes et sont dorénavant protégées par des <span class="bold-italic">prolois</span>. Il s\'agit d\'un sujet sociétal actuel.',
            this.src ='/assets/images/book.jpg'
          } 
          break;

        case 2:

          if (!this.novlangue) {
            this.subtitle = 'QU\'EST-CE ?'
            this.title = 'Omnia, <br/> une nouvelle lecture.'
            this.sentence = 'Une façon ludique de lire un livre dit classique. Le choix des supports était primordial, ils se sont orientés instinctivement vers un smartphone et un livre. L\'idée est de faire vivre une expérience en facilitant son accès. L\'application Omnia va servir de guide à la lecture mais également <span data-src="/assets/images/gif/map.gif" class="link">d\'outil d\'exploration</span> de l\'univers. Avec son smartphone, l\'adolescent a toutes les clés en mains pour déchiffrer l\'histoire comme s\'il y était. '
            this.src = '/assets/images/phone.gif'
          } 

          if (this.novlangue) {
            this.subtitle = 'QU\'EST-CE ?'
            this.title = 'Omnia, <br/> une nouvelle lecture.'
            this.sentence = 'Une méthode de lecture approuvée par le Parti car classique. Une nouvelle expérience à portée de toutes les mains via un simple <span class="bold-italic">télécranportable</span> et un livre fourni par le <span class="bold-italic">Miniver</span>. Omnia vous <span data-src="/assets/images/gif/map.gif" class="link">guide</span> à travers l\'univers d\'Océania.',
            this.src ='/assets/images/phone.gif'
          } 

          break;
        case 3:
        
          if (!this.novlangue) {
            this.subtitle = 'QU\'EST-CE ?'
            this.title = 'Omnia, <br/> un nouveau langage.'
            this.sentence = 'Qui dit nouvel univers, dit nouveau langage. George Orwell, en écrivant 1984, a mis en place un nouveau système de communication appelé la novlangue. Il s\'agit de la langue officielle du monde d\'Oceania. Le principe est simple : plus on diminue le nombre de mots d\'une langue, plus on diminue le nombre de concepts avec lesquels les gens peuvent réfléchir, plus on réduit les finesses du langage, moins les gens sont capables de réfléchir, et plus ils raisonnent à l\'affect.  </br> Saurez-vous parler le novlangue ? <br/> Vous aussi, maîtrisez la novlangue :  <span class="bold-italic"> lective, donnéespersos, prolois, télécranportable, miniver, minilove, minipax, miniplein</span>...'
            this.src = null
          } 

          if (this.novlangue) {
            this.subtitle = 'QU\'EST-CE ?'
            this.title = 'Le novlangue, <br/> un langage taillé <br/> jusqu’à l’os.',
            this.sentence = 'Le novlangue est l’idiome officiel de l’Océania. Contrairement à <span class="bold-italic">l’ancilangue</span>, imprécise et bourrée de nuances superflues, le novlangue permet une pensée claire et lucide, fluidifiant la communication entre camarades. Il est le seul langage dont le dictionnaire rétrécit au fil des éditions, ce qui fait la fierté absolue de Big Brother, évidemment à l’origine de l’idée. <br> Vous aussi, maîtrisez la novlangue :  <span class="bold-italic"> lective, donnéespersos, prolois, télécranportable, miniver, minilove, minipax, miniplein</span>...',
            this.src = null
          } 

          break;
        default:
      }

    },

    showAbout() {
      this.$el.querySelector('.button-nav').style.display = 'none'
      this.$el.querySelector('.about').style.display = 'flex'
      this.showAboutTimeline = new TimelineLite({
        onComplete: () => {
          clearProps: 'all'
        }
      })

      if(window.innerWidth > 768 ) {
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
      } else {
        this.$el.querySelector('.grid .part--right').style.display = 'none'
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
          opacity: 1,
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

      } 
      
    },

    hideAbout() {
      this.$el.querySelector('.grid .part--right').style.display = 'flex'
      this.$el.querySelector('.button-nav').style.display = 'block'
      this.hideAboutTimeline = new TimelineLite({
        onComplete: () => {
          clearProps: 'all'
          this.$el.querySelector('.about').style.display = 'none'
        }
      })
      if(window.innerWidth > 768 ) {
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

      } else {
        this.hideAboutTimeline.add('start')

        .to('.cross', 0.75, {opacity: 0, ease: Expo.easeOut }, 'start')

        .to('.about', 0.75, {
          opacity: 0, 
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
      }
    
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
      this._startTimer = this.startTimer.bind(this, 7000);
      document.addEventListener("click", this._startTimer, false);
      document.addEventListener("touchstart", this._startTimer, false);
      document.addEventListener("touchend", this._startTimer, false);
      document.addEventListener("mousemove", this._startTimer, false);
      Emitter.on('GLOBAL:CHECKED', this.setLanguage)
      
    },

    goInactive () { 
      Emitter.emit('GLOBAL:INACTIVE')
    }, 

    showOverlay (e) {
      this.dataSrc = e.srcElement.getAttribute('data-src')
      this.$el.querySelector('.overlay').classList.add('visible')
    },

    hideOverlay () {
      this.$el.querySelector('.overlay').classList.remove('visible')
    },

    setLanguage () {
      this.novlangue = !this.novlangue
      this.getContent(this.step)
      this.links = this.$el.querySelectorAll('.paragraph .link')
        this.links.forEach((link) => {
          link.addEventListener('mouseover', this.showOverlay)
          link.addEventListener('mouseout', this.hideOverlay)
      })
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
      let layout = document.querySelector('.layout')
      document.body.style.height = window.innerHeight + 'px'
      layout.style.height = window.innerHeight + 'px'
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


.part--left
  margin-right 10px!important
  display flex!important
  align-items center!important
  position relative

  +For-tablet-only()
     width 0%!important
     margin 0 auto!important
     display none
  
  .translator
    +For-tablet-only()
      display none

  .image
    z-index 1
    opacity 0

    &.resized
      width 75%!important
      margin auto!important

  .circle
    position absolute
    top 0; right 0; left 0; bottom 0
    margin auto;
    z-index 0
    width 55%!important
    opacity 0

    +For-wide()
      width 55%!important

.part--right 
  margin-left 10px!important
  opacity 0

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
  cursor pointer 

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
  margin-left: -80px;
  margin-top: -80px;
  position: absolute;
  z-index: 10;
  display flex
  align-items center
  justify-content center
  opacity 0
  visibility hidden
  pointer-events none

  +For-wide()
    margin-left: -60px;
    margin-top: -60px;

  +For-tablet-only()
    width auto

  &.visible
    opacity 1
    visibility visible

  img
    width 30%

    +For-tablet-only() 
      width 80%

.eye
  opacity 0
  position absolute
  top 10px 
  left 0; right: 0; 
  margin auto
  height 40px

  +For-phone-only()
    display none
 
</style>
