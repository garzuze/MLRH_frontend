export default function Hero() {
    return (
        <div className="hero 2xl:max-w-screen-xl mx-auto font-roboto text-center">
            <div className="w-full py-36 px-8 text-white">
                <h1 className="title text-pretty text-5xl font-bold lg:text-7xl bg-gradient-to-b from-zinc-50 to-zinc-300 bg-clip-text text-transparent py-1 w-full md:w-3/4 mx-auto">
                    As melhores vagas da região ao seu alcance.
                </h1>
                <p className="subtitle md:text-lg text-gray-400 lg:text-xl my-8 sm:w-1/2 mx-auto">
                Conectamos talentos ao sucesso com compromisso, agilidade e excelência nos serviços personalizados.
                </p>
                <div className="cta-buttons mt-8">
                    <button className="m-2 p-3 rounded-md w-40 bg-zinc-100 hover:bg-zinc-300 text-black font-bold">
                        Olhar Vagas
                    </button>
                    <button className="m-2 p-3 rounded-md w-40 bg-neutral-950 font-bold border-2 border-neutral-800">
                        Mandar Currículo
                    </button>
                </div>
            </div>
        </div>
    )
}