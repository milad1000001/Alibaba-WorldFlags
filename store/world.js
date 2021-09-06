import Vue from 'vue'

export const state = () => ({
  regionsDetails: null,
  regionsList:['Africa','Americas','Asia','Europe','Oceania'],
  currentTheme:'Light',
  countryDetails : null
})

export const mutations = {
  SET_REGION_DATA (state, data) {
    Vue.set(state, 'regionsDetails', data)
  },
  SET_CURRENT_THEME(state,theme){
    Vue.set(state, 'currentTheme', theme)
  },
  SET_COUNTRY_DETAILS(state,country){
    Vue.set(state, 'countryDetails', country)
  },
}

export const actions = {
  async getWolrdDetails (vuexContext,regionName) {
    await this.$services.world.getByRegion(regionName)
    .then((response)=>{
        vuexContext.commit('SET_REGION_DATA',response)
    })
  },
  async getCountryDetails (vuexContext,countryName) {
    await this.$services.world.getByCountry(countryName)
    .then((response)=>{
      vuexContext.commit('SET_COUNTRY_DETAILS',response[0])
    })
  },
   changeTheme (vuexContext,theme) {
     vuexContext.commit('SET_CURRENT_THEME',theme)
  },
}