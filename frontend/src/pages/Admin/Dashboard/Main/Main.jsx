import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";

import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div className="transition-colors duration-500">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-[#007aff] dark:border-[#00f2fe] pl-4 transition-colors duration-500">Dashboard Overview</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Stats & Top Content */}
        <div className="flex-1">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
            <SecondaryCard
              pill="Users"
              content={visitors?.length || 0}
              info="Total registered users"
              gradient="from-[#007aff] to-[#5ac8fa]"
              icon="user"
            />
            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength || 0}
              info="User engagement"
              gradient="from-[#5856d6] to-[#af52de]"
              icon="comment"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length || 0}
              info="Total movies available"
              gradient="from-[#34c759] to-[#30d158]"
              icon="movie"
            />
          </div>

          {/* Top Content List */}
          <div className="liquid-glass rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-white/10 transition-colors duration-500">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-500">Top Performing Content</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors duration-500">Comments</span>
            </div>

            <div className="space-y-4">
              {topMovies?.map((movie) => (
                <VideoCard
                  key={movie._id}
                  image={movie.image}
                  title={movie.name}
                  date={movie.year}
                  comments={movie.numReviews}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Realtime */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
          <RealTimeCard visitors={visitors} />
        </div>
      </div>
    </div>
  );
};

export default Main;
