import Button from "../ui/Button"
import Title from "../ui/Title"

export default function Hero() {
    return (
        <div className="hero 2xl:max-w-screen-xl mx-auto font-roboto text-center" id="home">
            <div className="w-full pt-36 pb-36 px-8 text-white">
                <Title variant={"h1"} text={"As melhores vagas da região ao seu alcance."} className={"py-1 w-full md:w-3/4 mx-auto"}></Title>
                <p className="subtitle md:text-lg text-gray-400 lg:text-xl my-8 sm:w-1/2 mx-auto">
                    Conectamos talentos ao sucesso com compromisso, agilidade e excelência nos serviços personalizados.
                </p>
                <div className="cta-buttons mt-8">
                    <a href="#vagas">
                        <Button text={"Olhar Vagas"}></Button>
                    </a>
                    <a href="#curriculo">
                        <Button variant="dark" text={"Mandar Currículo"}></Button>
                    </a>
                </div>
            </div>
        </div>
    )
}