import { createWebHistory, createRouter } from 'vue-router';
import MainPageNew from './components/NewMainPage.vue'
import Offers from './components/Ofertas.vue'
import BrandOffers from './components/Oferta.vue'
import Loja from './components/Loja.vue'
import Minigames from './components/Minigames.vue';
import Noticias from './components/Noticias.vue';
import FAQ from './components/FAQ.vue'

const routes = [
  { path: '/', component: MainPageNew },
  { path: '/Ofertas', component: Offers },
  { path: '/Ofertas/:brand', component: BrandOffers }, // 👈 dynamic route
  { path: '/Loja', component: Loja }, // 👈 dynamic route
  { path: '/Minigames' , component:Minigames},
  { path: '/Noticias' , component:Noticias},
  { path: '/FAQ', component: FAQ}
];

export const router = createRouter({
  history: createWebHistory(), // Use WebHistory for proper URL management
  routes,
});
