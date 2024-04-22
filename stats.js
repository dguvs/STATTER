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

    // First, fetch the summoner data to get the account ID
    fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${accountName}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const accountId = data.accountId;

            // Then, use the account ID to fetch the match data
            return fetch(`https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${apiKey}`);
        })
        .then(response => response.json())
        .then(data => {
            // Now you have the match data, you can process it as needed
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayStats(stats) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>Rank: ${stats.rank}</p>
                            <p>Games Played: ${stats.gamesPlayed}</p>
                            <p>Highest Win Rate Champion: ${stats.highestWinRateChampion.name} - ${stats.highestWinRateChampion.winRate}</p>`;
}
