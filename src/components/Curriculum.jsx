import Button from "./Button"
import Title from "./title"

export default function Curriculum() {
    return (
        <div className="border-y-2 border-neutral-800 w-full font-roboto 2xl:max-w-screen-xl mx-auto">
            <div className="lg:border-l lg:border-l-neutral-700 border-dashed border-b border-b-neutral-700 w-full lg:max-w-screen-lg mx-auto">
                <Title variant={"h2"} text={"Cadastre seu currículo"} className={"text-center md:text-left md:ml-12 lg:ml-24 pt-8"}></Title>
                <h5 className="subtitle text-center md:text-left md:ml-12 lg:ml-24 font-normal text-lg text-gray-400 md:text-xl mt-2 mb-8">
                    E tenha acesso às melhores vagas
                </h5>
            </div>
            <div className="lg:border-l lg:border-l-zinc-700 border-dashed pb-8 w-full lg:max-w-screen-lg mx-auto">
                <form className="max-w-sm md:text-left md:ml-12 lg:ml-24 mx-auto">
                    <div className="py-5">
                        <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-zinc-200">CPF</label>
                        <input type="text" id="cpf" className="bg-neutral-950 border border-neutral-800 text-zinc-200 text-sm rounded-lg focus:ring-indigo-950 focus:border-indigo-950 hover:ring-indigo-950 block w-full p-2.5" placeholder="123.456.789-10" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="bdate" className="block mb-2 text-sm font-medium text-zinc-200">Data de nascimento</label>
                        <input type="date" id="bdate" className="bg-neutral-950 border border-neutral-800 text-zinc-200 text-sm rounded-lg focus:ring-indigo-950 focus:border-indigo-950 ring-indigo-950 block w-full p-2.5" required />
                    </div>
                    <Button text={"Mandar Currículo"} variant="dark" className={"ml-0"} />
                </form>
            </div>
        </div>
    )
}