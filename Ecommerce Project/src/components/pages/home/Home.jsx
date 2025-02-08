import FeaturedProducts from "../../pages/featuredProducts/FeaturedProducts";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Services from "./Services";
import Trusted from "./Trusted";
import Chat from "../chat/chat";

function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <Services />
      <Trusted />
      <Footer />
      <Chat />
    </div>
  );
}

export default Home;
