import { useState } from "react";
import { useEconomicActivities } from "../../hooks/useEconomicActivities";
import Button from "../ui/Button";
import { useBenefits } from "../../hooks/useBenefits";
import { AxiosResponse } from "axios";
import Snackbar from "../ui/Snackbar";
import { useClient } from "../../contexts/ClientContext";
import { states } from "../../utils/constants";
import { useAxiosClient } from "../../hooks/useAxiosClient";

export default function ClientForm() {
    const { economicActivities, loadingEconomicActivities, economicActivitiesError } = useEconomicActivities();
    const { benefits, loadingBenefits, benefitsError } = useBenefits();
    const axiosClient = useAxiosClient();

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const { setClient } = useClient();


    async function createClient(formData: FormData) {
        try {
            const response: AxiosResponse = await axiosClient.post("/clients/clients/", formData);
            if (response.status === 201) {
                setSnackbarMessage("Cliente criado com sucesso!")
                setClient({
                    id: response.data.id, corporateName: response.data.corporateName,
                    city: "",
                    state: "",
                    address: "",
                    cnpj: "",
                    neighborhood: "",
                    tradeName: "",
                    economicActivity: 0,
                    benefits: []
                });
                (document.getElementById('ClientForm') as HTMLFormElement).reset();
            }
        } catch (error) {
            setSnackbarMessage("Ops... Alguma coisa deu errado.")
        }
        setIsSnackbarOpen(true);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        createClient(formData);
    }

    return (
        <>
            <form onSubmit={handleSubmit} method="post" id="ClientForm">
                <input
                    type="text"
                    placeholder="Razão Social"
                    className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 w-full focus:outline-none focus:border-stone-700"
                    name="corporateName"
                    required
                />
                <input
                    type="text"
                    placeholder="Nome fantasia"
                    className=" placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700"
                    name="tradeName"
                    required
                />
                <div className="w-full flex gap-x-4">
                    <input
                        type="text"
                        placeholder="CNPJ"
                        className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                        name="cnpj"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Inscrição Estadual"
                        className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                        name="stateRegistration"
                    />
                </div>
                <div className="w-full flex gap-x-4">
                    <input
                        type="number"
                        placeholder="Número de empregados"
                        className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                        name="numberOfEmployees"
                    />
                    <input
                        type="text"
                        placeholder="CEP"
                        className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                        name="cep"
                    />
                </div>
                <div className="w-full flex gap-x-4">
                    <input
                        type="text"
                        placeholder="Endereço"
                        className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                        name="address"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Cidade"
                        className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                        name="city"
                        required
                    />
                </div>
                <div className="w-full flex gap-x-4">
                    <input
                        type="text"
                        placeholder="Bairro"
                        className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2"
                        name="neighborhood"
                        required
                    />
                    <select name="state" defaultValue={""} className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/2" required>
                        <option disabled value={""}>Estado</option>
                        {Object.entries(states).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                </div>

                <select name="economicActivity" defaultValue={""} className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" required>
                    {economicActivitiesError ? <option defaultValue="" disabled>Houve algum error</option> :
                        <option value="" disabled>Atividade econômica</option>
                    }
                    {loadingEconomicActivities ? (<option disabled>Carregando...</option>)
                        : (
                            economicActivities.map((activity) => (
                                <option key={activity.id} value={activity.id}>{activity.title}</option>
                            ))
                        )}
                </select>
                <select multiple={true} defaultValue={[""]} name="benefits" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full">
                    {benefitsError ? <option value="" disabled>Houve um error</option> :
                        <option value="" disabled >Benefícios</option>
                    }
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