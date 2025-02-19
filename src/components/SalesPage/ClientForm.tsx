import { Key } from "react";
import { useEconomicActivities } from "../../services/useEconomicActivities";
import Button from "../ui/Button";
import { useBenefits } from "../../services/useBenefits";

export default function ClientForm() {
    const { economicActivities, loadingEconomicActivities } = useEconomicActivities();
    const { benefits, loadingBenefits } = useBenefits();
    const states:Record<string, string> = {
        'AC': 'Acre',
        'AL': 'Alagoas',
        'AM': 'Amazonas',
        'BA': 'Bahia',
        'CE': 'Ceará',
        'DF': 'Distrito Federal',
        'ES': 'Espírito Santo',
        'GO': 'Goiás',
        'MA': 'Maranhão',
        'MT': 'Mato Grosso',
        'MS': 'Mato Grosso do Sul',
        'MG': 'Minas Gerais',
        'PA': 'Pará',
        'PB': 'Paraíba',
        'PR': 'Paraná',
        'PE': 'Pernambuco',
        'PI': 'Piauí',
        'RJ': 'Rio de Janeiro',
        'RN': 'Rio Grande do Norte',
        'RS': 'Rio Grande do Sul',
        'RO': 'Rondônia',
        'RR': 'Roraima',
        'SC': 'Santa Catarina',
        'SP': 'São Paulo',
        'SE': 'Sergipe',
        'TO': 'Tocantins',
    }

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
                    <option disabled selected>Estado</option>
                    {Object.keys(states).map((id, _) => (
                        <option key={id} value={id}>{states[id]}</option>
                    ))}
                </select>
            </div>

            <select name="economic_activity" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full">
                <option value="" disabled selected={true}>Atividade econômica</option>
                {loadingEconomicActivities ? (<option disabled>Carregando...</option>)
                    : (
                        economicActivities.map((activity) => (
                            <option key={activity.id} value={activity.id}>{activity.title}</option>
                        ))
                )}
            </select>
            <select multiple name="benefits" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full">
                <option value="" disabled selected={true}>Benefícios</option>
                {loadingBenefits ? (<option disabled>Carregando...</option>)
                    : (
                        benefits.map((benefit) => (
                            <option key={benefit.id} value={benefit.id}>{benefit.benefit}</option>
                        ))
                )}
            </select>
            <Button text={"Cadastrar cliente"} variant="dark" className="w-full mx-0 p-2 text-sm mt-4"></Button>
        </form>
    )
}