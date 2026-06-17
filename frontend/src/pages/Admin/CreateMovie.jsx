import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres && genres.length > 0) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "genre") {
      const selectedGenre = genres.find((genre) => genre._id === value);
      setMovieData((prevData) => ({
        ...prevData,
        genre: selectedGenre ? selectedGenre._id : "",
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async (e) => {
    e.preventDefault();
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !selectedImage
      ) {
        toast.error("Please fill all required fields", { theme: "dark" });
        return;
      }

      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          toast.error("Failed to upload image", { theme: "dark" });
          return;
        }

        await createMovie({
          ...movieData,
          image: uploadedImagePath,
        });

        navigate("/admin/movies-list");

        setMovieData({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          ratings: 0,
          image: null,
          genre: "",
        });

        toast.success("Movie Added To Database", { theme: "dark" });
      }
    } catch (error) {
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`, { theme: "dark" });
    }
  };

  return (
    <div className="transition-colors duration-500">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-[#007aff] dark:border-[#00f2fe] pl-4 transition-colors duration-500">Create Movie</h1>

      <div className="liquid-glass p-8 max-w-4xl mx-auto rounded-2xl">
        <form onSubmit={handleCreateMovie} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">Name</label>
              <input
                type="text"
                name="name"
                value={movieData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                placeholder="Movie Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">Year</label>
              <input
                type="number"
                name="year"
                value={movieData.year}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                placeholder="Release Year"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">Detail</label>
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 resize-none"
              placeholder="Movie description..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">Cast (comma-separated)</label>
              <input
                type="text"
                name="cast"
                value={movieData.cast.join(", ")}
                onChange={(e) =>
                  setMovieData({ ...movieData, cast: e.target.value.split(", ") })
                }
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                placeholder="Actor 1, Actor 2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">Genre</label>
              <select
                name="genre"
                value={movieData.genre}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 appearance-none"
              >
                {isLoadingGenres ? (
                  <option>Loading genres...</option>
                ) : (
                  genres?.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">Movie Poster</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-white/10 border-dashed rounded-xl hover:border-[#007aff] dark:hover:border-[#00f2fe] transition-colors bg-gray-50/50 dark:bg-[#15151c]/50">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-500 justify-center">
                  <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-[#007aff] dark:text-[#00f2fe] hover:text-[#5856d6] dark:hover:text-[#8a2be2] transition-colors focus-within:outline-none">
                    <span>Upload a file</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                {selectedImage && (
                  <p className="text-sm text-[#007aff] dark:text-[#00f2fe] mt-2">{selectedImage.name}</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-gradient-to-r from-[#007aff] to-[#34c759] dark:from-[#00f2fe] dark:to-[#8a2be2] text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-all shadow-lg"
              disabled={isCreatingMovie || isUploadingImage}
            >
              {isCreatingMovie || isUploadingImage ? "Processing..." : "Create Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMovie;
