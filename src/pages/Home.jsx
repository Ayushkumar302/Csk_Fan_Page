import { Button } from "@/components/ui/button";
import bgImg from "../assets/Images/bg.jpg";
import homeImg from "../assets/Images/pngegg.png";
import PlayerSlider from "@/components/playerSlider/playerSlider";
import { RiArrowDownWideFill } from "react-icons/ri";
import { useNews } from "../context/NewsContext";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from "@mui/material";

const Home = () => {
  const { articles, loading } = useNews();

  return (
    <>
      <div className="bg-gray-100">
        {/* Hero Section */}
        <div
          className="relative w-full h-[100vh] bg-cover bg-center "
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <div className="px-[20px] pt-[40px] max-w-[1170px] w-full flex flex-col sm:flex-row items-center justify-between m-auto relative">
            <div className="sm:basis-1/2 text-left z-10">
              <h1 className="font-[500] sm:text-[40px] leading-[35px] sm:leading-[46px] mt-5 text-white">
                Welcome to the <br />{" "}
                <span className="font-[900] text-black">
                  Chennai Super Kings
                </span>{" "}
                <br /> Fan Hub
              </h1>
              <p className="mt-4 font-semibold text-lg sm:text-xl text-white mb-4">
                Stay updated with the latest news, match schedules, and connect
                with fellow CSK fans!
              </p>
              <Button>
                <Link to="/schedule">Check Match Schedule</Link>
              </Button>
            </div>

            <div
              className="sm:basis-1/2 mt-10 sm:mt-0 flex justify-center z-10"
              data-aos="zoom-in-up"
            >
              <figure className="flex items-center justify-center">
                <img
                  src={homeImg}
                  alt="CSK Fan Hub Image"
                  className="max-h-[400px] max-w-[500px] rounded-full"
                />
              </figure>
            </div>
          </div>

          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="hidden md:flex items-center justify-center pt-20">
            <a href="#players">
              <RiArrowDownWideFill className="text-3xl text-smallTextColor animate-bounce text-primaryColor" />
            </a>
          </div>
        </div>

        {/* Players Section */}
        <PlayerSlider />
      </div>
      {/* News Section */}
      <section className="bg-slate-50">
      <div className="container mx-auto py-8 ">
        <h2 className="text-2xl font-bold text-center mb-4 text-primaryColor">Latest News</h2>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress size={80} />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {articles.slice(0, 9).map((article, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      article.urlToImage ||
                      "https://via.placeholder.com/300x200"
                    }
                    alt={article.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained" size="small" color="primary">
                        Read More
                      </Button>
                    </a>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Link to="/news">
            <Button variant="contained">See More</Button>
          </Link>
        </Box>
      </div>
      </section>

    </>
  );
};

export default Home;
