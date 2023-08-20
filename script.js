const API_KEY = //APIKEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');

searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        try {
            const response = await fetch(`${BASE_URL}?q=${searchTerm}&key=${API_KEY}`);
            const data = await response.json();
            const totalResultsElement = document.createElement('p');
            if (data.items) {
                const pageInfo = data.pageInfo;
                totalResultsElement.textContent = `It has been searched for ${pageInfo.totalResults} times`;
            }
            else {
                totalResultsElement.textContent = 'Seems like you have exceeded the daily limit';
            }
            totalResultsElement.classList.add('result'); 
            resultContainer.innerHTML = '';
            resultContainer.appendChild(totalResultsElement);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
});


