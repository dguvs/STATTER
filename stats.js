document.addEventListener('DOMContentLoaded', function() {
    const accountName = sessionStorage.getItem('accountName');
    if (!accountName) {
        document.getElementById('results').innerHTML = '<p>No account information found. Please search again.</p>';
        return;
    }

    fetchPlayerStats(accountName);
});

function fetchPlayerStats(accountName) {
    const playerStats = {
        rank: 'Gold IV',
        gamesPlayed: 342,
        highestWinRateChampion: {
            name: 'Yasuo',
            winRate: '57%'
        }
    };

    displayStats(playerStats);
}

function displayStats(stats) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>Rank: ${stats.rank}</p>
                            <p>Games Played: ${stats.gamesPlayed}</p>
                            <p>Highest Win Rate Champion: ${stats.highestWinRateChampion.name} - ${stats.highestWinRateChampion.winRate}</p>`;
}
