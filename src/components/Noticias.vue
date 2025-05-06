<template lang="">
    <div class="offers-frame">
        <div class="offers-title">
            <h2>Noticias<span id="special-colored-span">.</span></h2>
            <p>Descobre as <span id="special-colored-span">parcerias do canal</span> e as <span id="special-colored-span">vantagens exclusivas</span> que trazem para ti!<br>Fica atento para não perderes as <span id="special-colored-span">novidades</span> e <span id="special-colored-span">ofertas especiais!</span></p>
        </div>
        <div class="faq-div">
          <Panel :header="item.pubDate + ' | ' + item.title" toggleable v-for="item in articles">
              <p class="m-0">
                  {{item.description}}
              </p>
              <button @click="gotoNews(item.url)">Ver Noticia</button>
          </Panel>
        </div>
    </div>
    
</template>
<script>
import Panel from 'primevue/panel';

export default {
  components:{
        Panel,
    },
  data() {
    return {
      articles: [],
      lastUpdated: '',
      loading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchNews();
    // Poll every 10 minutes to check for updates
    this.interval = setInterval(this.fetchNews, 10 * 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    async fetchNews() {
      this.loading = true;
      try {
        const response = await fetch('/news.json');
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        this.articles = data.articles;
        this.lastUpdated = new Date(data.lastUpdated).toLocaleString();
        this.error = null;
      } catch (err) {
        this.error = 'Error loading news. Please try again later.';
        console.error(err);
      } finally {
        this.loading = false;
        console.log('News fetched at:', this.lastUpdated);
        console.log('Articles:', this.articles);
      }
    },
    gotoNews(website){
      window.open(website, '_blank');   
    }
  },
};
</script>
<style lang="">
    
</style>