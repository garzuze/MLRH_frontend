import { useState } from "react";
import { useEconomicActivities } from "../../services/useEconomicActivities";
import Button from "../ui/Button";
import { useBenefits } from "../../services/useBenefits";
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Snackbar from "../ui/Snackbar";
import { useClient } from "../../contexts/ClientContext";

export default function ClientForm() {
    const { economicActivities, loadingEconomicActivities } = useEconomicActivities();
    const { benefits, loadingBenefits } = useBenefits();

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const { token } = useAuth();
    const { setClient } = useClient();
    const states: Record<string, string> = {
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

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const createClient = async () => {
            try {
                const client = axios.create({
                    baseURL: "http://127.0.0.1:8000/",
                });

                const config: AxiosRequestConfig = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    } as RawAxiosRequestHeaders
                };

                const response: AxiosResponse = await client.post("/clients/clients/", formData, config);
                if (response.status === 201) {
                    setSnackbarMessage("Cliente criado com sucesso!")
                    setIsSnackbarOpen(true);
                    setClient({ id: response.data.id, corporate_name: response.data.corporate_name });
                    (document.getElementById('ClientForm') as HTMLFormElement).reset();
                } else {
                    setSnackbarMessage("Ops... Alguma coisa deu errado.")
                    setIsSnackbarOpen(true);
                }
            } catch (error) {
                console.log(error)
            }
        }
        createClient();
    }
    return (
        <>
            <form onSubmit={handleSubmit} method="post" id="ClientForm">
                <input
                    type="text"
                    placeholder="Razão Social"
                    className="placeholder:text-sm text-sm border-b border-stone-300 w-full focus:outline-none focus:border-stone-700"
                    name="corporate_name"
                    required
                />
                <input
                    type="text"
                    placeholder="Nome fantasia"
                    className=" placeholder:text-sm text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700"
                    name="trade_name"
                    required
                />
                <div className="w-full flex gap-x-4">
                    <input
                        type="text"
                        placeholder="CNPJ"
                        className="placeholder:text-sm text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                        name="cnpj"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Inscrição Estadual"
                        className="placeholder:text-sm text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                        name="state_registration"
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
                <div className="w-full flex gap-x-4">
                    <input
                        type="text"
                        placeholder="Endereço"
                        className="placeholder:text-sm text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                        name="address"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Cidade"
                        className="placeholder:text-sm text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                        name="city"
                        required
                    />
                </div>
                <div className="w-full flex gap-x-4">
                    <input
                        type="text"
                        placeholder="Bairro"
                        className="placeholder:text-sm text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                        name="neighborhood"
                        required
                    />
                    <select name="state" defaultValue={""} className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2" required>
                        <option disabled value={""}>Estado</option>
                        {Object.keys(states).map((id, _) => (
                            <option key={id} value={id}>{states[id]}</option>
                        ))}
                    </select>
                </div>

                <select name="economic_activity" defaultValue={""} className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" required>
                    <option value="" disabled>Atividade econômica</option>
                    {loadingEconomicActivities ? (<option disabled>Carregando...</option>)
                        : (
                            economicActivities.map((activity) => (
                                <option key={activity.id} value={activity.id}>{activity.title}</option>
                            ))
                        )}
                </select>
                <select multiple={true} defaultValue={[""]} name="benefits" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full">
                    <option value="" disabled >Benefícios</option>
                    {loadingBenefits ? (<option disabled>Carregando...</option>)
                        : (
                            benefits.map((benefit) => (
                                <option key={benefit.id} value={benefit.id}>{benefit.benefit}</option>
                            ))
                        )}
                </select>
                <Button text={"Cadastrar cliente"} variant="dark" className="w-full mx-0 p-2 text-sm mt-4"></Button>
            </form>
            <Snackbar
                message={snackbarMessage}
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
            />
        </>
    )
}