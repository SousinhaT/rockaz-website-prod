<template lang="">
    <div class="offers-frame">
        <div class="offers-title">
            <h2>Stream<span id="special-colored-span">.</span></h2>
            <p>Descobre as <span id="special-colored-span">parcerias do canal</span> e as <span id="special-colored-span">vantagens exclusivas</span> que trazem para ti!<br>Fica atento para não perderes as <span id="special-colored-span">novidades</span> e <span id="special-colored-span">ofertas especiais!</span></p>
        </div>
        <stream-template/>
        <bonus-hunt/>
    </div>
</template>
<script>
import StreamTemplate from './StreamComponent.vue'
import BonusHunt from './BonusHunt.vue';
export default {
    components:{
        StreamTemplate,
        BonusHunt
    }
}
</script>
<style lang="">
    
</style>