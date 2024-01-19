'use client';
import { useState, useEffect, useCallback } from 'react';

import SearchInput from '../SearchInput/SearchInput';
import NewsList from '../NewsLists/NewsLists';
import { fetchNewsByCategory } from '@/services/api';

interface Article {
  title: string;
  description: string;
  url: string;
}

const SearchPage = () => {
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
  }, [searchQuery]); // Dependency array

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
    fetchData();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, fetchData]);

  return (
    <main className='content-container'>
      <SearchInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onClick={handleSearch}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <NewsList newsData={newsData} />
      )}
    </main>
  );
};

export default SearchPage;
