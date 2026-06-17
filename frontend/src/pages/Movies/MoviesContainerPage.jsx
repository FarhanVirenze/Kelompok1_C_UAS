import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  return (
    <div className="flex flex-col gap-10">
      {/* Movie Sections */}
      <section className="flex flex-col gap-12 w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="w-full">
          <h2 className="text-2xl font-black mb-6 text-black dark:text-white border-l-4 border-[#007aff] dark:border-[#00f2fe] pl-3 transition-colors duration-500">Top Movies</h2>
          <div className="w-full">
            <SliderUtil data={topMovies} />
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-2xl font-black mb-6 text-black dark:text-white border-l-4 border-[#5856d6] dark:border-[#8a2be2] pl-3 transition-colors duration-500">Chosen For You</h2>
          <div className="w-full">
            <SliderUtil data={randomMovies} />
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-2xl font-black mb-6 text-black dark:text-white border-l-4 border-[#34c759] dark:border-[#00f2fe] pl-3 transition-colors duration-500">New Releases</h2>
          <div className="w-full">
            <SliderUtil data={newMovies} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
