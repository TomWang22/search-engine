require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Access API keys from environment variables
const BING_API_KEY = process.env.BING_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CX = process.env.GOOGLE_CX;

// Helper function to get Bing results with snippets
async function searchBing(query) {
  const url = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(url, {
      headers: { 'Ocp-Apim-Subscription-Key': BING_API_KEY },
    });

    // Ensure we return title, link, and snippet from Bing
    return response.data.webPages?.value.map(item => ({
      title: item.name,
      link: item.url,
      snippet: item.snippet || 'No description available', // Include snippet when available
      source: 'Bing'
    })) || [];
  } catch (error) {
    console.error('Error fetching from Bing:', error.response?.data || error.message);
    return [];
  }
}

// Helper function to get Google results with snippets
async function searchGoogle(query) {
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}`;
  try {
    const response = await axios.get(url);

    // Ensure we return title, link, and snippet from Google
    return response.data.items?.map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet || item.htmlSnippet || 'No description available', // Try to use either snippet or htmlSnippet
      source: 'Google'
    })) || [];
  } catch (error) {
    console.error('Error fetching from Google:', error.response?.data || error.message);
    return [];
  }
}

// API route to handle search requests
app.post('/search', async (req, res) => {
  const query = req.body.query;
  if (!query) {
    return res.status(400).send({ error: 'Query is required' });
  }

  // Fetch results from Bing and Google
  const [bingResults, googleResults] = await Promise.all([searchBing(query), searchGoogle(query)]);

  // Combine the results
  const combinedResults = [...bingResults, ...googleResults];

  res.json(combinedResults);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
