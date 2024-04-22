document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const accountName = document.getElementById('searchInput').value.trim();
    const selectedRegion = document.getElementById('regionSelect').value.trim();

    if (!accountName || !selectedRegion) {
        alert('Please enter an account name and select a region.');
        return;
    }

    sessionStorage.setItem('accountName', accountName);
    sessionStorage.setItem('region', selectedRegion);

    window.location.href = 'stats.html';
});
