
<template lang="">
    <div class="offer-frame">
        <div class="offer-container">
            <div class="offer-header">
                <div class="offer-header-left">
                    <button @click="this.$router.push({ path: `/Ofertas` });"><i class="fa-regular fa-circle-left"></i> Voltar Atrás</button>
                    <img :src="offer.brandLogo" alt="Content Image" />
                    <p>{{offer.description}}</p>
                    <button id="offer-button"><i class="fa-solid fa-computer"></i>Visitar</button>
                </div>

                
                <div class="offer-header-right":style="{background: `url(${offer.computerImage}) no-repeat center`,backgroundSize: '100% 100%'}">
                    
                </div>
                
            </div>
            <div class="offer-content">
                <div class="offer-content-left">
                    <img v-for="image in offer.images" :src="image"/>
                </div>

                <div class="offer-content-right">
                    <div>
                        <h2>Deposito & Bonus<span id="special-colored-span">.</span></h2>
                        <p>20€ / 100%</p>
                    </div>
                    <div>
                        <h2>FreeSpin<span id="special-colored-span">.</span></h2>
                        <p>100 Freespins Gratuitas</p>
                    </div>
                    <div>
                        <h2>Provedoras<span id="special-colored-span">.</span></h2>
                        <p>Pragmatic play, Evolution Gaming, Play'n GO, Thunderkick , Relax Gaming, Quickfire, Booongo, IGtech, Amatic, Netent, RedTiger Gaming, Push Gaming, Spinomenal, Nolimit city, Playson, BetSoft Gaming, Gamomat, Quickspin, Playtech , Endorphina, iSoftBet , Booming, Ezugi, ELK, Yggdrasil , EGT, BigTime Gaming, PGsoft, NYX Gaming, Wazdan, Swintt, TomHorn, Hacksaw, High5 Games, TrueLab, Fantasma, 1x2 Gaming, Spearhead, Novomatic, Spribe, Onlyplay, Gamzix, Platipus, Blueprint, Merkur, EvoPlay, Kalamba, Belatra.</p>
                    </div>
                    <div>
                        <h2>Metodos Pagamento<span id="special-colored-span">.</span></h2>
                        <p>MBWAY,</p>
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
            offer:
                {
                    brandLogo: "https://i.imgur.com/WuCrMui.png",
                    backgroundURL:"https://i.imgur.com/0NT4Ac5.jpeg",
                    computerImage: "https://i.imgur.com/m4aKL7E.png",
                    name: "Brand 1",
                    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur libero in lectus eleifend vestibulum. Duis id turpis vitae neque aliquam ornare sit amet sit amet dolor. Mauris vitae iaculis dui. Duis aliquet ligula vel sem imperdiet, et mollis ligula pellentesque. Morbi pulvinar dui at lacus pretium, ultrices efficitur ante convallis. Sed non lorem vel velit ullamcorper vulputate sed non diam. Etiam in ullamcorper est. Nullam ultricies leo augue, nec semper dui condimentum sed. Nunc eleifend neque nec orci suscipit placerat.Nulla facilisi. Vivamus sodales, est sit amet interdum consectetur, velit nulla laoreet velit, nec dictum diam risus ac tortor. Suspendisse et dignissim ante, vitae tristique velit. Integer mattis ornare tellus sed pellentesque. Quisque quis nunc a lorem ornare mattis eget in nibh. Pellentesque accumsan pretium sodales. Etiam condimentum vel mauris nec pellentesque. Praesent id elit scelerisque, finibus felis ut, sagittis dolor. Sed vitae mattis risus. Suspendisse sodales quis turpis sit amet lobortis.",
                    link: "https://spinsala.com/en/",
                    images: ['https://i.imgur.com/1FEUg0S.png','https://i.imgur.com/SmKYokL.png']
                },
            
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