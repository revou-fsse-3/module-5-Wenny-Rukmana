'use client';
import { useState, useEffect } from 'react';

import { fetchNewsByCategory } from '@/services/api';
import NewsFilter from '@/components/newsFilter/newsFilter';
import NewsTitle from '@/components/NewsTitle/newsTitle';
import PublishedDate from '@/components/publishedDate/publishedDate';
import Image from 'next/image';
import Link from 'next/link';
import NewsDesc from '@/components/NewsDescriptions/NewsDescriptions';

const Home: React.FC = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchNewsByCategory(
        selectedCategory
      );
      setNews(result);
      setLoading(false);
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFilterButtonClick = () => {
    setLoading(true);
  };

  return (
    <section className='container'>
      <div className='child-container'>
        <h1>Latest News</h1>
        <NewsFilter
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
          onFilterButtonClick={handleFilterButtonClick}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='news-grid'>
            {news.map(
              (
                {
                  title,
                  description,
                  urlToImage,
                  publishedAt,
                  url,
                },
                index
              ) => (
                <div
                  key={url || index}
                  className='news-item'
                >
                  <NewsTitle title={title} limit={39} />
                  <PublishedDate
                    publishedAt={publishedAt}
                  />
                  {urlToImage && (
                    <Image
                      src={urlToImage}
                      alt={title}
                      className='news-image'
                      width={900}
                      height={900}
                    />
                  )}
                  <NewsDesc
                    desc={description}
                    limit={100}
                  />
                  <Link
                    className='read-more'
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Read more
                  </Link>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
