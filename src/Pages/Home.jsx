import Navbar from "../Components/Navbar";
import "../assets/css/home.css"

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <h1 className="home-title">CONTACT-MANAGMENT-SYSTEM</h1>
        <p className="home-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, iusto.
          Alias eos consequuntur consequatur atque dolores architecto nostrum ad
          blanditiis iusto nobis assumenda quia officia cum, unde soluta
          corrupti minima!
        </p>
      </div>
    </>
  );
};

export default Home;
