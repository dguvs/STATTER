document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const accountName = document.getElementById('searchInput').value.trim();
    if (!accountName) {
        alert('Please enter an account name.');
        return;
    }

    // Store the account name in sessionStorage or localStorage
    sessionStorage.setItem('accountName', accountName);

    // Redirect to the statistics page
    window.location.href = 'stats.html';
});
