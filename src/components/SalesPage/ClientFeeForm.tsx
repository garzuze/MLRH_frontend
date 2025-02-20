import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import axios, { AxiosRequestConfig, RawAxiosRequestHeaders, AxiosResponse } from "axios";
import Button from "../ui/Button";
import AutocompleteInput from "./AutocompleteInput";
import Snackbar from "../ui/Snackbar";
import { useServices } from "../../services/useServices";

export default function ClientFeeForm() {

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [isServiceFormOpen, setIsServiceFormOpen] = useState<boolean>(false)
    const { services, loadingServices } = useServices();

    const { token } = useAuth();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <AutocompleteInput />
                <div className="services">
                    <div className="w-full">
                        <p className="text-sm w-full mt-4">
                            Operacional e Administrativo
                        </p>
                        <div className="service flex gap-x-4 w-full">
                            <input hidden name="service" value={1}></input>
                            <input type="int" name="percentual" placeholder="Percentual" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" required />
                            <input type="int" name="value" placeholder="Valor" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" />
                            <input type="int" name="deadline" placeholder="Prazo" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" />
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="placeholder:text-sm text-sm w-full mt-4">
                            Técnicos e Especializados
                        </p>
                        <div className="service flex gap-x-4 w-full">
                            <input hidden name="service" value={2}></input>
                            <input type="int" name="percentual" placeholder="Percentual" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" required />
                            <input type="int" name="value" placeholder="Valor" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" />
                            <input type="int" name="deadline" placeholder="Prazo" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" />
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="placeholder:text-sm text-sm w-full mt-4">
                            Liderança, Coordenação, Supervisão e Gerência
                        </p>
                        <div className="service flex gap-x-4 w-full">
                            <input hidden name="service" value={3}></input>
                            <input type="int" name="percentual" placeholder="Percentual" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" required />
                            <input type="int" name="value" placeholder="Valor" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" />
                            <input type="int" name="deadline" placeholder="Prazo" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" />
                        </div>
                    </div>
                </div>
                {isServiceFormOpen ? (
                    <>
                        <p className="placeholder:text-sm text-sm w-full mt-4">
                            Novo serviço
                        </p>
                        <form>
                            <select name="service" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" defaultValue={"servico"}>
                                <option value={'servico'} disabled>Serviço</option>
                                {loadingServices ? (
                                    <option>Carregando....</option>
                                ) : (
                                    services.slice(3).map((service, _) => (
                                        <option value={service.id}>{service.service}</option>
                                    ))
                                )}
                            </select>
                            <input type="int" name="percentual" placeholder="Percentual" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" required />
                            <input type="int" name="value" placeholder="Valor" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" />
                            <input type="int" name="deadline" placeholder="Prazo" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" />
                        </form>
                    </>
                )
                    : <p className="my-4 text-sm text-right underline cursor-pointer text-stone-700" onClick={() => setIsServiceFormOpen(true)}>
                        Adicionar mais um serviço
                    </p>
                }

                <Button text={"Cadastrar Valores dos serviços"} variant="dark" className="w-full mx-0 p-2 text-sm mt-4"></Button>
            </form>
            <Snackbar
                message={snackbarMessage}
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
            />
        </>
    )
}
