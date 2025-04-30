<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { globalStore } from '@/store/storage'  // still called globalStore when you import it

const router = useRouter()
const store = globalStore()

// Use the state value directly, not the getter
const { currentView } = storeToRefs(store)

function selectView(view) {
  console.log(view)
  store.setcurrentView(view)
  const routerPath = '/' + view
  router.push({ path: routerPath })
}
</script>

<template>
  <main>
    <div class="main-page-nav">
      <div class="main-page-nav-container">
        <div>
          <img src="https://i.imgur.com/JMHN0Y2.png" />
        </div>

        <div>
          <button @click="selectView('')" :class="{ active: currentView === '' }">Home</button>
          <button @click="selectView('Ofertas')" :class="{ active: currentView === 'Ofertas' }">Ofertas</button>
          <button @click="selectView('Loja')" :class="{ active: currentView === 'Loja' }">Loja</button>
          <button @click="selectView('Noticias')" :class="{ active: currentView === 'Noticias' }">Noticias</button>
          <button @click="selectView('Minigames')" :class="{ active: currentView === 'Minigames' }">Minigame</button>
          <button @click="selectView('FAQ')" :class="{ active: currentView === 'FAQ' }">FAQ</button>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </main>
</template>

<style scoped>

</style>
