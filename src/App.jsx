import Curriculum from "./components/Curriculum";
import Vacancies from "./components/Vacancies";
import Header from "./components/Header"
import Hero from "./components/Hero"
import { useState } from "react"
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* bg from https://bg.ibelick.com/ */}
      <div className="absolute top-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Header />
      <Hero />
      <Curriculum />
      <Vacancies />
      <Services />
      <AboutUs/>
    </>
  )
}