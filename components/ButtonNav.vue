<template>
  <div class="button-nav">
    <div class="button-nav--steps" v-show="step!==3">
        <button v-show="step > 0" class="btn btn--previous"> Précédent </button>
        <button class="btn btn--next"> Suivant </button>
    </div>
    
    <div class="button-nav--cta" v-show="step===3">
        <button v-show="step > 0" class="btn btn--previous"> Acheter Omnia </button>
        <button class="btn btn--next"> Télécharger l'application </button>
    </div>


      
  </div>
</template>

<script>
import Emitter from '~/assets/js/utils/events'

export default {
  data () {
    return {
        step: 0
    }
  },

  created () {

  },

  mounted () {
      this.addListeners()
  },

  methods: {
      addListeners() {
        Emitter.on('GLOBAL:STEP', (step) => {
            this.step = step
        })
      }
    
  },

  beforeDestroy () {

  }


}
</script>
<style lang="stylus" scoped>
    .button-nav
        position absolute
        bottom 100px
        left 70px

        +For-wide()
            bottom 30px
            left 30px
            
        
        +For-large()
            bottom 50px 
    
        
        +For-tablet-only()
            position static
            align-self flex-start
            margin-top 30px

        +For-phone-only()
            // padding-bottom 30px
        
        .btn--previous
            margin-right 20px

        .btn--previous, .btn--next
            +For-s-phone-only()
                margin-top 10px
        
        &--cta
            .btn
                &--previous
                    background-color color_blue
                    color color_white
                    opacity 1
                    border none
                &--next
                    background-color rgba(44, 98, 255, 0.3)
                    border none
                    color color_blue

                    +For-s-phone-only()
                        margin-top 10px
</style>
