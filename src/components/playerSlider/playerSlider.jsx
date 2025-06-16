import { Swiper, SwiperSlide } from "swiper/react";
import { players } from "../../assets/data/players";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  
} from "@material-tailwind/react";

const PlayerSlider = () => {
  return (
    <section id="players" className="bg-white">
      <div className="container mx-auto py-12 ">
        <h2 className="text-4xl font-bold text-center mb-8 text-primaryColor">
          CSK Players
        </h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper "
        >
          {players.map((player, index) => (
            <SwiperSlide key={player.id || index}>
              <Card
                shadow={false}
                className="relative bg-yellow-300 grid h-[20rem] w-full max-w-[28rem] items-end justify-center 
                overflow-hidden text-center border-2 border-solid  border-yellow-800 rounded-2xl"
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                  style={{ backgroundImage: `url(${player.photo})` }}
                >
                  <div className="absolute bottom-0 h-[100px] w-full bg-gradient-to-t from-[#00509E]/90 via-[#00509E]/50" />
                </CardHeader>
                <CardBody className="absolute bottom-0 left-0 py-4 px-4 md:py-6 md:px-8 lg:py-10 lg:px-10">
                  <Typography
                    variant="h5"
                    className="text-white text-[16px] sm:text-[18px] md:text-[20px] lg:text-[20px] mb-2 sm:mb-3 md:mb-1"
                  >
                    {player.name}
                  </Typography>
                </CardBody>

                <Typography className="absolute bottom-0 left-4 py-2 px-2 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-white">
                  {player.role}
                </Typography>

                <Button
                  variant="link"
                  className="absolute bottom-0 right-0 py-2 px-2 text-white font-semibold text-[12px] sm:text-[14px] md:text-[15px]"
                >
                  <a href="">View Profile</a>
                </Button>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PlayerSlider;


