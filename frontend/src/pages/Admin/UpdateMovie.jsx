import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast
      ) {
        toast.error("Please fill in all required fields", { theme: "dark" });
        return;
      }

      let uploadedImagePath = movieData.image;

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
      }

      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          image: uploadedImagePath,
        },
      });

      toast.success("Movie updated successfully", { theme: "dark" });
      navigate("/admin/movies-list");
    } catch (error) {
      toast.error("Failed to update movie", { theme: "dark" });
    }
  };

  const handleDeleteMovie = async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie(id);
        toast.success("Movie deleted successfully", { theme: "dark" });
        navigate("/admin/movies-list");
      } catch (error) {
        toast.error(`Failed to delete movie: ${error?.message}`, { theme: "dark" });
      }
    }
  };

  return (
    <div className="p-6 md:p-10 pt-24 min-h-screen transition-colors duration-500">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-[#007aff] dark:border-[#00f2fe] pl-4 transition-colors duration-500">Update Movie</h1>

      <div className="liquid-glass p-8 max-w-4xl mx-auto rounded-2xl">
        <form onSubmit={handleUpdateMovie} className="space-y-6">
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">Cast (comma-separated)</label>
            <input
              type="text"
              name="cast"
              value={movieData.cast.join ? movieData.cast.join(", ") : movieData.cast}
              onChange={(e) =>
                setMovieData({ ...movieData, cast: e.target.value.split(", ") })
              }
              className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
              placeholder="Actor 1, Actor 2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">Update Poster</label>
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
                    <span>Upload new image</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />
                  </label>
                  <p className="pl-1">to replace current</p>
                </div>
                {selectedImage && (
                  <p className="text-sm text-[#007aff] dark:text-[#00f2fe] mt-2">{selectedImage.name}</p>
                )}
                {!selectedImage && movieData.image && (
                   <p className="text-sm text-gray-400 mt-2">Current image will be kept if none uploaded.</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#007aff] to-[#34c759] dark:from-[#00f2fe] dark:to-[#5856d6] text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-all shadow-lg"
              disabled={isUpdatingMovie || isUploadingImage}
            >
              {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
            </button>
            <button
              type="button"
              onClick={handleDeleteMovie}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-800 text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-all shadow-lg"
              disabled={isUpdatingMovie || isUploadingImage}
            >
              Delete Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
