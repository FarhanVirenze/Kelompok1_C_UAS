import { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineLocalMovies, MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Theme Toggle State
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Theme
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

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) return null; // Hide top nav in all admin routes

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-[#007aff] to-[#5856d6] dark:from-accent-cyan dark:to-accent-violet p-2 rounded-lg shadow-md transition-all">
            <MdOutlineLocalMovies size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-wider text-black dark:text-white transition-colors duration-300">Watchery</span>
        </Link>

        {/* Center Links */}
        {!isAuthPage && (
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-black dark:text-gray-300 hover:text-[#007aff] dark:hover:text-white font-bold transition-colors flex items-center gap-2">
              <AiOutlineHome size={20} /> Home
            </Link>
            <Link to="/movies" className="text-black dark:text-gray-300 hover:text-[#007aff] dark:hover:text-white font-bold transition-colors flex items-center gap-2">
              <MdOutlineLocalMovies size={20} /> Movies
            </Link>
          </div>
        )}

        {/* Right Side Items */}
        <div className="flex items-center gap-4 relative">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-white/50 dark:bg-white/10 text-gray-900 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-all shadow-sm"
            title="Toggle Light/Dark Mode"
          >
            {theme === 'dark' ? <MdOutlineLightMode size={22} /> : <MdOutlineDarkMode size={22} />}
          </button>

          {/* User Menu */}
          {userInfo ? (
            <button onClick={toggleDropdown} className="flex items-center gap-2 text-gray-800 dark:text-white bg-white/50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 transition-all shadow-sm">
              <span className="font-medium text-sm">{userInfo.username}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="text-gray-700 dark:text-white hover:text-[#007aff] dark:hover:text-accent-cyan transition-colors flex items-center gap-2">
                <AiOutlineLogin size={20} /> <span className="hidden sm:inline">Login</span>
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-[#007aff] to-[#5856d6] dark:from-accent-cyan dark:to-accent-violet hover:opacity-90 text-white px-4 py-2 rounded-full transition-all flex items-center gap-2 shadow-md">
                <AiOutlineUserAdd size={20} /> <span className="hidden sm:inline">Register</span>
              </Link>
            </div>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && userInfo && (
            <ul className="absolute right-0 top-12 mt-3 w-48 glass border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden animate-slide-up origin-top-right">
              {userInfo.isAdmin && (
                <li>
                  <Link onClick={() => setDropdownOpen(false)} to="/admin/movies/dashboard" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    Admin Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link onClick={() => setDropdownOpen(false)} to="/profile" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  Profile Settings
                </Link>
              </li>
              <li className="border-t border-gray-200 dark:border-white/10 mt-1">
                <button onClick={logoutHandler} className="block w-full text-left px-4 py-3 text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      
      {/* Mobile Nav Links (bottom sheet style or simplified inline) */}
      {!isAuthPage && (
        <div className="md:hidden flex justify-center gap-8 mt-3 border-t border-gray-200 dark:border-white/5 pt-3">
           <Link to="/" className="text-black dark:text-gray-300 hover:text-[#007aff] dark:hover:text-white font-bold flex items-center gap-2 text-sm">
             <AiOutlineHome size={18} /> Home
           </Link>
           <Link to="/movies" className="text-black dark:text-gray-300 hover:text-[#007aff] dark:hover:text-white font-bold flex items-center gap-2 text-sm">
             <MdOutlineLocalMovies size={18} /> Movies
           </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
