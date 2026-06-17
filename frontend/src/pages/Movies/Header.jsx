import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";

const Header = () => {
  const { data, isLoading } = useGetNewMoviesQuery();

  if (isLoading) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#007aff] dark:border-[#00f2fe]"></div>
      </div>
    );
  }

  return (
    <div className="w-full relative px-4 md:px-12 pt-28 pb-6 md:pt-26 overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-200 to-transparent dark:from-[#0f0f14] dark:to-transparent opacity-80 dark:opacity-50 z-0 transition-colors duration-500"></div>
      <div className="relative z-10 w-full animate-slide-up">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white border-l-4 border-[#007aff] dark:border-[#00f2fe] pl-3 transition-colors duration-500">New Releases</h2>
        <div className="w-full">
          <SliderUtil data={data} />
        </div>
      </div>
    </div>
  );
};

export default Header;
