// import _ from 'lodash'
import { Nuxt, Builder } from 'nuxt'

import Vue from 'vue'
import Vuetify from 'vuetify'
import nuxtConfig from './nuxt.config'

Vue.use(Vuetify)

const resetConfig = {
  loading: false,
  loadingIndicator: false,
  fetch: {
    client: false,
    server: false
  },
  features: {
    store: true,
    layouts: false,
    meta: false,
    auth: false,
    modules: false,
    middleware: false,
    transitions: false,
    deprecations: false,
    validate: false,
    asyncData: false,
    fetch: false,
    clientOnline: false,
    clientPrefetch: false,
    clientUseUrl: false,
    componentAliases: false,
    componentClientOnly: false
  },
  build: {
    indicator: false,
    terser: false
  },
  modules: []
}

const config = Object.assign({}, nuxtConfig, resetConfig, {
  ssr: false,
  srcDir: nuxtConfig.srcDir,
  ignore: ['**/components/**/*', '**/layouts/**/*', '**/pages/**/*']
})

const buildNuxt = async () => {
  const nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  return nuxt
}

module.exports = async () => {
  const nuxt = await buildNuxt()
  process.env.buildDir = nuxt.options.buildDir
}
