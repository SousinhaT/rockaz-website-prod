<template lang="">
    <div class="offers-frame">
        <div class="offers-title">
            <h2>Noticias<span id="special-colored-span">.</span></h2>
            <p>Descobre as <span id="special-colored-span">parcerias do canal</span> e as <span id="special-colored-span">vantagens exclusivas</span> que trazem para ti!<br>Fica atento para não perderes as <span id="special-colored-span">novidades</span> e <span id="special-colored-span">ofertas especiais!</span></p>
        </div>
        <div class="container-news" ref="newsContainer">
          <div class="card-title-news">
            <h2>Notícias</h2>
          </div>
          <div class="card-news" v-for="article in articles">
            <div class="data">Noticia <time>{{article.pubDate.split(' ')[0]}}</time></div>
            <h2>{{article.title}}</h2>
            <div class="autor">
              <div class="img-container">
                <div class="img"></div>
              </div>
              <div class="info">
                <span>Autor</span>
                {{article.source}}
              </div>
            </div>
            <div class="tags">
              <a href="#" @click="gotoNews(article.url)">Ver Mais</a>
            </div>
          </div>
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
  beforeDestroy() {
    if (this._onWheel && this.$refs.newsContainer) {
      this.$refs.newsContainer.removeEventListener('wheel', this._onWheel);
    }
  },
  mounted() {
    this.fetchNews();
    // Poll every 10 minutes to check for updates
    this.interval = setInterval(this.fetchNews, 10 * 60 * 1000);
    this._onWheel = (e) => {
      // Only scroll horizontally if vertical scroll happens
      if (e.deltaY !== 0) {
        e.preventDefault();
        this.$refs.newsContainer.scrollLeft += e.deltaY;
      }
    };
    this.$refs.newsContainer.addEventListener('wheel', this._onWheel, { passive: false });
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