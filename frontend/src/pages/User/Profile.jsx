import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../../redux/api/users";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { theme: "dark" });
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully", { theme: "dark" });
      } catch (err) {
        toast.error(err?.data?.message || err.error, { theme: "dark" });
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 mt-5">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#007aff]/10 dark:bg-[#00f2fe]/10 rounded-full blur-[100px] pointer-events-none transition-colors duration-500"></div>

      <div className="w-full max-w-md liquid-glass rounded-2xl p-8 md:p-10 relative z-10 overflow-hidden animate-slide-up">
        {/* Accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#007aff] to-[#34c759] dark:from-[#00f2fe] dark:to-[#5856d6]"></div>
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#007aff] to-[#5856d6] dark:from-[#00f2fe] dark:to-[#8a2be2] flex items-center justify-center shadow-xl mb-4 transition-colors duration-500">
             <span className="text-4xl font-bold text-white">
                {userInfo?.username?.charAt(0).toUpperCase()}
             </span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white transition-colors duration-500">Your Profile</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 transition-colors duration-500">Manage your account settings</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">
              Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                placeholder="Enter name"
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
                className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                placeholder="Leave blank to keep same"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={loadingUpdateProfile}
            type="submit"
            className="w-full bg-gradient-to-r from-[#007aff] to-[#34c759] dark:from-[#00f2fe] dark:to-[#5856d6] text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-all flex justify-center items-center shadow-lg mt-4"
          >
            {loadingUpdateProfile ? (
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
