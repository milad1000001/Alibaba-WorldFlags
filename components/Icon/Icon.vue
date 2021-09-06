<template>
    <v-icon
        :color="currentTheme=== 'Light' ? 'black' : 'white'"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <slot />
    </v-icon> 
</template>

<script>
import { mapState } from 'vuex'

export default {
    name:'IconBaseComponent',
    computed:{
        ...mapState('world',['currentTheme']),
        handleThemeColor(){
            return this.currentTheme === 'Dark' ? 'black' : 'white'
        },
    }
}
</script>

<style>

</style>