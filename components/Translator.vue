<template>
    <div class="translator">
        <input class="input" ref="input" v-model="message" :placeholder="placeholder">
        <img class="icon icon--translate" ref="icon" src="../static/assets/images/logos/icon-translate.svg" alt="icon-translate">
        <p v-if="!typing" class="sentence"> {{ translatedMessage }} </p>
        <img class="typing" v-if="typing" src="../static/assets/images/gif/typing.gif"/>

    </div>
</template>

<script>

import {TweenMax, Power2, TimelineLite} from 'gsap'
import Emitter from '~/assets/js/utils/events'


export default {
  data () {
    return {
        message: '', 
        placeholder: 'Écrivez votre pensée novlangue',
        translatedMessage: 'Français',
        currentLanguage: 'novlangue', 
        novlangueArrayOfWords: ['miniver', 'minipax', 'minilove', 'miniplein', 'lective', 'donnéespersos', 'prolois', 'télécranportable'],
        frenchArrayOfWords: ['ministère de la vérité', 'ministère de la paix', 'ministère de l\'amour', 'ministère de l\'abondance', 'lecture interactive', 'données personnelles', 'lois pour le peuple', 'téléphone portable'],
        typing: false
    }
  },

  computed: {
  },

  props: [],

  created () {

  },

  mounted () {
    let input = this.$el.querySelector('.input')
    input.setAttribute('size', input.getAttribute('placeholder').length);

    this.addListeners()
  },

  methods: {
    addListeners() {
        this.$refs.icon.addEventListener('click', this.changeLanguage)
        this.$refs.input.addEventListener('keyup', this.checkWords)
    }, 

    checkWords() {
        if(this.message.length === 0) {
            this.typing = false
        }
        else if(this.message.toLowerCase() !== '' && this.message.length > 0) {
            this.typing = true
        }

        
        if(this.currentLanguage === 'novlangue') {
            for(let i = 0; i < this.novlangueArrayOfWords.length; i++) {
                if (this.message.toLowerCase() === this.novlangueArrayOfWords[i]) {
                    this.typing = false
                    this.translatedMessage = this.frenchArrayOfWords[i]
                }   
            }
        }

        if(this.currentLanguage === 'french') {
            for(let i = 0; i < this.frenchArrayOfWords.length; i++) {
                if (this.message.toLowerCase() === this.frenchArrayOfWords[i]) {
                    this.translatedMessage = this.novlangueArrayOfWords[i]
                }
            }
        }
    },

    changeLanguage() {
        if(this.currentLanguage === 'novlangue') { 
            this.currentLanguage = 'french'
            this.placeholder = 'Écrivez votre pensée française'
            this.translatedMessage = 'Novlangue'
        } else {
            this.currentLanguage = 'novlangue'
            this.placeholder = 'Écrivez votre pensée novlangue'
            this.translatedMessage = 'Français'
        }
        
    }
  },

  beforeDestroy () {

  }

}
</script>
<style lang="stylus" scoped>
.translator
    height 100%
    width 100%
    background color_blue
    display flex
    flex-direction column
    align-items center
    justify-content center

    .icon
        margin 40px 0px

        &:hover 
            cursor pointer
    
    .input
        font-family "circularmedium"
        font-size 20px
        background none
        border none
        outline none 
        text-align center
        color color_white
        
        &:first-letter
            text-transform capitalize
        
        &:focus
            outline none

        &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: rgba(255, 255, 255, 0.3);
            opacity: 1; /* Firefox */
        }

        &:-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: rgba(255, 255, 255, 0.3)
        }

        &::-ms-input-placeholder { /* Microsoft Edge */
            color: rgba(255, 255, 255, 0.3)
        }
    
    .sentence
        font-family "circularbook"
        font-size 20px
        color color_white

        &:first-letter
            text-transform capitalize

    .typing
        height 27px

</style>
