import { Features } from "@/src/components/Home/Features";
import { Hero } from "@/src/components/Home/Hero";
import { Services } from "@/src/components/Home/Services";

const Home: React.FC = () => {
  return (
    <div className="px-4 lg:px-12">
      <Hero />
      <Services />
      <Features />
    </div>
  );
};

export default Home;
