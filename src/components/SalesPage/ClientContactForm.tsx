import { useState } from "react";
import { AxiosResponse } from "axios";
import Button from "../ui/Button";
import Snackbar from "../ui/Snackbar";
import { useClient } from "../../contexts/ClientContext";
import ClientSelector from "../form/ClientAutocompletInput";
import { useAxiosClient } from "../../hooks/useAxiosClient";

export default function ClientContactForm() {

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const { client, setClient } = useClient();
    const axiosClient = useAxiosClient();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const createClientContact = async () => {
            try {
                const response: AxiosResponse = await axiosClient.post("/clients/client_contact/", formData);
                if (response.status === 201) {
                    setSnackbarMessage("Contato criado com sucesso!")
                    setIsSnackbarOpen(true);
                } else {
                    setSnackbarMessage("Ops... Alguma coisa deu errado.")
                    setIsSnackbarOpen(true);
                }
            } catch (error) {
                console.log(error)
                setSnackbarMessage("Ops... Alguma coisa deu errado.")
                setIsSnackbarOpen(true);
            }
        }
        createClientContact();
    }

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <ClientSelector selectedClient={client} setSelectedClient={setClient} />

                <input
                    type="text"
                    placeholder="Nome"
                    className=" placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700"
                    name="name"
                    required
                />
                <input
                    type="text"
                    placeholder="Departamento"
                    className=" placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700"
                    name="department"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className=" placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700"
                    name="email"
                    required
                />
                <div className="w-full flex gap-x-4">
                    <input
                        type="text"
                        placeholder="Telefone"
                        className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-3/4"
                        name="phone"
                    />
                    <select name="status" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/4">
                        <option value={"True"}>Ativo</option>
                        <option value={"False"}>Inativo</option>
                    </select>
                </div>

                <Button text={"Cadastrar contato"} variant="dark" className="w-full mx-0 p-2 text-sm mt-4"></Button>
            </form>
            <Snackbar
                message={snackbarMessage}
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
            />
        </>
    )
}
