import AboutUs from "../components/HomePage/AboutUs";
import Contact from "../components/HomePage/Contact";
import Resume from "../components/HomePage/Resume";
import Header from "../components/HomePage/Header";
import Hero from "../components/HomePage/Hero";
import Services from "../components/HomePage/Services";
import Vacancies from "../components/HomePage/Vacancies";

export default function HomePage() {

  return (
    <div>
      {/* bg from https://bg.ibelick.com/ */}
      <div className="absolute top-0 z-[-2] h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Header />
      <Hero />
      <Resume />
      <Vacancies />
      <Services />
      <AboutUs />
      <Contact />
    </div>
  )
}