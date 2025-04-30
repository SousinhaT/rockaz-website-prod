<template lang="">
    <div class="offers-frame">
        <div class="offers-title">
            <h2>Minigames<span id="special-colored-span">.</span></h2>
            <p>Descobre as <span id="special-colored-span">parcerias do canal</span> e as <span id="special-colored-span">vantagens exclusivas</span> que trazem para ti!<br>Fica atento para não perderes as <span id="special-colored-span">novidades</span> e <span id="special-colored-span">ofertas especiais!</span></p>
        </div>
        <Minesweeper />
    </div>
</template>
<script>
import Minesweeper from './Minesweeper.vue';
export default {
    components:{
        Minesweeper
    }
    
}
</script>
<style lang="">
    
</style>