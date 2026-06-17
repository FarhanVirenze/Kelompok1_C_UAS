import { AiOutlineComment } from "react-icons/ai";

const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="group flex items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-white/10 cursor-pointer">
      <div className="flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden shadow-md">
        <img 
          src={image || "https://via.placeholder.com/150"} 
          alt={title} 
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
      </div>

      <div className="ml-4 flex-1 min-w-0">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white truncate transition-colors duration-500">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-500">{date}</p>
      </div>

      <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#15151c] px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/5 transition-colors duration-500">
        <AiOutlineComment className="text-[#007aff] dark:text-[#00f2fe]" />
        <span className="text-gray-900 dark:text-white font-medium transition-colors duration-500">{comments}</span>
      </div>
    </div>
  );
};

export default VideoCard;
