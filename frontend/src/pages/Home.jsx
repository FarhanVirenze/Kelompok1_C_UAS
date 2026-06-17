import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
  return (
    <div className="animate-fade-in pb-10">
      <Header />
      <section className="container mx-auto px-4 mt-12">
        <MoviesContainerPage />
      </section>
    </div>
  );
};

export default Home;
