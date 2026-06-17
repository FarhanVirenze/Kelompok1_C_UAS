import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie, loadingMovieReview }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 transition-colors duration-500">
      {/* Review Form Section */}
      <section className="w-full lg:w-1/3">
        {userInfo ? (
          <div className="liquid-glass rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-500">Write a Review</h3>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <textarea
                  id="comment"
                  rows="4"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-4 rounded-xl focus:outline-none transition-all duration-300 resize-none"
                  placeholder="What did you think of the movie?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loadingMovieReview}
                className="w-full bg-gradient-to-r from-[#007aff] to-[#34c759] dark:from-[#00f2fe] dark:to-[#8a2be2] text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-all flex justify-center items-center shadow-lg"
              >
                {loadingMovieReview ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                ) : (
                  "Submit Review"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="liquid-glass rounded-2xl p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-500">You must be logged in to write a review.</p>
            <Link 
              to="/login"
              className="inline-block bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-semibold py-2 px-6 rounded-full transition-all duration-500"
            >
              Sign In
            </Link>
          </div>
        )}
      </section>

      {/* Reviews List Section */}
      <section className="w-full lg:w-2/3">
        {movie?.reviews.length === 0 ? (
          <div className="liquid-glass rounded-2xl p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-500">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {movie?.reviews.map((review) => (
              <div
                key={review._id}
                className="liquid-glass p-6 rounded-2xl border shadow-lg relative overflow-hidden"
              >
                {/* Accent line on the left */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#007aff] to-[#34c759] dark:from-[#00f2fe] dark:to-[#8a2be2]"></div>
                
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007aff] to-[#5856d6] dark:from-[#00f2fe] dark:to-[#8a2be2] flex items-center justify-center border border-white/10 shadow-inner">
                      <span className="text-white font-bold">{review.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <strong className="text-gray-900 dark:text-white font-semibold text-lg transition-colors duration-500">{review.name}</strong>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-500">
                    {review.createdAt.substring(0, 10)}
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 pl-1 transition-colors duration-500">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieTabs;
