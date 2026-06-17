import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="relative group w-full px-1 sm:px-2 py-4">
      <Link 
        to={`/movies/${movie._id}`} 
        className="block relative overflow-hidden rounded-2xl shadow-md dark:shadow-lg transition-all duration-300 transform origin-center group-hover:scale-110 group-hover:z-[100] hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(0,242,254,0.4)]"
      >
        {/* Aspect Ratio Container for Poster (2:3) */}
        <div className="relative pt-[150%] bg-gray-200 dark:bg-[#0f0f14]">
          <img
            src={movie.image || "https://via.placeholder.com/500x750?text=No+Poster"}
            alt={movie.name}
            className="absolute top-0 left-0 w-full h-full object-cover transition duration-500 ease-in-out"
            loading="lazy"
          />
          
          {/* Netflix-style subtle bottom gradient and text only on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-3">
            <h3 className="text-white font-bold text-sm sm:text-base leading-tight drop-shadow-md line-clamp-2">{movie.name}</h3>
            <p className="text-[#007aff] dark:text-[#00f2fe] text-xs font-semibold mt-1 drop-shadow-md">{movie.year}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
