import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { theme: "dark" });
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered.", { theme: "dark" });
      } catch (err) {
        console.log(err);
        toast.error(err.data?.message || err.error, { theme: "dark" });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 -mt-20 relative overflow-hidden transition-colors duration-500">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#007aff]/15 dark:bg-[#00f2fe]/20 rounded-full blur-[100px] pointer-events-none transition-colors duration-500"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#5856d6]/15 dark:bg-[#8a2be2]/20 rounded-full blur-[100px] pointer-events-none transition-colors duration-500"></div>

      <div className="w-full max-w-md liquid-glass rounded-2xl p-8 md:p-10 relative z-10 overflow-hidden animate-slide-up">
        {/* Accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#007aff] to-[#5856d6] dark:from-[#00f2fe] dark:to-[#8a2be2]"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 transition-colors duration-500">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400 transition-colors duration-500">Join Watchery today</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-gradient-to-r from-[#007aff] to-[#5856d6] dark:from-[#00f2fe] dark:to-[#8a2be2] text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-all flex justify-center items-center shadow-lg mt-2"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-200 dark:border-white/10 pt-6 transition-colors duration-500">
          <p className="text-gray-500 dark:text-gray-400 transition-colors duration-500">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-[#007aff] dark:text-[#00f2fe] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
