import Title from "../ui/Title";

export default function Services() {
    return (
        <div className="w-full border-y-2 border-neutral-700 pb-8" id="servicos">
            <div className="w-full font-roboto max-w-screen-lg mx-auto">
                <div className="w-full lg:max-w-screen-lg mx-auto">
                    <Title variant={"h2"} text={"Nossos serviços"} className={"text-center py-8"} />
                </div>

                <div className="grid grid-cols-3 gap-4 p-4">
                    <div className="col-span-3 w-full border-2 border-neutral-800 rounded-lg shadow-sm h-56 mx-auto p-4 relative hover:scale-105 transform transition-transform bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] cursor-pointer">
                        <div className="absolute inset-0 bg-indigo-600 bg-[size:20px_20px] opacity-20 blur-[100px]"></div>
                        <Title variant={"h3"} text={"Recrutamento e Seleção"} className={"absolute p-8 bottom-0 left-0"} />
                        <p className="mb-3 font-normal text-zinc-300 line-clamp-3 bottom-0 absolute left-8 text-sm">
                        Encontramos profissionais qualificados.
                        </p>
                        <div className="absolute bottom-0 right-0 p-4 sm:p-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6 sm:size-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                    </div>
                    <div className="w-full col-span-3 md:col-span-1 border-2 border-neutral-800 rounded-lg shadow-sm h-56 mx-auto p-4 relative hover:scale-105 transform transition-transform bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] cursor-pointer">
                        <Title variant={"h3"} text={"Avaliação psicológica"} className={"absolute p-8 bottom-0 left-0"} />
                        <p className="mb-3 font-normal text-zinc-300 line-clamp-3 bottom-0 absolute left-8 text-sm">
                        Visando complementar a seleção.
                        </p>
                    </div>
                    <div className="w-full col-span-3 md:col-span-1 border-2 border-neutral-800 rounded-lg shadow-sm h-56 mx-auto p-4 relative hover:scale-105 transform transition-transform bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] cursor-pointer">
                        <Title variant={"h3"} text={"Consultoria em RH"} className={"absolute p-8 bottom-0 left-0"} />
                        <p className="mb-3 font-normal text-zinc-300 line-clamp-3 bottom-0 absolute left-8 text-sm">
                            Visando aumentar a eficiência.
                        </p>
                    </div>
                    <div className="w-full col-span-3 md:col-span-1 border-2 border-neutral-800 rounded-lg shadow-sm h-56 mx-auto p-4 relative hover:scale-105 transform transition-transform bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] cursor-pointer">
                        <Title variant={"h3"} text={"Recolocação"} className={"absolute p-8 bottom-0 left-0"} />
                        <p className="mb-3 font-normal text-zinc-300 line-clamp-3 bottom-0 absolute left-8 text-sm">
                            Visando auxiliar na transição de carreira.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}