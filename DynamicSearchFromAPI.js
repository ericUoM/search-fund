document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById('search-box');
    const searchResults = document.getElementById('search-results');
    let timeout = null;

    searchBox.addEventListener('input', function() {
        clearTimeout(timeout);
        const query = searchBox.value;

        if (query.length > 2) { // Add a minimum length check to reduce API calls
            timeout = setTimeout(() => searchFunds(query), 300); // Delay to reduce API calls
        } else {
            searchResults.innerHTML = ''; // Clear results if query is too short
        }
    });

    async function searchFunds(query) {
        try {
            const response = await fetch(`https://api.sky.blackbaud.com/fundraising/v1/funds?searchText=${query}`, {
                method: 'GET',
                headers: {
                    'Bb-Api-Subscription-Key': '64910b8dccc84ecbac9f2e0c94323929',
                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjREVjZzVkxIM0FtU1JTbUZqMk04Wm5wWHU3WSIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvbmlkIjoiYTA1NmNhNmItYTNhOC00YWM3LWIzMjUtOTk3NjY2MzA2ZTUyIiwiZW52aXJvbm1lbnRpZCI6InAtU2xOVnB3ZWl2MFNXRFZCbVVuN2ZqdyIsImVudmlyb25tZW50bmFtZSI6IlVuaXZlcnNpdHkgb2YgTWFuaXRvYmEgVGVzdCBFbnZpcm9ubWVudCIsImxlZ2FsZW50aXR5aWQiOiJwLS1pNXZlU3JHZWtpQ21RVXR2OFNNWWciLCJsZWdhbGVudGl0eW5hbWUiOiJVbml2ZXJzaXR5IG9mIE1hbml0b2JhIiwibW9kZSI6IkZ1bGwiLCJ6b25lIjoicC1jYW4wMSIsIm5hbWVpZCI6IjA5MGJhMWRiLWNhYWQtNGIyZC1iOTZiLTQzMmFhYmI4Yjk1MiIsImp0aSI6IjA4YTVjZTI0LTdlNjMtNDlmMS1hZGNjLWQ5ZTVhZGU0YzNiZiIsImV4cCI6MTcxODI1NDkwNiwiaWF0IjoxNzE4MjUxMzA2LCJpc3MiOiJodHRwczovL29hdXRoMi5za3kuYmxhY2tiYXVkLmNvbS8iLCJhdWQiOiJibGFja2JhdWQifQ.IHzw0j5fwc_j_aAqUgk8C90Ubhts-fBGgAn11VidQKE6mwfBoNz5q-G81QE8aHreTK_FLMooQyXlKQnsev-FXZe5ba9pRXk1z7C6xyhBgIPPlM_e2SA3JPU91AGuwHQJ-suH4_veEuCNnbD2kL0FJkDJmhwK_SdXPmC2x0zOzzbpVqWORM6pMUqRvjae4DPiHy2pKtJd_GehEeeUO9veoNgTBDroYfNRkuASrTV-nYKmu6YpQet6DKq0H-6uzyHJWflh8p4kISzvF9Lubb5OyENCUSjovfXv_kchNBMos8FGEAGj5cmTxKyy-3h1xT9WfdNQBc3MTmkqEWqXioGEYA'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            displayResults(data.value);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    function displayResults(funds) {
        searchResults.innerHTML = '';
        if (funds.length === 0) {
            searchResults.innerHTML = '<p>No funds found.</p>';
            return;
        }

        const ul = document.createElement('ul');
        funds.forEach(fund => {
            const li = document.createElement('li');
            li.textContent = `${fund.name} (ID: ${fund.id})`;
            ul.appendChild(li);
        });
        searchResults.appendChild(ul);
    }
});
