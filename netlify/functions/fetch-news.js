const fetch = require('node-fetch');

// Load .env file in local development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

exports.handler = async function () {
  const apiKey = process.env.NEWSDATA_API_KEY;
  console.log('API Key:', apiKey);
  const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=pt&language=pt`;

  try {
    const response = await fetch(url);
    console.log('Response Status:', response.status);
    const data = await response.json();
    console.log('API Response:', data);

    if (data.status !== 'success') {
      console.log('API Error:', data.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch news', message: data.message }),
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

    // Return the data directly without writing to file
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'News fetched successfully', data: newsData }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    };
  }
};