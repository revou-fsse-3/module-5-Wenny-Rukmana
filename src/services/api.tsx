'use server';
import axios from 'axios';

const apiKey = '30056a2197834336b064fdd8203454ee';

const fetchNewsByCategory = async (
  selectedCategory: string
) => {
  try {
    let apiUrls = [];

    if (selectedCategory === '') {
      // Fetch news from all categories or provide a default category
      apiUrls = [
        `https://newsapi.org/v2/top-headlines?country=us&category=apple&apiKey=${apiKey}`,
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`,
        `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`,
      ];
    } else {
      switch (selectedCategory) {
        case 'apple':
          apiUrls.push(
            `https://newsapi.org/v2/everything?q=apple&from=2024-01-11&to=2024-01-11&sortBy=popularity&apiKey=${apiKey}`
          );
          break;

        case 'business':
          apiUrls.push(
            `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`
          );
          break;
        case 'tech':
          apiUrls.push(
            `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`
          );
          break;
        default:
          console.error('Invalid category');
          return [];
      }
    }

    const responses = await Promise.all(
      apiUrls.map((url) => axios.get(url))
    );

    // Combine the results from all requests into a single array
    return responses.reduce(
      (accumulator, response) =>
        accumulator.concat(response.data.articles),
      []
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export { fetchNewsByCategory };
