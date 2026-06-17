import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";
import { AiOutlineSearch } from "react-icons/ai";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));
    const searchTermLower = e.target.value.toLowerCase();
    const filtered = data.filter((movie) =>
      movie.name.toLowerCase().includes(searchTermLower)
    );
    dispatch(setFilteredMovies(filtered));
  };

  const handleGenreClick = (genreId) => {
    if(!genreId) return dispatch(setFilteredMovies(data || []));
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    if(!year) return dispatch(setFilteredMovies(data || []));
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;
      default:
        dispatch(setFilteredMovies(data || []));
        break;
    }
  };

  if(isLoading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#007aff] dark:border-[#00f2fe]"></div></div>;
  }

  return (
    <div className="min-h-screen pb-20 transition-colors duration-500">
      {/* Hero Banner Area */}
      <section className="relative min-h-[65vh] md:min-h-[60vh] w-full flex flex-col items-center justify-center pt-32 pb-12 md:pt-40 md:pb-20 overflow-hidden bg-[#f5f5f7] dark:bg-[#0a0a0f] transition-colors duration-500">
        
        {/* Modern Ambient Orbs instead of Image */}
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#007aff] dark:bg-[#00f2fe] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] md:blur-[128px] opacity-20 animate-pulse-glow transition-colors duration-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#5856d6] dark:bg-[#8a2be2] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] md:blur-[128px] opacity-20 animate-pulse-glow transition-colors duration-500" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 text-center px-4 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight text-gray-900 dark:text-white drop-shadow-lg transition-colors duration-500">
            The <span className="gradient-text">Movies</span> Hub
          </h1>
          <p className="text-base md:text-2xl text-gray-700 dark:text-gray-400 max-w-2xl mx-auto font-light transition-colors duration-500">
            Watch the Best Movies Anytime, Anywhere
          </p>
        </div>

        {/* Search & Filters */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 mt-8 md:mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="glass-dark rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col gap-4">
            
            {/* Search Bar */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <AiOutlineSearch className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full h-14 pl-12 pr-4 bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007aff] dark:focus:ring-[#00f2fe] transition-all text-lg"
                placeholder="Search for a movie..."
                value={moviesFilter.searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                className="w-full h-12 bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-300 px-4 focus:ring-2 focus:ring-[#007aff] dark:focus:ring-[#00f2fe] outline-none cursor-pointer"
                onChange={(e) => handleGenreClick(e.target.value)}
              >
                <option value="" className="text-gray-900 dark:text-white">All Genres</option>
                {genres?.map((genre) => (
                  <option key={genre._id} value={genre._id} className="text-gray-900 dark:text-white">
                    {genre.name}
                  </option>
                ))}
              </select>

              <select
                className="w-full h-12 bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-300 px-4 focus:ring-2 focus:ring-[#007aff] dark:focus:ring-[#00f2fe] outline-none cursor-pointer"
                onChange={(e) => handleYearChange(e.target.value)}
              >
                <option value="" className="text-gray-900 dark:text-white">All Years</option>
                {uniqueYears?.map((year) => (
                  <option key={year} value={year} className="text-gray-900 dark:text-white">
                    {year}
                  </option>
                ))}
              </select>

              <select
                className="w-full h-12 bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-300 px-4 focus:ring-2 focus:ring-[#007aff] dark:focus:ring-[#00f2fe] outline-none cursor-pointer"
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="" className="text-gray-900 dark:text-white">Sort By (Default)</option> 
                <option value="new" className="text-gray-900 dark:text-white">New Releases</option>
                <option value="top" className="text-gray-900 dark:text-white">Top Rated</option>
                <option value="random" className="text-gray-900 dark:text-white">Surprise Me</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="container mx-auto px-4 mt-16 lg:mt-24">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold border-l-4 border-[#007aff] dark:border-[#00f2fe] pl-3 text-gray-900 dark:text-white transition-colors duration-500">
            {filteredMovies?.length} Results Found
          </h2>
        </div>
        
        {filteredMovies?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-xl mb-2">No movies found matching your criteria.</p>
            <button 
              onClick={() => {
                dispatch(setMoviesFilter({ searchTerm: '' }));
                dispatch(setFilteredMovies(data || []));
              }}
              className="text-[#007aff] dark:text-[#00f2fe] hover:underline mt-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllMovies;
