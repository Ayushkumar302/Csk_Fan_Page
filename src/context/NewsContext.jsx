import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: 'CSK',
          apiKey: API_KEY,
        },
      });
      setArticles(data?.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const value = { articles, loading };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export const useNews = () => useContext(NewsContext);
