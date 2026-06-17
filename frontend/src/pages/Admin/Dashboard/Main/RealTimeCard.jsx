import { useGetUsersQuery } from "../../../../redux/api/users";
import PrimaryCard from "./PrimaryCard";
import { AiOutlineGlobal } from "react-icons/ai";

const RealTimeCard = ({ visitors }) => {
  return (
    <div className="liquid-glass rounded-2xl p-6 border-t-4 border-t-[#5856d6] dark:border-t-[#8a2be2] transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 transition-colors duration-500">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007aff] dark:bg-[#00f2fe] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#007aff] dark:bg-[#00f2fe]"></span>
            </span>
            Realtime Traffic
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-500">Live updates</p>
        </div>
        <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg transition-colors duration-500">
          <AiOutlineGlobal className="text-[#5856d6] dark:text-[#8a2be2] text-xl" />
        </div>
      </div>

      <div className="mb-8 border-b border-gray-200 dark:border-white/10 pb-6 transition-colors duration-500">
        <div className="flex items-baseline gap-2">
          <h2 className="text-5xl font-extrabold gradient-text">
            {visitors?.length || 0}
          </h2>
          <span className="text-gray-500 dark:text-gray-400 font-medium transition-colors duration-500">Active Users</span>
        </div>
      </div>

      <PrimaryCard visitors={visitors} />
    </div>
  );
};

export default RealTimeCard;
