<script>
    let query = '';
    let results = [];
    let loading = false;

    // Function to call the backend API
    async function search() {
        if (!query) return;
        loading = true;

        const response = await fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });

        const data = await response.json();
        results = data;
        loading = false;
    }
</script>

<main>
    <header>
        <h1>Web Search Aggregator</h1>
        <p>Search anything from jobs to random stuff from across the web.</p>
    </header>

    <div class="search-box">
        <input type="text" bind:value={query} placeholder="Search for anything..." />
        <button on:click={search}>Search</button>
    </div>

    {#if loading}
        <div class="loading">Loading...</div>
    {/if}

    {#if results.length > 0}
        <h2>Search Results</h2>
        <ul class="results-list">
            {#each results as result}
                <li class="result-item">
                    <a href={result.link} target="_blank">
                        <h3>{result.title}</h3>
                    </a> ({result.source})
                    <p>{result.snippet || 'No description available'}</p>
                </li>
            {/each}
        </ul>
    {/if}
</main>

<style>
    main {
        padding: 2em;
        max-width: 900px;
        margin: 0 auto;
        font-family: 'Arial', sans-serif;
    }

    header {
        text-align: center;
        margin-bottom: 2em;
    }

    h1 {
        font-size: 2.5em;
        margin: 0;
        color: #333;
    }

    p {
        font-size: 1.1em;
        color: #555;
    }

    .search-box {
        display: flex;
        justify-content: center;
        margin-bottom: 2em;
    }

    input {
        width: 60%;
        padding: 1em;
        border: 2px solid #ddd;
        border-radius: 25px;
        font-size: 1.2em;
        outline: none;
    }

    button {
        padding: 0.8em 1.5em;
        margin-left: 10px;
        border: none;
        background-color: #007BFF;
        color: white;
        font-size: 1em;
        border-radius: 25px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #0056b3;
    }

    .loading {
        text-align: center;
        font-size: 1.2em;
        color: #007BFF;
    }

    h2 {
        font-size: 2em;
        margin-bottom: 1em;
        color: #333;
    }

    ul.results-list {
        list-style: none;
        padding: 0;
    }

    li.result-item {
        margin-bottom: 1.5em;
        padding: 1em;
        border: 1px solid #ddd;
        border-radius: 10px;
        background-color: #f9f9f9;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    }

    li.result-item h3 {
        margin: 0;
        font-size: 1.5em;
        color: #007BFF;
    }

    li.result-item h3:hover {
        text-decoration: underline;
    }

    li.result-item p {
        color: #555;
        margin-top: 0.5em;
    }

    /* Add responsiveness */
    @media (max-width: 768px) {
        input {
            width: 80%;
        }

        li.result-item {
            padding: 1em 0.5em;
        }

        h1 {
            font-size: 2em;
        }

        h2 {
            font-size: 1.5em;
        }
    }
</style>