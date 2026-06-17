import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Sidebar from "./Dashboard/Sidebar/Sidebar";
import { AiOutlineMenu } from "react-icons/ai";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!userInfo || !userInfo.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5f7] dark:bg-dark-400 transition-colors duration-500">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 ml-0 md:ml-64 transition-all duration-300 flex flex-col min-h-screen">
        {/* Mobile Header for Toggle */}
        <div className="md:hidden flex items-center justify-between p-4 liquid-glass z-30 sticky top-0 shadow-sm border-b border-gray-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Admin <span className="gradient-text">Panel</span></h2>
          <button onClick={toggleSidebar} className="p-2 rounded-lg bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white transition-colors">
            <AiOutlineMenu size={24} />
          </button>
        </div>

        <div className="flex-1 w-full relative p-4 md:p-8 overflow-y-auto">
           <Outlet />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};
export default AdminRoute;
