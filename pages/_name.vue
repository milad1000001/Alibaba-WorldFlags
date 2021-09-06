<template>
    <v-container v-if="filteredRegion" class="countryDetails" :class="currentTheme">
        <v-row>
            <v-col>
                <div class="countryDetails__back">
                    <NuxtLink to="/">
                    <TheIcon>
                        mdi-keyboard-backspace
                    </TheIcon>
                        Back
                    </NuxtLink>
                </div>
            </v-col>
        </v-row>
        <v-row class="align-center">
            <v-col cols="12" sm="12" xs="12" md="6">
                <v-img :src="filteredRegion.flag" width="100%" height="400px" :contain="true"/>
            </v-col>
            <v-col class="ml-md-12">
                <v-container>
                    <v-row>
                        <v-col>
                            <h2>
                                {{filteredRegion.name}}
                            </h2>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" xs="12" md="6" class="pa-0 mt-4">
                            <div>
                                <strong>Native Name:</strong>
                                {{filteredRegion.nativeName}}
                            </div>
                            <div>
                                <strong>Population:</strong>
                                {{filteredRegion.population}}                            
                            </div>
                            <div>
                                <strong>Region:</strong>
                                {{filteredRegion.region}}
                            </div>
                            <div>
                                <strong>Sub Region:</strong>
                                {{filteredRegion.subregion}}
                            </div>
                            <div>
                                <strong>Capital:</strong>
                                {{filteredRegion.capital}}
                            </div>
                        </v-col>
                        <v-col class="mt-4">
                            <div>
                                <strong>Top Level Domain:</strong>
                                <span v-for="(tld,index) in filteredRegion.topLevelDomain" :key="index">
                                    {{tld}}
                                </span>
                            </div>
                            <div>
                                <strong>Currencies:</strong>
                                <span v-for="(cur,index) in filteredRegion.currencies" :key="index">
                                    {{cur.name}}
                                </span>
                            </div>
                            <div>
                                <strong>Languages:</strong> 
                                <span v-for="(lang,index) in filteredRegion.languages" :key="index">
                                    {{lang.name}}
                                </span>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="mt-12" v-if="borderName.length">
                        <v-col class="d-flex">
                            <strong>Border Countries:</strong>
                                <span v-for="(brd,index) in borderName" :key="index" class="countryDetails__border">
                                    <NuxtLink :to="`${brd}`">
                                        {{brd}}
                                    </NuxtLink>
                                </span>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TheIcon from '@/components/Icon/Icon.vue'

export default {
    name:'Conuntry',
    data: () => ({
        filteredRegion:null,
        borderName:[]
    }),
    components:{TheIcon},
    computed:{
        ...mapState('world',['currentTheme','regionsDetails','countryDetails']),
    },
    mounted(){
        this.filterRegions()
    },
    methods:{
        getFilteredRegion(){
            if(this.filteredRegion){
                this.filteredRegion.borders.forEach((el)=>{
                    this.getBorderName(el)
                })
            }
        },
        getBorderName(borderName){
            let filteredBorderName = this.regionsDetails.filter((el)=>{
                return el.cioc === borderName
            })
            if(!!filteredBorderName){
                filteredBorderName.forEach((el)=>{
                    this.borderName.push(el.name)
                })
            }
        },
        async updateRegionData(region){
            await this.$store.dispatch('world/getWolrdDetails',region)
            this.getFilteredRegion()
        },
        async filterRegions(){
            if(!!this.regionsDetails){
                
                this.filteredRegion = this.regionsDetails.find((el)=>{
                    return el.name.toLowerCase().match(this.$route.params.name.toLowerCase())
                })
                this.getFilteredRegion()
            } else {
                await this.$store.dispatch('world/getCountryDetails',this.$route.params.name.toLowerCase())
                this.updateRegionData(this.countryDetails.region)
                this.filteredRegion = this.countryDetails
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.countryDetails{
    &__back{
        padding:$SP-8 $SP-16;
        box-shadow: $SP-0 $SP-0 5px 1px #cccccc70;
        border-radius: $SP-8;
        width:120px;
        text-align: center;
    }
    &__border{
        a{
            box-shadow: $SP-0 $SP-0 5px 1px #cccccc70;
            padding:$SP-8 $SP-16;
            margin:$SP-0 $SP-8;
            border-radius: $SP-8;
            overflow: hidden;
            white-space: nowrap;
            max-width: 100px;
        }
    }
}
.Dark{
    color:$primary-white !important;
    .countryDetails{
        &__back{
            background: $dark-header-background;
            box-shadow: $SP-0 $SP-0 5px 1px #00000030;
        }
    }
}
</style>