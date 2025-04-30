const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

exports.handler = async function () {
  const apiKey = process.env.NEWSDATA_API_KEY;
  const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=pt&language=pt`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'success') {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch news' }),
      };
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

    // Write to public/news.json
    const filePath = path.join(__dirname, '../../public/news.json');
    await fs.writeFile(filePath, JSON.stringify(newsData, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'News fetched and saved', count: news.length }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};