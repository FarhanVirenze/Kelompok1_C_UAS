const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <input
          type="text"
          className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
          placeholder="Write genre name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button className="flex-1 bg-gradient-to-r from-[#007aff] to-[#34c759] dark:from-[#00f2fe] dark:to-[#5856d6] text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-all shadow-lg">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              type="button"
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-800 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-all shadow-lg"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenreForm;
