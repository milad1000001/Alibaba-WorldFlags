<template>
  <header class="header" :class="currentTheme">
    <v-container>
      <v-row class="header__container container">
        <v-col class="container__title">
          <h4>Where in the world?</h4>
        </v-col>
        <v-col class="container__themeToggle themeToggle">
          <div @click="toggleTheme" class="themeToggle__container">
            <v-icon
              class="themeToggle__icon"
              :color="handleThemeColor"
            >
              mdi-moon-waning-crescent
            </v-icon>
              {{currentTheme}} Mode
          </div>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import TheIcon from '@/components/Icon/Icon.vue'

export default {
  name:'Header',
  components:{TheIcon},
  computed:{
    ...mapState('world',['currentTheme']),

    handleThemeColor(){
      return this.currentTheme === 'Light' ? 'black' : 'white'
    },
  },
  methods:{
    toggleTheme(){
      if(this.currentTheme === 'Light'){
        this.setThemeToStore('Dark')
      }else{
        this.setThemeToStore('Light')
      }
    },
    setThemeToStore(selectedTheme){
      this.$store.dispatch('world/changeTheme',selectedTheme)
    }
  },
}
</script>

<style lang="scss" scoped>
  @import './Header.scss';
</style>