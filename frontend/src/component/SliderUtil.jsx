import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

const SliderUtil = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500 py-10 px-4">No movies found.</div>;
  }

  const settings = {
    dots: false, // Netflix style removes dots
    infinite: data.length > 6,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: data.length > 5,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: data.length > 4,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: data.length > 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3, // Smaller images on mobile
          slidesToScroll: 1,
          infinite: false,
        }
      }
    ]
  };

  return (
    <div className="slider-container px-6 sm:px-12 group/slider relative">
      <Slider {...settings}>
        {data.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

export default SliderUtil;
