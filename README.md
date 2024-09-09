Svelte Web Search Aggregator
A web search aggregator built using Svelte for the frontend and Express.js for the backend. This app aggregates search results from Google and Bing using their respective APIs, displaying them in a clean, responsive interface.

Features
Fetches and displays search results from Google and Bing.
Displays search result titles, links, and descriptions/snippets.
Responsive design using Svelte.
Supports searching for various types of information (jobs, general topics, etc.).
Supports loading more than 10 results from both search engines.
Technologies Used
Frontend: Svelte, Rollup
Backend: Express.js, Axios
API Integration: Google Custom Search API, Bing Web Search API
Requirements
Node.js (v14.x or higher)
npm or yarn
API keys for:
Google Custom Search
Bing Web Search
Getting Started
1. Clone the repository
bash

git clone https://github.com/yourusername/svelte-web-search-aggregator.git
cd svelte-web-search-aggregator
2. Backend Setup
Go to the backend directory:

bash

cd backend
Install dependencies:

bash

npm install
Create a .env file in the backend directory and add your API keys:

bash

BING_API_KEY=your_bing_api_key
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CX=your_google_custom_search_engine_cx
Start the backend server:

bash

npm start
The server will run on http://localhost:3000.

3. Frontend Setup
Go to the frontend directory:

bash

cd ../frontend
Install dependencies:

bash

npm install
Run the frontend development server:

bash

npm run dev
The frontend will be accessible on http://localhost:5000.

Usage
Open http://localhost:5000 in your browser.
Enter any search query (e.g., "careers", "technology", etc.) in the search bar.
Press Search to fetch results from Google and Bing.
Results will be displayed with titles, descriptions, and source links.
Project Structure
php

svelte-web-search-aggregator/
│
├── backend/              # Backend server files
│   ├── server.js         # Express server with API integration
│   └── .env.example      # Example environment variables file
│
├── frontend/             # Frontend Svelte app
│   ├── src/              # Svelte components
│   ├── public/           # Public assets (index.html, bundle.js)
│   └── rollup.config.js  # Rollup configuration for bundling
│
├── README.md             # Project documentation
└── package.json          # Main project configuration
Environment Variables
Make sure to create a .env file in the backend directory with the following:

makefile

BING_API_KEY=your_bing_api_key
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CX=your_google_custom_search_engine_cx
You can obtain your API keys from:

Google Custom Search
Bing Web Search
Scripts
Backend:

npm start – Runs the Express server on http://localhost:3000
Frontend:

npm run dev – Starts the frontend development server on http://localhost:5000
npm run build – Builds the frontend for production
License
This project is licensed under the MIT License. See the LICENSE file for details.
