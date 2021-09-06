<template>
    <v-container class="contriesWrapper" :class="currentTheme">
      <v-row>
        <v-col cols="12" lg="3" md="6" xs="12" class="pa-0 pb-md-0 pb-3">
          <v-text-field
            placeholder="Search for a country"
            solo
            prepend-inner-icon="mdi-magnify"
            v-model="searchTerm"
            @input="filterRegions"
            :background-color="handleThemeBackgroundColor"
            :color="handleThemeColor"
            :dark="!isLightThemeSelected"
            hide-details
          >
          </v-text-field>
        </v-col>
        <v-col class="contriesWrapper__dropdown justify-md-end justify-sm-start ml-md-3 ml-0">
          <TheDropDown @getSelectedRegion="getSelectedRegionData" :last-region-name="lastRegion"/>
        </v-col>
        <div class="contriesWrapper__sort mr-md-0 mr-4">
          <TheIcon @click="sortListByName()">
              mdi-sort-alphabetical-ascending
          </TheIcon>
          <TheIcon class="themeToggle__icon ml-2" @click="sortListByPopulation()">
              mdi-sort-descending
          </TheIcon>
        </div>
      </v-row>
      <div class="contriesWrapper__country">
        <div v-for="(item,index) in filteredRegion" :key="index">
          <TheCountry :country="item" />
        </div>
      </div>
    </v-container>
</template>
<script>
import TheDropDown from '@/components/Dropdown/Dropdown.vue'
import TheIcon from '@/components/Icon/Icon.vue'
import TheCountry from '@/components/Country/Country.vue'
import { mapState } from 'vuex'

export default {
  data(){
    return{
      searchTerm:null,
      filteredRegion:null,
      lastRegion:null
    }
  },
  components:{
    TheDropDown,
    TheCountry,
    TheIcon
  },
  layout:'default',
  computed:{
    ...mapState('world',['regionsDetails','currentTheme']),
    handleThemeColor(){
      return this.currentTheme === 'Dark' ? '#FFFFFF' : '#2B3743'
    },
    handleThemeBackgroundColor(){
      return this.currentTheme === 'Dark' ? '#2B3743' : '#ffffff'
    },
    isLightThemeSelected(){
      return this.currentTheme === 'Light'
    }
  },
  mounted(){
    if(localStorage.getItem('lastRegion')){
      const regionName = localStorage.getItem('lastRegion')
      this.lastRegion = regionName
      this.getSelectedRegionData(regionName)
    }else{
      this.lastRegion = 'Filter by Region'
    }
  },
  methods:{
    async getSelectedRegionData(region){
      localStorage.setItem('lastRegion',region)
      await this.$store.dispatch('world/getWolrdDetails',region)
      this.filteredRegion = this.regionsDetails
    },
    sortListByPopulation(){
      if(this.regionsDetails){
        let arrayOfObjects = this.regionsDetails
        let byPopulation = arrayOfObjects.slice(0);
        byPopulation.sort((a,b)=> {
            return a.population - b.population
        });
        this.filteredRegion = byPopulation
      }
    },
    sortListByName(){
      if(this.regionsDetails){
        let arrayOfObjects = this.regionsDetails
        let byName = arrayOfObjects.slice(0);
        byName.sort((a,b)=> {
            return a.name - b.name
        });
        this.filteredRegion = byName
      }
    },
    filterRegions(){
      if(this.searchTerm && this.regionsDetails){
        this.filteredRegion = this.regionsDetails.filter((el)=>{
          return el.name.toLowerCase().match(this.searchTerm.toLowerCase())
        })
      } else {
        this.filteredRegion = this.regionsDetails
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.contriesWrapper{
  margin-top:$SP-24;
  &__dropdown{
    display:flex;
    align-items: center;
  }
  &__sort{
    display:flex;
    justify-content:center;
    align-items: center;
    margin-left:$SP-16;
  }
  &__country{
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-gap:$SP-48;
    margin-top:$SP-16;
  }
  .v-input__control {
    .v-input__slot{
      box-shadow: $SP-0 $SP-0 5px 1px #cccccc30 !important;
      height: 56px;
      border-radius: $SP-8;
      
    }
  }
}
.Dark{
    .v-input__control {
      .v-input__slot{
        box-shadow: unset !important;
      }
  }
  }
</style>
