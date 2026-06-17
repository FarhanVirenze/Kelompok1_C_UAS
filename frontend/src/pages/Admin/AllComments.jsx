import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import { AiOutlineDelete, AiOutlineComment } from "react-icons/ai";

const AllComments = () => {
  const { data: movies, refetch } = useGetAllMoviesQuery();
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment({ movieId, reviewId });
        toast.success("Comment Deleted", { theme: "dark" });
        refetch();
      } catch (error) {
        console.error("Error deleting comment: ", error);
        toast.error("Failed to delete comment", { theme: "dark" });
      }
    }
  };

  // Filter out movies that have no reviews to clean up the UI
  const moviesWithReviews = movies?.filter((m) => m.reviews && m.reviews.length > 0) || [];

  return (
    <div className="p-6 md:p-10 pt-24 min-h-screen transition-colors duration-500">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-[#007aff] dark:border-[#00f2fe] pl-4 transition-colors duration-500">Manage Comments</h1>

      {moviesWithReviews.length === 0 ? (
        <div className="liquid-glass rounded-2xl p-10 text-center flex flex-col items-center">
            <AiOutlineComment className="text-6xl text-gray-400 dark:text-gray-500 mb-4" />
            <h2 className="text-xl text-gray-700 dark:text-gray-300 font-semibold mb-2 transition-colors duration-500">No comments found</h2>
            <p className="text-gray-500 dark:text-gray-500">There are currently no user comments on any movies.</p>
        </div>
      ) : (
        <div className="space-y-8 max-w-5xl mx-auto">
          {moviesWithReviews.map((m) => (
            <div key={m._id} className="liquid-glass rounded-2xl overflow-hidden">
              <div className="bg-gray-100/80 dark:bg-[#0f0f14]/60 p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between transition-colors duration-500">
                 <div className="flex items-center gap-4">
                    <img src={m.image} alt={m.name} className="w-12 h-12 object-cover rounded-md shadow-sm" />
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-500">{m.name}</h2>
                 </div>
                 <span className="bg-gray-200 dark:bg-white/5 text-[#007aff] dark:text-[#00f2fe] px-3 py-1 rounded-full text-xs font-bold border border-gray-300 dark:border-white/10 transition-colors duration-500">
                    {m.reviews.length} Comments
                 </span>
              </div>
              
              <div className="p-6 space-y-4">
                {m.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-gray-50 dark:bg-[#15151c]/50 p-5 rounded-xl border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#007aff]/15 dark:bg-[#00f2fe]/20 flex items-center justify-center text-[#007aff] dark:text-[#00f2fe] font-bold">
                            {review.name.charAt(0).toUpperCase()}
                         </div>
                         <div>
                            <strong className="text-gray-800 dark:text-gray-200 block text-sm transition-colors duration-500">{review.name}</strong>
                            <span className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString(undefined, {
                                year: 'numeric', month: 'short', day: 'numeric'
                            })}
                            </span>
                         </div>
                      </div>
                      
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-white/5"
                        onClick={() => handleDeleteComment(m._id, review._id)}
                        title="Delete Comment"
                      >
                        <AiOutlineDelete size={18} />
                      </button>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed pl-11 transition-colors duration-500">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllComments;
