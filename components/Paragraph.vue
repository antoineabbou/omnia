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
<style lang="stylus">
.paragraph
	padding 100px 70px 70px 70px

	+For-wide()
		padding 30px
	
	+For-tablet-only()
		padding 0px

	.subtitle
		font-family "circularbook"
		font-size 18px
		color color_grey_light
		text-transform uppercase

		+For-wide()
			font-size 14px

		+For-large()
			font-size 12px
		
		+For-tablet-only()
			font-size 18px

		+For-phone-only()
			font-size 14px

	.title
		font-family "circularblack"
		font-size 42px
		color color_black
		line-height 48px 
		margin-bottom 30px
		

		+For-wide()
			font-size 36px
			line-height 42px
		
		+For-large()
			font-size 30px
			line-height 36px

		+For-tablet-only()
			font-size 42px
			line-height 48px
		
		+For-phone-only()
			font-size 30px
			line-height 36px

	.sentence
		font-family "circularbook"
		color color_grey
		font-size 16px
		line-height 40px

		+For-wide()
			font-size 14px
			line-height 32px
			
		+For-large()
			font-size 12px
			line-height 30px
		
		+For-tablet-only()
			font-size 16px
			line-height 40px
		
		+For-phone-only()
			font-size 12px
			line-height 30px

		.link
			color color_blue
			text-decoration underline
			font-family "circularblack"
			cursor pointer
			font-size 16px
			line-height 40px

			+For-wide()
				font-size 14px
				line-height 32px
				
			+For-large()
				font-size 12px
				line-height 30px
			
			+For-tablet-only()
				font-size 16px
				line-height 40px
			
			+For-phone-only()
				font-size 12px
				line-height 30px

</style>
