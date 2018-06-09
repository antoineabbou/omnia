<template>
    <div class="about"> 
        <div class="part part--left">
            <h3 class="stagger subtitle"> Qui ? </h3>
            <h1 class="stagger title"> À propos </h1>
            <p class="stagger sentence"> Nous sommes 5 étudiants en bachelor design et développement interactif à Gobelins, l'école de l'image. Nous avons imaginé et réalisé Omnia dans le cadre d’un projet de fin d’année ayant pour thématique : <br> 
            <span class="stagger sentence--bold">« Le livre du futur pour la jeunesse » </span> 
            <br> <br> 
            Omnia est pour nous un moyen de sensibiliser les jeunes à la lecture mais avant tout à l’utilisation de leurs données personnelles à travers le récit de George Orwell — 1984. </p>

            <ul class="stagger list list--names">
                <li :key="index" v-for="(member, index) in members">
                    <a class="link" target="_blank" :href="member.portfolio"> {{ member.name }} </a> <span class="role"> - {{ member.function }} </span> 
                </li>
            </ul>

            <p class="stagger sentence sentence--bottom"> Si notre projet vous intéresse, n’hésitez pas à nous contacter pour en discuter ! </p>
        </div>

        <div class="part part--right">
            <div class="test stagger">
                <div class="logos"> 
                    <a href="https://gobelins.fr" target="_blank">
                        <img class="logo logo--gobelins" src="../static/assets/images/logos/gobelins.svg" alt="Gobelins"/> 
                    </a>
                    <p class="sentence"> une école de la </p>
                    <a href="http://www.cci-paris-idf.fr/" target="_blank">
                        <img class="logo logo--cci" src="../static/assets/images/logos/logo_cci.svg" alt="CCI"/>
                    </a>
                </div>
                <p class="sentence"> Nous remercions l’ensemble de l’équipe pédagogique de Gobelins, l'école de l'image, pour leurs conseils et accompagnements  qui a permis au projet Omnia de voir le jour ! </p>
            </div>
        </div>
    </div>
     
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
                function: 'Architecte AR - Développeur',
                portfolio: 'http://antoineabbou.fr'
            },
            { 
                name: 'CORNIER Bastien',
                function: 'Chief happiness officer - Développeur', 
                portfolio: 'https://bastiencornier.com/'
            },
            { 
                name: 'DUBOIS Elisa',
                function: 'Manager des internets et du digital - UI/UX designer - DA',
                portfolio: 'http://elisadubois.fr/'
            },
            { 
                name: 'MINERVINI Robin',
                function: 'Fils de Steve Jobs - Développeur',
                portfolio: 'http://www.robinminervini.fr/'
            },
            { 
                name: 'ROSTOUCHER Camille',
                function: 'Pretresse du print et de l\'illustration - Designer graphique',
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
    .content__inner
        .about
            background color_blue
            display none
            // align-items center 
            // justify-content center
            height 100%
            padding 100px
            position relative
            z-index 2

            +For-wide()
                padding 50px
            
            +For-tablet-only()
                position absolute
                top 0 
                left 0
                opacity 0
                padding 70px
                flex-direction column
                overflow scroll

                +For-phone-only()
                    padding 30px 

            .part
                width 50%
                height 100%
                position relative
                
                +For-tablet-only()
                    width 100%
                    height auto

            .part--left
                margin-right 20px

                +For-tablet-only()
                    margin-right 0px

                .subtitle 
                    text-transform uppercase
                    color color_grey_light
                    font-family "circularbook"
                    font-size 18px
                    
                    +For-wide()
                        font-size 14px
                    
                    +For-tablet-only()
                        font-size 18px 
                    
                    +For-phone-only()
                        font-size 14px

                .title
                    font-family "circularblack"
                    color color_white
                    font-size 42px 
                    line-height 48px

                    +For-wide()
                        font-size 36px
                        line-height 42px

                    +For-tablet-only()
                        font-size 42px
                        line-height 48px
                    
                    +For-phone-only()
                        font-size 36px
                        line-height 42px

                
                .sentence
                    margin-top 40px
                    color white
                    font-family "circularbook"
                    font-size 14px

                    +For-wide()
                        margin-top 20px
                        font-size 13px

                    +For-tablet-only()
                        font-size 14px
                    
                    +For-phone-only()
                        font-size 13px

                .sentence--bold
                    font-family "circularbold"
                
                
                .list
                    list-style-type none
                    color color_white
                    font-family "circularbook"
                    font-size 14px
                    padding 0
                    
                    +For-wide()
                        font-size 13px
                    
                    +For-tablet-only()
                        font-size 14px
                    
                    li 
                        margin-top 40px

                        +For-wide()
                            margin-top 20px
                        
                        .link
                            color color_white
                            text-decoration none

                        .role
                            font-size 12px
                            color color_grey_light


                .sentence--bottom 
                    position absolute 
                    bottom 0px
                    font-size 14px

                    +For-wide()
                        font-size 13px

                    +For-tablet-only()
                        position static
                        margin-top 30px
                        font-size 14px

                    +For-phone-only()
                        font-size 13px

                
            .part--right
                margin-left 150px
                display flex
                align-items flex-end

                +For-tablet-only()
                    display block
                    margin-left 0px
                    margin-top 50px
                

                .sentence
                    font-size 14px
                    font-family "circularbook"
                    color color_white
                    margin-top 30px

                    +For-wide()
                        font-size 13px
                    
                    +For-tablet-only()
                        font-size 14px

                    +For-phone-only()
                        font-size 13px

                
                .logos
                    display flex
                    align-items center

                    +For-phone-only() 
                        flex-direction column

                    .logo
                        &--gobelins
                            max-width 100px
                        &--cci 
                            max-width 160px

                    .sentence
                        margin 0px 25px

                        +For-phone-only()
                            margin 10px auto


                    


</style>
