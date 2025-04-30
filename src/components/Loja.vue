<template lang="">
    <div class="offers-frame">
        <div class="offers-title">
            <h2>Loja<span id="special-colored-span">.</span></h2>
            <p>Descobre as <span id="special-colored-span">parcerias do canal</span> e as <span id="special-colored-span">vantagens exclusivas</span> que trazem para ti!<br>Fica atento para não perderes as <span id="special-colored-span">novidades</span> e <span id="special-colored-span">ofertas especiais!</span></p>
        </div>
        <div class="store-container">
            <div class="store-card" v-for="item in storeItems">
                <div class="store-card-top">
                    <div class="blurred-background"></div>
                    <div class="content">
                        <img :src="item.brandLogo" alt="Content Image"/>
                    </div>
                </div>
                <div class="store-card-bottom">
                    <p>{{item.name}}</p>
                    <div>
                        <button @click="" style="width:100%; border:none"><i class="fa-solid fa-basket-shopping"></i></button>
                    </div>
                    
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            storeItems:[
                {
                    brandLogo: "https://i.imgur.com/TgKdL9C.png",
                    name: "10€ EM CASINO",
                },
                {
                    brandLogo: "https://i.imgur.com/5lgvoz6.png",
                    name: "25€ EM CASINO",
                },
                {
                    brandLogo: "https://i.imgur.com/ArqfEX7.png",
                    name: "50€ EM CASINO",
                },
                
            ]
        }
    },
}
</script>
<style lang="">
    
</style>