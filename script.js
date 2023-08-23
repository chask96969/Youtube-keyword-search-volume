const API_KEY = 'AIzaSyAj606So8owXHI4hY8Z-Sknwpt9nQtmPKs';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');

searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        try {
            const today = new Date();
            const lastYear = new Date();
            lastYear.setFullYear(today.getFullYear() - 1);

            const searchIntervals = generateSearchIntervals(today, lastYear, 12);
            const averageSearchCount = await calculateAverageSearchCount(searchTerm, searchIntervals);

            const averageResultsElement = document.createElement('p');
            averageResultsElement.textContent = `Average search count for the past year: ${averageSearchCount}`;
            averageResultsElement.classList.add('result');
            resultContainer.innerHTML = '';
            resultContainer.appendChild(averageResultsElement);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
});

async function calculateAverageSearchCount(searchTerm, searchIntervals) {
    let totalSearchCount = 0;

    for (const interval of searchIntervals) {
        const response = await fetch(`${BASE_URL}?q=${searchTerm}&key=${API_KEY}&publishedAfter=${interval.publishedAfter}&publishedBefore=${interval.publishedBefore}`);
        const data = await response.json();

        if (data.items) {
            totalSearchCount += data.pageInfo.totalResults;
        }
    }

    return totalSearchCount / searchIntervals.length;
}

function generateSearchIntervals(startDate, endDate, intervalCount) {
    const intervals = [];

    const totalDuration = endDate.getTime() - startDate.getTime();
    const intervalDuration = totalDuration / intervalCount;

    for (let i = 0; i < intervalCount; i++) {
        const intervalStart = new Date(startDate.getTime() + (i * intervalDuration));
        const intervalEnd = new Date(intervalStart.getTime() + intervalDuration);

        intervals.push({
            publishedAfter: intervalStart.toISOString(),
            publishedBefore: intervalEnd.toISOString()
        });

        startDate.setMonth(startDate.getMonth() + 1);
    }
    console.log(intervals)
    return intervals;
}





