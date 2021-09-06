<template>
  <div class="selectbox" :class="currentTheme">
    <div class="selectbox__details details">
        <div class="details__title">
            {{dropdownTitle}}
        </div>
        <div class="details__icon">
            <TheIcon @click="isActive = !isActive">
                mdi-chevron-down
            </TheIcon>
        </div>
    </div>
    <div 
        class="selectbox__items items" 
        :class="{
            'selectbox__items--show':isActive,
            'selectbox__items--hide':!isActive,
        }"
    >
        <div 
            v-for="(region,index) in getFiltered" :key="index"
            @click="selectRegionHandler(region)" 
            class="items__value"
        >
            {{region}}
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheIcon from '@/components/Icon/Icon.vue'

export default {
    name:'Dropdown',
    data: () => ({
        isActive:false,
        dropdownTitle:'Filter by Region',
        filteredRegions:[]
    }),
    props:{
        lastRegionName:{
            type:String,
            required:false,
        }
    },
    components:{TheIcon},
    computed:{
        ...mapState('world',['regionsList','currentTheme']),
        getFiltered(){
            return this.filteredRegions.length ? this.filteredRegions : this.regionsList
        },
        handleThemeColor(){
            return this.currentTheme === 'Light' ? 'black' : 'white'
        },
    },
    methods:{
        selectRegionHandler(selectedRegion){
            this.$emit('getSelectedRegion',selectedRegion)
            this.changeDropdownTitle(selectedRegion)    
            this.hideDropdown()
            this.removeSelectedItem(selectedRegion)
        },
        changeDropdownTitle(selectedRegion){
            this.dropdownTitle = selectedRegion
        },
        hideDropdown(){
            this.isActive = false
        },
        removeSelectedItem(selectedRegion){
            this.filteredRegions = [...this.regionsList]
            const itemIndex = this.filteredRegions.indexOf(selectedRegion)
            if (itemIndex > -1) {
                this.filteredRegions.splice(itemIndex, 1)
            }
        }
    },
    watch:{
        lastRegionName:{
            handler(newVal){
                this.changeDropdownTitle(newVal)
                this.removeSelectedItem(newVal)
            },
            immediate:true
        }
    }
}
</script>
<style lang="scss" scoped>
  @import './Dropdown.scss';
</style>