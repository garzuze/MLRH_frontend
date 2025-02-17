import Title from "../ui/Title";
import logo from "../../assets/logo.png"
import Button from "../ui/Button";

export default function AboutUs() {
    return (
        <div className="w-full font-roboto max-w-screen-lg mx-auto p-8 mb-12">
            <Title variant={"h2"} text={"Sobre nós"} className={"text-center md:text-left mb-8"}></Title>
            <div className="grid grid-cols-5 gap-8">
                <div className="md:col-span-3 col-span-5 text-pretty">
                <p className="subtitle md:text-lg text-gray-400 lg:text-xl">
                    A ML GESTÃO DE PESSOAS destaca-se por oferecer excelência na captação de profissionais qualificados, sempre com compromisso, agilidade, qualidade e serviços personalizados. Atuamos em diversos setores, compreendendo as especificidades de cada área e garantindo soluções sob medida para nossos clientes. Essa abordagem diferenciada nos permite atender às mais variadas demandas com eficiência e precisão.
                </p>
                <Button text={"Saiba mais"} className={"mt-4 mx-0"}/>
                </div>
                    <img src={logo} className="p-8 mx-auto border-2 border-neutral-800 rounded-lg shadow-sm col-span-5 md:col-span-2"></img>
            </div>
        </div>
    );
}