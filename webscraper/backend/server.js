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
const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY; // Add SerpAPI key
const MAX_RESULTS = 50; // Max results to fetch

// Helper function to get Bing results using SerpAPI
async function searchBing(query) {
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=bing&api_key=${SERPAPI_API_KEY}`;
  try {
    const response = await axios.get(url);

    return response.data.organic_results.map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet || 'No description available',
      source: 'Bing (via SerpAPI)'
    })) || [];
  } catch (error) {
    console.error('Error fetching from Bing:', error.response?.data || error.message);
    return [];
  }
}

// Helper function to get Google results using SerpAPI
async function searchGoogle(query) {
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=google&api_key=${SERPAPI_API_KEY}`;
  try {
    const response = await axios.get(url);

    return response.data.organic_results.map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet || item.htmlSnippet || 'No description available',
      source: 'Google (via SerpAPI)'
    })) || [];
  } catch (error) {
    console.error('Error fetching from Google:', error.response?.data || error.message);
    return [];
  }
}

// Helper function to get Yahoo results using SerpAPI
async function searchYahoo(query) {
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=yahoo&api_key=${SERPAPI_API_KEY}`;
  try {
    const response = await axios.get(url);

    return response.data.organic_results.map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet || 'No description available',
      source: 'Yahoo (via SerpAPI)'
    })) || [];
  } catch (error) {
    console.error('Error fetching from Yahoo:', error.response?.data || error.message);
    return [];
  }
}

// Helper function to get DuckDuckGo results
async function searchDuckDuckGo(query) {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1`;
  try {
    const response = await axios.get(url);

    return response.data.RelatedTopics.map(item => ({
      title: item.Text,
      link: item.FirstURL,
      snippet: item.Text || 'No description available',
      source: 'DuckDuckGo'
    })) || [];
  } catch (error) {
    console.error('Error fetching from DuckDuckGo:', error.message);
    return [];
  }
}

// API route to handle search requests
app.post('/search', async (req, res) => {
  const query = req.body.query;
  if (!query) {
    return res.status(400).send({ error: 'Query is required' });
  }

  // Fetch results from multiple search engines concurrently
  const [bingResults, googleResults, yahooResults, duckDuckGoResults] = await Promise.all([
    searchBing(query),
    searchGoogle(query),
    searchYahoo(query),
    searchDuckDuckGo(query)
  ]);

  // Combine the results
  const combinedResults = [
    ...bingResults,
    ...googleResults,
    ...yahooResults,
    ...duckDuckGoResults
  ];

  res.json(combinedResults);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
