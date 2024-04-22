document.addEventListener('DOMContentLoaded', function() {
    const accountName = sessionStorage.getItem('accountName');
    if (!accountName) {
        document.getElementById('results').innerHTML = '<p>No account information found. Please search again.</p>';
        return;
    }

    fetchPlayerStats(accountName);
});

function fetchPlayerStats(accountName) {
    const apiKey = 'RGAPI-22c223bb-858a-4a4d-8e9d-c2ee69eb6cfe'; // Replace with your actual API key
    const region = sessionStorage.getItem('region'); // Get the region from session storage

    // First, fetch the summoner data to get the PUUID (Player Universally Unique Identifier)
    fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${accountName}?api_key=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch summoner data');
            }
            return response.json();
        })
        .then(data => {
            const puuid = data.puuid;

            // Then, use the PUUID to fetch the match data
            return fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${apiKey}`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch match data');
            }
            return response.json();
        })
        .then(data => {
            // Now you have the match data, you can process it as needed
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('results').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

function displayStats(stats) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>Rank: ${stats.rank}</p>
                            <p>Games Played: ${stats.gamesPlayed}</p>
                            <p>Highest Win Rate Champion: ${stats.highestWinRateChampion.name} - ${stats.highestWinRateChampion.winRate}</p>`;
}
