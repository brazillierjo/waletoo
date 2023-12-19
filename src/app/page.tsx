import { Features } from "@/src/components/Home/Features";
import { Hero } from "@/src/components/Home/Hero";
import { Services } from "@/src/components/Home/Services";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <Features />
    </>
  );
};

export default Home;
