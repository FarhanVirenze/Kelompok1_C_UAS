import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard, AiOutlinePlus, AiOutlineAppstore, AiOutlineVideoCamera, AiOutlineComment } from "react-icons/ai";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useState, useEffect } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/movies/dashboard", icon: AiOutlineDashboard },
    { name: "Create Movie", path: "/admin/movies/create", icon: AiOutlinePlus },
    { name: "Create Genre", path: "/admin/movies/genre", icon: AiOutlineAppstore },
    { name: "Update Movie", path: "/admin/movies-list", icon: AiOutlineVideoCamera },
    { name: "Comments", path: "/admin/movies/comments", icon: AiOutlineComment },
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen w-64 liquid-glass border-r border-gray-200 dark:border-white/10 z-50 flex flex-col pt-8 pb-8 transition-transform duration-300 rounded-none ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
      <div className="px-6 mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-wide transition-colors duration-500">Admin <span className="gradient-text">Panel</span></h2>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200/50 dark:bg-white/10 text-gray-800 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-white/20 transition-all"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <MdOutlineLightMode size={18} /> : <MdOutlineDarkMode size={18} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={toggleSidebar}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? "pill-active" 
                  : "text-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon size={20} className={isActive ? "text-white" : "text-gray-700 dark:text-gray-400 group-hover:text-[#007aff] dark:group-hover:text-[#00f2fe] transition-colors"} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Return to App Link */}
      <div className="px-4 mt-auto">
        <Link to="/" className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all">
           Return to App
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
