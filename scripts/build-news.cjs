const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

if (!process.env.NETLIFY) {
  require('dotenv').config();
}



async function fetchNews() {
  const apiKey = process.env.NEWSDATA_API_KEY;
  const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=pt&language=pt`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'success') {
      console.error('API Error:', data.message);
      process.exit(1);
    }

    const news = data.results || [];
    const newsData = {
      lastUpdated: new Date().toISOString(),
      articles: news.map(article => ({
        title: article.title,
        description: article.description,
        url: article.link,
        pubDate: article.pubDate,
        source: article.source_id,
      })),
    };

    const filePath = path.join(__dirname, '../public/news.json');
    await fs.writeFile(filePath, JSON.stringify(newsData, null, 2));
    console.log('News fetched and saved to public/news.json');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fetchNews();