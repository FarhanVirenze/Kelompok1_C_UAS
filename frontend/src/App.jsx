import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer theme="dark" position="top-right" autoClose={3000} hideProgressBar={false} />
      <Navigation />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
