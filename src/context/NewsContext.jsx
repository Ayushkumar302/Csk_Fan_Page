import  { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const API_KEY = "1393fbda3fbb402ab97e3c5fe87c91d8"; 
    const newsUrl = `https://newsapi.org/v2/everything?q=CSK&apiKey=${API_KEY}`;

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get(newsUrl);
            if (response.data && response.data.articles) {
                setArticles(response.data.articles);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <NewsContext.Provider value={{ articles, loading }}>
            {children}
        </NewsContext.Provider>
    );
};

export const useNews = () => {
    return useContext(NewsContext);
};
