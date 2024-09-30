import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = 'us', category = 'general', pageSize = 9, mode = 'light' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=ba1bb73b7d0249f4a925901568d6d4ad&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error('Unauthorized');
      }
      let parsedData = await response.json();
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching the news:", error);
      setArticles([]); // Reset articles on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateNews();
  }, [country, category, pageSize, page]);

  const fetchMoreData = async () => {
    const nextPage = page + 1; // Calculate next page
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=ba1bb73b7d0249f4a925901568d6d4ad&page=${nextPage}&pageSize=${pageSize}`;

    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error('Unauthorized');
      }
      let parsedData = await response.json();
      setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults);
      setPage(nextPage); // Update page state
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  return (
    <div className={`container my-8  text-${mode === 'light' ? 'dark' : 'light'} pt-5`}>
      <h1 className={`text-center  font-bold text-${mode === 'light' ? 'dark' : 'light'} mt-5 my-20`}>
        NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {articles.map((element) => (
            <div className="col-12 col-sm-6 col-md-4 my-3" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  mode: PropTypes.string,
};

export default News;
