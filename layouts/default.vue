<template>
  <v-app full-width :class="currentTheme">
    <TheHeader />
    <v-main class="mainContainer">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from '@/components/Header/Header.vue'
import { mapState } from 'vuex'

export default {
  components:{
    TheHeader
  },
  computed:{
    ...mapState('world',['currentTheme'])
  },
}
</script>

<style lang="scss">
  .mainContainer{
    background-color:$light-main-background;;
  }
  .Dark{
   .mainContainer{
      background-color:$dark-main-background;
    } 
  }
</style>
