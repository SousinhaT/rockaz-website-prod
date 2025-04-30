<template lang="">
    
    <home></home>
</template>
<script>
import Home from './Home.vue'

export default {
    components: {
        Home
    },
    methods: {
        selectView(view){
            console.log(view)
            this.selectedView = view
            const routerPath = '/'+view
            this.$router.push({path: routerPath})
        }
    },
    data() {
        return {
            selectedView:'Home'
        }
    },
}
</script>
<style lang="">
    
</style>