<template lang="">
    <div class="offers-frame">
        <div class="offers-title">
            <h2>Parcerias<span id="special-colored-span">.</span></h2>
            <p>Descobre as <span id="special-colored-span">parcerias do canal</span> e as <span id="special-colored-span">vantagens exclusivas</span> que trazem para ti!<br>Fica atento para não perderes as <span id="special-colored-span">novidades</span> e <span id="special-colored-span">ofertas especiais!</span></p>
        </div>
        <div class="offers-container">
            <div class="offers-card" v-for="brand in offers">
                <div class="offers-card-top" :style="{ background: 'none' }">
                    <div class="blurred-background" :style="{ backgroundImage: `url(${brand.backgroundURL})` }"></div>
                    <div class="content">
                        <img :src="brand.brandLogo" alt="Content Image" />
                    </div>
                    <span id="offer-tag" v-if="brand.tag != 'none'">{{brand.tag}}</span>
                </div>
                <div class="offers-card-bottom">
                    <div id="widget-offers-div">
                        <div style="margin-bottom: 2%">
                            <div id="widget-offer">
                                <div id="widget-offer-top">
                                    MIN. DEP.
                                </div >
                                <div id="widget-offer-bottom">
                                    20€
                                </div>
                            </div>
                            <div id="widget-offer">
                                <div id="widget-offer-top">
                                    BONUS
                                </div >
                                <div id="widget-offer-bottom">
                                    150%
                                </div>
                            </div>
                            <div id="widget-offer">
                                <div id="widget-offer-top">
                                    CODE
                                </div >
                                <div id="widget-offer-bottom">
                                    BUTADINE
                                </div>
                            </div>                          
                        </div>
                        <div>
                            <div id="widget-offer">
                                <div id="widget-offer-top">
                                    FREE SPINS
                                </div >
                                <div id="widget-offer-bottom">
                                    150 FS
                                </div>
                            </div>                          
                            <div id="widget-offer">
                                <div id="widget-offer-top">
                                    METODOS
                                </div >
                                <div id="widget-offer-bottom">
                                    <img v-for = "method in brand.paymentMethods" :src="method.url" style="width:30px;height:30px; margin-right:1%"/>
                                </div>
                            </div>                          
                        </div>
                    </div>
                    <span>+18 | T&C APPLY</span>
                    <div id="btn-offers-div">
                        <button @click="seeBrandDeal(brand.name)"><i class="fa-solid fa-eye"></i> Saber +</button>
                        <button @click="gotoBrand(brand.link)"><i class="fa-solid fa-computer"></i> Ver Parceria</button>
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
            offers:[
                {
                    brandLogo: "https://i.imgur.com/WuCrMui.png",
                    backgroundURL:"https://i.imgur.com/0NT4Ac5.jpeg",
                    name: "Spinsala",
                    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur libero in lectus eleifend vestibulum. Duis id turpis vitae neque aliquam ornare sit amet sit amet dolor. Mauris vitae iaculis dui. Duis aliquet ligula vel sem imperdiet, et mollis ligula pellentesque. Morbi pulvinar dui at lacus pretium, ultrices efficitur ante convallis. Sed non lorem vel velit ullamcorper vulputate sed non diam. Etiam in ullamcorper est. Nullam ultricies leo augue, nec semper dui condimentum sed. Nunc eleifend neque nec orci suscipit placerat.Nulla facilisi. Vivamus sodales, est sit amet interdum consectetur, velit nulla laoreet velit, nec dictum diam risus ac tortor. Suspendisse et dignissim ante, vitae tristique velit. Integer mattis ornare tellus sed pellentesque. Quisque quis nunc a lorem ornare mattis eget in nibh. Pellentesque accumsan pretium sodales. Etiam condimentum vel mauris nec pellentesque. Praesent id elit scelerisque, finibus felis ut, sagittis dolor. Sed vitae mattis risus. Suspendisse sodales quis turpis sit amet lobortis.",
                    link: "https://spinsala.com/en/",
                    tag: "NEW",
                    paymentMethods: [
                        {url:"https://i.imgur.com/rfVhOdu.png"},
                        {url:"https://i.imgur.com/i323H0N.png"},
                        {url:"https://i.imgur.com/IcLJpQJ.png"}
                    ]
                },
            ]
        }
    },

    methods: {
        seeBrandDeal(route){
            this.$router.push({ path: `/Ofertas/${route}` });
        },
        gotoBrand(link){
            window.open(link, '_blank');      
        }
    }
    
}
</script>
<style lang="">
    
</style>