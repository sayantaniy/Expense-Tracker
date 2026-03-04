import Navbar from "../components/Navbar"
import Herosection from "../components/Herosection";
import Footer from "../components/Footer";
import Features from "../components/Features";

const Home = () => {

  return (
    <div className="min-h-screen bg-dark flex flex-col font-jetbrains">
      <Navbar />
      <main className="flex-grow">
        <Herosection />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Home;