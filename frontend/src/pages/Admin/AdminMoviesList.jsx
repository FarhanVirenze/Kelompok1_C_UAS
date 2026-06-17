import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="p-6 md:p-10 pt-24 min-h-screen transition-colors duration-500">
      <div className="flex items-center justify-between mb-8 border-l-4 border-[#007aff] dark:border-[#00f2fe] pl-4 transition-colors duration-500">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-500">
          Manage Movies
        </h1>
        <span className="bg-gray-100 dark:bg-[#15151c] text-[#007aff] dark:text-[#00f2fe] px-3 py-1 rounded-full text-sm font-semibold border border-gray-200 dark:border-white/10 transition-colors duration-500">
          Total: {movies?.length || 0}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {movies?.map((movie) => (
          <Link
            key={movie._id}
            to={`/admin/movies/update/${movie._id}`}
            className="block group"
          >
            <div className="liquid-glass rounded-2xl overflow-hidden h-full flex flex-col hover:border-[#007aff]/50 dark:hover:border-[#00f2fe]/50 transition-all duration-300 transform group-hover:-translate-y-2">
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h2 className="text-2xl font-bold text-white truncate drop-shadow-md">{movie.name}</h2>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1 transition-colors duration-500">
                  {movie.detail}
                </p>

                <div className="mt-auto">
                  <button className="w-full bg-gray-100 dark:bg-white/5 hover:bg-gradient-to-r hover:from-[#007aff] hover:to-[#5856d6] dark:hover:from-[#00f2fe] dark:hover:to-[#8a2be2] border border-gray-200 dark:border-white/10 hover:border-transparent text-gray-700 dark:text-white hover:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-sm group-hover:shadow-lg">
                    Edit Movie
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminMoviesList;
