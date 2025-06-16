import { useState } from 'react';
import { useNews } from '../context/NewsContext'; 
import {
  CircularProgress,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  CardActionArea
} from '@mui/material';

const News = () => {
  const { articles, loading } = useNews();
  const [visibleArticles, setVisibleArticles] = useState(12);

  const loadMoreArticles = () => {
    setVisibleArticles((prev) => prev + 12);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-4">Latest News</h2>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="500px">
          <CircularProgress size={80} />
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {articles.slice(0, visibleArticles).map((article, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <CardActionArea sx={{ flexGrow: 1 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={article.urlToImage || 'https://via.placeholder.com/300x200'}
                      alt={article.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href={article.url} target="_blank">
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {visibleArticles < articles.length && (
            <Box display="flex" justifyContent="center" marginTop={4}>
              <Button variant="contained" color="primary" onClick={loadMoreArticles}>
                Load More
              </Button>
            </Box>
          )}
        </>
      )}
    </div>
  );
};

export default News;
