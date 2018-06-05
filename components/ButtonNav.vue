<template>
  <div class="button-nav">
      <button class="btn btn--previous"> Précédent </button>
      <button class="btn btn--next"> Suivant </button>
  </div>
</template>

<script>
import Emitter from '~/assets/js/utils/events'

export default {
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
    .button-nav
        position absolute
        bottom 100px
        left 70px
        .btn--previous
            margin-right 10px
            opacity 0.3
        .btn--next 
            margin-left 10px
</style>
