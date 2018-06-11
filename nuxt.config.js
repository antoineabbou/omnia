var path = require('path')

module.exports = {
  env: {
    environment: process.env.NODE_ENV
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Omnia | Ferez-vous la fierté de Big Brother ?',
    meta: [
      { charset: 'utf-8' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'msapplication-TileColor', content: '#2C62FF' },
      { name: 'msapplication-config', content: '/assets/favicons/browserconfig.xml' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Plongez vous dans l\'univers de Big Brother et d\'Océania à travers l\'application Omnia. C\'est le parisqué d\'Omnia, permettre une Lective qui donne envie. Destiné à la jeunesse prometteuse entre 12 et 17 ans, Omnia vous fera aimer lire. Omnia est Outifort qui vous fera vivre une nouvelle expérience de lecture.' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@antoineabbou' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Omnia - Le livre qui te lie' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'Plongez vous dans l\'univers de Big Brother et d\'Océania à travers l\'application Omnia. C\'est le parisqué d\'Omnia, permettre une Lective qui donne envie. Destiné à la jeunesse prometteuse entre 12 et 17 ans, Omnia vous fera aimer lire. Omnia est Outifort qui vous fera vivre une nouvelle expérience de lecture.' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'http://omnia1984.io/assets/images/sharing/visuel-twitter.jpg' },
      { hid: 'og:title', name: 'og:title', content: 'Omnia - Le livre qui te lie' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:image', name: 'og:image', content: 'http://omnia1984.io/assets/images/sharing/visuel-fb.jpg' },
      { hid: 'og:description', name: 'og:description', content: 'Le livre qui te lie' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Omnia' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/favicons/apple-touch-icon.png' },
      { rel: 'icon', type: "image/png", sizes: '32x32', href: '/assets/favicons/favicon-32x32.png' },
      { rel: 'icon', type: "image/png", sizes: '16x16', href: '/assets/favicons/favicon-16x16.png' },
      { rel: 'manifest', href: '/assets/favicons/site.webmanifest' },
      { rel: 'mask-icon', href: '/assets/favicons/safari-pinned-tab.svg', color:"#5bbad5" },
      { rel: 'shortcut icon', href: '/assets/favicons/favicon.ico' }    
    
    ]
  },
  modules: [
    // ['@nuxtjs/google-analytics']
  ],

  // 'google-analytics': {
  //   // id: 'UA-113429313-1'
  // },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#2C62FF' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.module.rules.push(
        {
          test: /\.(glsl|vs|fs)$/,
          loader: 'shader-loader'
        }
      )

      const vueLoader = config.module.rules.find(rule => rule.loader === 'vue-loader')
      const { options: { loaders } } = vueLoader || { options: {} }
      if (loaders) {
        for (const loader of Object.values(loaders)) {
          changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
        }
      }
      config.module.rules.forEach(rule => changeLoaderOptions(rule.use))
    },


    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-runtime'
      ]
    },

    vendor: ['pixi.js', 'babel-polyfill']
  },

  plugins: [
    {
      src: '@/plugins/pixi',
      ssr: false
    }
  ]

}


function changeLoaderOptions(loaders) {
  if (loaders) {
    for (const loader of loaders) {
      let options
      switch (loader.loader) {
        case 'stylus-loader':
          options = {
            paths: [path.resolve('./assets/stylus')],
            import: ['main']
          }
          break
      }
      if (options) {
        Object.assign(loader.options, options)
      }
    }
  }
}
