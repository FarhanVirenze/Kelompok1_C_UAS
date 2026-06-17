import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import { AiOutlineArrowLeft } from "react-icons/ai";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch, isLoading } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();
      toast.success("Review created successfully", { theme: "dark" });
      setComment(""); // clear comment after submit
    } catch (error) {
      toast.error(error.data || error.message, { theme: "dark" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#007aff] dark:border-[#00f2fe]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 animate-fade-in -mt-20 transition-colors duration-500">
      {/* Hero Backdrop Area */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie?.image || "https://via.placeholder.com/1920x1080?text=No+Image"})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 dark:from-[#0a0a0f] dark:via-[#0a0a0f]/80 to-transparent transition-colors duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 dark:from-[#0a0a0f] dark:via-[#0a0a0f]/60 to-transparent transition-colors duration-500"></div>
        
        {/* Back Button */}
        <div className="absolute top-24 left-4 md:left-12 z-20">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-700 dark:text-white/80 hover:text-[#007aff] dark:hover:text-[#00f2fe] font-semibold transition-colors bg-white/40 dark:bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-gray-300 dark:border-white/10 hover:border-[#007aff]/50 dark:hover:border-[#00f2fe]/50"
          >
            <AiOutlineArrowLeft /> Go Back
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 -mt-[30vh] md:-mt-[40vh]">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Poster Image */}
          <div className="w-[60%] md:w-1/3 lg:w-1/4 mx-auto md:mx-0 flex-shrink-0">
            <img
              src={movie?.image || "https://via.placeholder.com/500x750?text=No+Poster"}
              alt={movie?.name}
              className="w-full rounded-2xl shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-white/10 transition-colors duration-500"
            />
          </div>

          {/* Details */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-end pt-4 md:pt-20">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 drop-shadow-lg transition-colors duration-500">
              {movie?.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-gradient-to-r from-[#007aff] to-[#5856d6] dark:from-[#00f2fe] dark:to-[#8a2be2] text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                {movie?.year}
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-4xl transition-colors duration-500">
              {movie?.detail}
            </p>

            {/* Cast Section */}
            {movie?.cast && movie.cast.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 transition-colors duration-500">
                  <span className="w-2 h-6 bg-[#007aff] dark:bg-[#00f2fe] rounded-full"></span>
                  Top Cast
                </h3>
                <div className="flex flex-wrap gap-3">
                  {movie.cast.map((c) => (
                    <span key={c._id || c} className="bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 backdrop-blur-md transition-colors duration-500">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 md:mt-24 border-t border-gray-200 dark:border-white/10 pt-12 transition-colors duration-500">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-[#007aff] dark:border-[#00f2fe] pl-3 transition-colors duration-500">
            Audience Reviews
          </h2>
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
