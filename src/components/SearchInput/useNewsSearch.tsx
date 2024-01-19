import { useState, useEffect, useCallback } from 'react';
import { fetchNewsByCategory } from '../../services/api';

const useNewsSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newsData, setNewsData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let data: Article[] = await fetchNewsByCategory('');

      if (searchQuery !== '') {
        data = data.filter((article) =>
          article.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      }

      console.log('API Response:', data);
      setNewsData(data);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(
        'Error fetching news. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData, searchQuery]); // Include searchQuery as a dependency

  return {
    searchQuery,
    setSearchQuery,
    newsData,
    loading,
    error,
    fetchData,
  };
};

export default useNewsSearch;
