<template>
    <div :class="currentTheme">
        <div class="country">
            <div>
                <v-row>
                    <v-col>
                        <v-img :src="country.flag" width="100%" height="140px"/>
                    </v-col>
                </v-row>
            </div>
            <v-container fluid class="country__details">
                <v-row>
                    <v-col>
                        <NuxtLink :to="`${country.name}`">
                            <strong>{{country.name}}</strong>
                        </NuxtLink>
                    </v-col>
                </v-row>
                <v-row class="mt-2">
                    <v-col>
                        population: {{country.population}}
                    </v-col>
                </v-row>
                <v-row class="mt-1">
                    <v-col>
                        region: {{country.region}}
                    </v-col>
                </v-row>
                <v-row class="mt-1">
                    <v-col>
                        capital: {{country.capital}}
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name:'Country',
    props:{
        country:{
            type: Object,
            required: false
        }
    },
    computed:{
        ...mapState('world',['currentTheme']),
    },
}
</script>
<style lang="scss" scoped>
    @import './Country.scss';
</style>