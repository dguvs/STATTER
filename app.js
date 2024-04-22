const apiKey = 'YOUR_API_KEY_HERE'; // Replace this with your actual API key
const summonerName = 'SOME_SUMMONER_NAME'; // Replace this with a valid summoner name

async function fetchStats() {
    const url = `https://REGION.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayStats(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('statsContainer').innerHTML = '<p>Error loading stats.</p>';
    }
}

function displayStats(data) {
    const statsHTML = `
        <h2>Summoner: ${data.name}</h2>
        <p>Level: ${data.summonerLevel}</p>
    `;
    document.getElementById('statsContainer').innerHTML = statsHTML;
}

fetchStats();
