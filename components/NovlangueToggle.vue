<template>
    <div class="novlangue-toggle">
        <p class="sentence"> Français </p>
        <div class="toggle-button">
            <div class="checkbox">
                <input ref="toggleNovlangue" type="checkbox"/>
                <label></label>
            </div>
        </div>
        <p class="sentence"> Novlangue </p>
    </div>
</template>

<script>
import Emitter from '~/assets/js/utils/events'

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
    this.addListeners()
    console.log(this.$refs.toggleNovlangue)
  },

  methods: {
    addListeners() {
        this.$refs.toggleNovlangue.addEventListener('click', this.toggleAction)
    }, 

    toggleAction() {
        if(this.$refs.toggleNovlangue.checked) {
            Emitter.emit('GLOBAL:CHECKED')
        } else {
            Emitter.emit('GLOBAL:UNCHECKED')
        }
    }
  },

  beforeDestroy () {

  }

}
</script>
<style lang="stylus" scoped>


.novlangue-toggle
    display flex
    position absolute
    top 30px 
    right 75px
    .sentence
        font-family "circularbook"
        font-size 14px
        color color_black
    .checkbox
        position relative
        display inline-block
        margin 0px 10px
        label
            width 25px
            height 16px
            background #ccc
            position relative
            display inline-block
            border-radius 46px
            transition 0.2s
            &:after
                content ''
                position absolute
                width 10px
                height 10px
                border-radius 100%
                left 0
                top -5px
                z-index 2
                background #fff
                box-shadow 0 0 5px rgba(0, 0, 0, 0.2)
                transition 0.2s
        input
            position absolute
            left 0
            top 0
            width 100%
            height 100%
            z-index 5
            opacity 0
            cursor pointer
            &:hover
                & + label
                    &:after
                        box-shadow 0 2px 15px 0 rgba(0, 0, 0, 0.2), 0 3px 8px 0 rgba(0, 0, 0, 0.15)
            &:checked
                & + label
                    &:after
                        left 40px

    .toggle-button
        .checkbox
            label
                background none
                border 1px solid color_blue
                height 16px
                &:after
                    background color_grey
                    box-shadow none
                    top 2px
                    left 2px
                    width 10px
                    height 10px
            input
                &:checked
                    & + label
                        border-color color_blue
                        &:after
                            background color_blue
                            left 11px

</style>



