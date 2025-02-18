import { Key } from "react";
import { useEconomicActivities } from "../../services/fetchEconomicActivities";
import Button from "../ui/Button";

export default function ClientForm() {
    const { economicActivities, loading } = useEconomicActivities();

    function handleSubmit() {

    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Razão Social"
                className="placeholder:text-sm text-sm border-b border-stone-300 w-full focus:outline-none focus:border-stone-700"
                name="corporate_name"
            />
            <input
                type="text"
                placeholder="Nome fantasia"
                className=" placeholder:text-sm text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700"
                name="trade_name"
            />
            <div className="w-full flex gap-x-4">
                <input
                    type="text"
                    placeholder="CNPJ"
                    className="placeholder:text-sm text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                    name="cnpj"
                />
                <input
                    type="text"
                    placeholder="Inscrição Estadual"
                    className="placeholder:text-sm text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                    name="inscricao_estadual"
                />
            </div>
            <div className="w-full flex gap-x-4">
                <input
                    type="int"
                    placeholder="Número de empregados"
                    className="placeholder:text-sm text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                    name="number_of_employees"
                />
                <input
                    type="text"
                    placeholder="CEP"
                    className="placeholder:text-sm text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                    name="cep"
                />
            </div>
            <input
                type="text"
                placeholder="Endereço"
                className=" placeholder:text-sm text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700"
                name="address"
            />
            <div className="w-full flex gap-x-4">
                <input
                    type="text"
                    placeholder="Bairro"
                    className="placeholder:text-sm text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                    name="neighborhood"
                />
                <select name="state" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2">
                    <option>Estado</option>
                </select>
            </div>

            <select name="economic_activity" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full">
                <option value="">Atividade econômica</option>
                {loading ? (<option disabled>Carregando...</option>)
                    : (
                        economicActivities.map((activity) => (
                            <option key={activity.id} value={activity.id}>{activity.title}</option>
                        ))
                )}
            </select>
            <select name="benefits" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full">
                <option>Benefícios</option>
            </select>
            <Button text={"Cadastrar cliente"} variant="dark" className="w-full mx-0 p-2 text-sm mt-4"></Button>
        </form>
    )
}