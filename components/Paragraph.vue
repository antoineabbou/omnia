<template>
  <div class="paragraph">
	<slot> </slot>
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
  },

  methods: {
    
  },

  beforeDestroy () {

  }

}
</script>
<style lang="stylus" scoped>
.paragraph
	padding 100px 70px 70px 70px

	.subtitle
		font-family "circularbook"
		font-size 18px
		color color_grey_light
		text-transform uppercase

	.title
		font-family "circularblack"
		font-size 42px
		color color_black
		line-height 48px 
		margin-bottom 30px

	.sentence
		font-family "circularbook"
		color color_grey
		font-size 16px
		line-height 40px

</style>
