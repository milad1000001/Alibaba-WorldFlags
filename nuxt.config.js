export default {
  ssr:false,
  head: {
    titleTemplate: '%s - flags',
    title: 'flags',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  
  target: 'static',

  css: [
    '@/assets/styles/main.scss'
  ],

  plugins: [
    '@/plugins/services.js',
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
  ],
  
  axios: {
    baseUrl: process.env.BASE_URL,
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true
      },
      dark: false,
    }
  },

  build: {
  }
}
