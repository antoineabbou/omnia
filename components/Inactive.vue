<template>
    <div class="inactive">
        <div :key=index v-for="(item, index) in items">
            <h1 class="centered big-title back moving left"> <span>&nbsp;BIG BROTHER VOUS REGARDE </span><span>&nbsp; BIG BROTHER VOUS REGARDE </span><span>&nbsp; BIG BROTHER VOUS REGARDE </span></h1> 
            <h1 class="centered big-title back moving right"> <span>&nbsp;BIG BROTHER VOUS REGARDE </span><span>&nbsp; BIG BROTHER VOUS REGARDE </span><span>&nbsp; BIG BROTHER VOUS REGARDE </span></h1> 
        </div>
    </div>
</template>

<script>

import {TweenMax, Power2, TimelineLite} from 'gsap'
import Emitter from '~/assets/js/utils/events'


export default {
  data () {
    return {
        items: 10,
        active: true, 
        inactive: false
    }
  },

  computed: {
  },

  props: [],

  created () {

  },

  mounted () {
    this.addListeners()
  },

  methods: {
    addListeners() {
      Emitter.on('GLOBAL:INACTIVE', this.goInactive)
      Emitter.on('GLOBAL:ACTIVE', this.goActive)
    },

    goInactive () {
      if(!this.inactive) {
        this.active = false
        this.inactive = true
        TweenMax.to('.inactive', 0.6, {opacity: 1, ease: Expo.easeOut}) 
        this.launchBB()
      }
    }, 

    goActive () {
      if(this.inactive) {
        this.inactive = false
        this.active = true
        TweenMax.to('.inactive', 0.6, {opacity: 0, ease: Expo.easeOut}) 
        this.removeAllBigBrothers()
      }
    },

    removeAllBigBrothers() {
      let bbContainer = document.querySelector('.big-brother-container')
      TweenMax.to('.big-brother-container', 0.6, {
        opacity: 0, 
        ease: Expo.easeOut, 
        onComplete: () => {
          bbContainer.style.display = "none"
          bbContainer.remove()
        }
      })
    },

    launchBB () {
      let container = document.createElement('div')
      container.classList.add('big-brother-container')
      TweenMax.set(container, {
        position: 'fixed',
        zIndex: 1000000,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      })
      document.body.appendChild(container)

      this.bigBrother(container)

    },

    bigBrother (container) {
      let bigBrother = document.createElement('img')
      bigBrother.src = '/assets/images/bigbrother.png'
      bigBrother.onload = () => {
        container.appendChild(bigBrother)

        let tl = new TimelineLite({
        })
        tl.timeScale(1)

        tl.to(bigBrother, 0.3, {
          delay: 1,
          opacity: 1,
          ease: Power3.easeInOut,
          onStart: () => {
            this.bigBrother(container)
          }
        })
      }
      bigBrother.style.maxHeight = '20vh'
      TweenMax.set(bigBrother, {
        position: 'absolute',
        bottom: Math.floor( Math.random() * window.innerHeight ),
        scale: Math.min((Math.random() + 0.6), 1.4),
        transformOrigin: 'bottom center',
        left: `${Math.floor(Math.random() * 90)}%`,
        opacity: 0
      })
    }

  },

  beforeDestroy () {

  }

}
</script>
<style lang="stylus" scoped>
.inactive
    pointer-events none
    position absolute
    top 0; left 0; right 0; bottom 0
    width 100vw
    height 100vh
    background rgba(0, 0, 0, 0.7)
    z-index 1000
    opacity 0
    overflow hidden

.big-title 
  font-family: 'circularblack';
  font-size: 130px;
  color: color_white;
  margin: 0;
  display: block;
  text-transform: uppercase;
  white-space: nowrap;

  +For-phone-only()
    font-size 80px

.centered {
//   position: absolute;
//   left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}

span {
  display: inline-block;
}

.left {
  -webkit-animation: animLeft 10s linear infinite;
          animation: animLeft 10s linear infinite;
}

.right {
  -webkit-animation: animRight 10s linear infinite;
          animation: animRight 10s linear infinite;
}


@-webkit-keyframes animLeft {
  0% {
    -webkit-transform: translate(-20%, -50%);
            transform: translate(-20%, -50%);
  }
  100% {
    -webkit-transform: translate(-70%, -50%);
            transform: translate(-70%, -50%);
  }
}

@keyframes animLeft {
  0% {
    -webkit-transform: translate(-20%, -50%);
            transform: translate(-20%, -50%);
  }
  100% {
    -webkit-transform: translate(-70%, -50%);
            transform: translate(-70%, -50%);
  }
}

@-webkit-keyframes animRight {
  0% {
    -webkit-transform: translate(-20%, 50%);
            transform: translate(-20%, 50%);
  }
  100% {
    -webkit-transform: translate(-70%, 50%);
            transform: translate(-70%, 50%);
  }
}

@keyframes animRight {
  0% {
    -webkit-transform: translate(-70%, -50%);
            transform: translate(-70%, -50%);
  }
  100% {
    -webkit-transform: translate(-20%, -50%);
            transform: translate(-20%, -50%);
  }
}

    



</style>
