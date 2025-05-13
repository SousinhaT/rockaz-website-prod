<template lang="">
    <div class="home-frame">
        <div class="blankspacediv"/>
        <swiper
            :direction="'horizontal'"
            :slidesPerView="1"
            :autoplay="{
                delay: 6000,
            }"
            :effect="'fade'"
            :pagination="{
            clickable: true,
            }"
            :modules="modules"
            class="mySwiper"
            style="width:65%"
        >
            <swiper-slide style="height:500px; display:flex;">
                <div class="slider-text">
                    <h2> Junta-te A Nossa</h2>
                    <h2> <span>Comunidade</span>  </h2>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed orci sit amet augue dictum malesuada sed sit amet enim. Donec a bibendum tellus. </p>
                    <button @click="gotoPage()"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
                <div class="slider-image" style="background: url('https://i.imgur.com/589fG2X.png'); background-repeat: no-repeat; background-position: center; background-size: contain;">
                </div>
            </swiper-slide>
            <swiper-slide style="height:500px; display:flex;">
                 <div class="slider-text">
                    <h2> Junta-te A Nossa</h2>
                    <h2> <span>Comunidade</span>  </h2>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed orci sit amet augue dictum malesuada sed sit amet enim. Donec a bibendum tellus. </p>
                    <button @click="gotoPage()"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
                <div class="slider-image" style="background: url('https://i.imgur.com/589fG2X.png'); background-repeat: no-repeat; background-position: center; background-size: contain;">
                </div>
            </swiper-slide>
        </swiper>
        <div class="blankspacediv"/>
        <div class="home-title">
            <h2>Parceiros.</h2>
        </div>
        <swiper
                    :slidesPerView="6"
                    :grid="{
                    rows: 1,
                    }"
                    :autoplay="{
                        delay: 3000,
                    }"
                    :spaceBetween="30"
                    :pagination="{
                    clickable: true,
                    }"
                    :modules="modules"
                    class="mySwiper"
                    style="width:65%"
                >
                    <swiper-slide style="height: 150px" v-for="brand in availableBrands" @click="selectBrand(brand)">
                        <div class="casino-brand-home" :style="{background: `url(${brand.imgurl}) no-repeat center`,backgroundSize: '100% 100%'}">
                        </div>
                        <span class="casino-brand-home-span" v-if="selectedBrand.name == brand.name"><i class="fa-solid fa-circle"></i></span class="casino-brand-home-span">
                    </swiper-slide>
        </swiper>
        <div class="blankspacediv" style="height:50px;"/>
        <div class="home-show-brand">
            <div class="home-show-brand-content">
                <div>
                    <img :src="selectedBrand.imgurl"/>
                    <p>{{selectedBrand.description}} </p>
                    <button>Saber <i class="fa-solid fa-plus"/> </button>
                </div>
                <div :style="{background: `url(${selectedBrand.imgDescription}) no-repeat center`,backgroundSize: '100% 100%'}">
                    
                </div>
            </div>
        </div>
        <div class="blankspacediv"/>
    </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/grid';


// import required modules
import { Mousewheel, Pagination,  Autoplay, Navigation, EffectFade, Grid } from 'swiper/modules';

export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    methods: {
        selectBrand(brand){
            this.selectedBrand = brand
        },
        gotoPage(){
            this.$router.push({ path: `/Stream` });
        }
    },
    data() {
        return {
            availableBrands: [
                {
                    imgurl: "https://i.imgur.com/WuCrMui.png",
                    imgDescription:"https://i.imgur.com/m4aKL7E.png",
                    name: "Brand 1",
                    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur libero in lectus eleifend vestibulum. Duis id turpis vitae neque aliquam ornare sit amet sit amet dolor. Mauris vitae iaculis dui. Duis aliquet ligula vel sem imperdiet, et mollis ligula pellentesque. Morbi pulvinar dui at lacus pretium, ultrices efficitur ante convallis. Sed non lorem vel velit ullamcorper vulputate sed non diam. Etiam in ullamcorper est. Nullam ultricies leo augue, nec semper dui condimentum sed. Nunc eleifend neque nec orci suscipit placerat.Nulla facilisi. Vivamus sodales, est sit amet interdum consectetur, velit nulla laoreet velit, nec dictum diam risus ac tortor. Suspendisse et dignissim ante, vitae tristique velit. Integer mattis ornare tellus sed pellentesque. Quisque quis nunc a lorem ornare mattis eget in nibh. Pellentesque accumsan pretium sodales. Etiam condimentum vel mauris nec pellentesque. Praesent id elit scelerisque, finibus felis ut, sagittis dolor. Sed vitae mattis risus. Suspendisse sodales quis turpis sit amet lobortis."
                },
                {
                    imgurl: "https://i.imgur.com/Wsp21x9.png",
                    imgDescription:"https://i.imgur.com/aXetc0b.png",
                    name: "Brand 2",
                    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur libero in lectus eleifend vestibulum. Duis id turpis vitae neque aliquam ornare sit amet sit amet dolor. Mauris vitae iaculis dui. Duis aliquet ligula vel sem imperdiet, et mollis ligula pellentesque. Morbi pulvinar dui at lacus pretium, ultrices efficitur ante convallis. Sed non lorem vel velit ullamcorper vulputate sed non diam. Etiam in ullamcorper est. Nullam ultricies leo augue, nec semper dui condimentum sed. Nunc eleifend neque nec orci suscipit placerat.Nulla facilisi. Vivamus sodales, est sit amet interdum consectetur, velit nulla laoreet velit, nec dictum diam risus ac tortor. Suspendisse et dignissim ante, vitae tristique velit. Integer mattis ornare tellus sed pellentesque. Quisque quis nunc a lorem ornare mattis eget in nibh. Pellentesque accumsan pretium sodales. Etiam condimentum vel mauris nec pellentesque. Praesent id elit scelerisque, finibus felis ut, sagittis dolor. Sed vitae mattis risus. Suspendisse sodales quis turpis sit amet lobortis."
                },
            ],
            selectedBrand: {}
        };
    },
    mounted(){
        this.selectedBrand = this.availableBrands[0]
    }
}
</script>
<style lang="">
    
</style>