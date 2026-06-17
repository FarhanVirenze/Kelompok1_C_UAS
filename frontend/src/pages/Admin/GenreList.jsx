import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";

import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required", { theme: "dark" });
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error, { theme: "dark" });
      } else {
        setName("");
        toast.success(`${result.name} is created.`, { theme: "dark" });
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.", { theme: "dark" });
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required", { theme: "dark" });
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error, { theme: "dark" });
      } else {
        toast.success(`${result.name} is updated`, { theme: "dark" });
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this genre?")) {
        try {
        const result = await deleteGenre(selectedGenre._id).unwrap();

        if (result.error) {
            toast.error(result.error, { theme: "dark" });
        } else {
            toast.success(`${result.name} is deleted.`, { theme: "dark" });
            refetch();
            setSelectedGenre(null);
            setModalVisible(false);
        }
        } catch (error) {
        console.error(error);
        toast.error("Genre deletion failed. Try again.", { theme: "dark" });
        }
    }
  };

  return (
    <div className="transition-colors duration-500">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-[#007aff] dark:border-[#00f2fe] pl-4 transition-colors duration-500">Manage Genres</h1>

      <div className="max-w-4xl liquid-glass rounded-2xl p-8">
        <div className="mb-10 pb-8 border-b border-gray-200 dark:border-white/10 transition-colors duration-500">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-500">Create New Genre</h2>
            <GenreForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateGenre}
            />
        </div>

        <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-500">Available Genres</h2>
            <div className="flex flex-wrap gap-3">
            {genres?.map((genre) => (
                <button
                key={genre._id}
                className="pill-inactive font-medium py-2 px-5 rounded-full hover:pill-active transition-all duration-300"
                onClick={() => {
                    setModalVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
                }}
                >
                {genre.name}
                </button>
            ))}
            </div>
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <div className="p-6 liquid-glass rounded-2xl w-full max-w-md mx-auto">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-500">Update Genre</h2>
            <GenreForm
                value={updatingName}
                setValue={(value) => setUpdatingName(value)}
                handleSubmit={handleUpdateGenre}
                buttonText="Update"
                handleDelete={handleDeleteGenre}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;
