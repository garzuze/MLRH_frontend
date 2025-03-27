import { useState } from "react"
import logo from "../../assets/logo.png"
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 flex justify-between items-center py-6 px-8 md:px-32 bg-transparent backdrop-blur-md font-roboto">
                <a className="text-white font-bold hover:scale-105 transition-all">
                    <img src={logo} className="md:h-12 h-8" />
                </a>

                <ul className="hidden xl:flex items-center gap-12 text-base text-gray-200 font-roboto">
                    <li className="p-3 cursor-pointer hover:font-bold"><a href="#hero">Home</a></li>
                    <li className="p-3 cursor-pointer hover:font-bold"><a href="#resume">Currículo</a></li>
                    <li className="p-3 cursor-pointer hover:font-bold"><a href="#vacancies">Vagas</a></li>
                    <li className="p-3 cursor-pointer hover:font-bold"><a href="#services">Serviços</a></li>
                    <li className="p-3 cursor-pointer hover:font-bold"><a href="#about-us">Sobre nós</a></li>
                    <li className="p-3 cursor-pointer hover:font-bold"><a href="#contact">Contato</a></li>
                </ul>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6 xl:hidden block cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </header>
            <div className={`fixed text-white xl:hidden top-[72px] left-0 w-full bg-transparent backdrop-blur-md flex flex-col items-center font-roboto transform transition-transform text-lg ${isMenuOpen ? "opacity-100" : "hidden"}`} style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}>
                <li className="list-none w-full text-center p-4 transition-all cursor-pointer hover:font-bold">
                    <a href="#hero">Home</a>
                </li>
                <li className="list-none w-full text-center p-4 transition-all cursor-pointer hover:font-bold">
                    <a href="#resume">Currículo</a>
                </li>
                <li className="list-none w-full text-center p-4 transition-all cursor-pointer hover:font-bold">
                    <a href="#vacancies">Vagas</a>
                </li>
                <li className="list-none w-full text-center p-4 transition-all cursor-pointer hover:font-bold">
                    <a href="#services">Serviços</a>
                </li>
                <li className="list-none w-full text-center p-4 transition-all cursor-pointer hover:font-bold">
                    <a href="#about-us">Sobre nós</a>
                </li>
                <li className="list-none w-full text-center p-4 transition-all cursor-pointer hover:font-bold">
                    <a href="#contact">Contato</a>
                </li>
            </div>
        </>
    )
}