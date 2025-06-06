import { useState } from "react"
import Button from "../ui/Button"
import Title from "../ui/Title"
import { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAxiosClient } from "../../hooks/useAxiosClient";
import React from "react";
import Snackbar from "../ui/Snackbar";
import { validateCPF } from "../../utils/validateCPF";

export default function Resume() {

    const { login, register, logout } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [action, setAction] = useState<"cpf" | "login" | "register">("cpf");
    const [message, setMessage] = useState<string>();
    const navigate = useNavigate();
    const axiosClient = useAxiosClient();


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!validateCPF(cpf)) {
            setSnackbarMessage("Por favor, insira um CPF válido!")
            setIsSnackbarOpen(true);
        }
        if (validateCPF(cpf)) {
            try {
                const response: AxiosResponse = await axiosClient.get(`hr/get_resume_cpf?cpf=${cpf}`)
                if (response.status === 200) {
                    setAction("login");
                } else {
                    setAction("register");
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 404) {
                        setAction("register");
                    }
                }
            }
        }

        if (action === "login" && email && password && validateCPF(cpf)) {
            const response = await login(email, password);
            if (response?.status === 200) {
                navigate('/curriculo');
            } else if (response?.status === 400) {
                setSnackbarMessage("Email ou senha incorretos! Tente novamente")
            }
            setIsSnackbarOpen(true);
        } else if (action === "register" && email && password && validateCPF(cpf)) {
            logout();
            try {
                const response = await login(email, password);
                if (response?.status === 200) {
                    navigate('/curriculo');
                } else {
                    const response = await register(email.toLowerCase(), password, cpf);
                    if (response?.status === 201) {
                        setMessage("Cadastro recebido com sucesso! Se os dados fornecidos forem válidos, você receberá um e-mail com instruções para ativar sua conta.");
                    } else if (response?.status === 400) {
                        setSnackbarMessage("Ops! Alguma coisa deu errado. Verifique seus dados.");
                        setIsSnackbarOpen(true);
                    }
                }
            } catch (error) {
                setSnackbarMessage("Ops! Alguma coisa deu errado. Verifique seus dados.");
                setIsSnackbarOpen(true);
            }

        }
    }

    return (
        <div className="bg-neutral-950">
             <div className="border-y-2 border-neutral-800 w-full font-roboto 2xl:max-w-screen-xl mx-auto bg-neutral-950" id="curriculo">
            <div className="lg:border-l lg:border-l-neutral-700 border-dashed border-b border-b-neutral-700 w-full lg:max-w-screen-lg mx-auto">
                <Title variant={"h2"} text={"Cadastre seu currículo"} className={"text-center md:text-left md:ml-12 lg:ml-24 pt-8"}></Title>
                <h5 className="subtitle text-center md:text-left md:ml-12 lg:ml-24 font-normal text-lg text-gray-400 md:text-xl mt-2 mb-8">
                    E tenha acesso às melhores vagas
                </h5>
            </div>
            <div className="lg:border-l lg:border-l-zinc-700 border-dashed pb-8 w-full lg:max-w-screen-lg mx-auto">
                <form className="max-w-sm md:text-left md:ml-12 lg:ml-24 mx-auto" onSubmit={handleSubmit}>
                    <div className="pt-5">
                        <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-zinc-200">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            className="bg-neutral-950 border border-neutral-800 text-zinc-200 text-sm rounded-lg focus:ring-indigo-950 focus:border-indigo-950 hover:ring-indigo-950 block w-full p-2.5"
                            placeholder="123.456.789-10"
                            required
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value.replace(/\D/g, "").length >= 11 ? e.target.value.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4") : e.target.value)}
                            minLength={11}
                            maxLength={14}
                        />
                    </div>
                    {(action !== "cpf") && (
                        <div>
                            <Title variant={"h3"} text={"Por favor, insira seus dados para continuar."} className={"pt-5"}></Title>
                            <p className="text-zinc-200 py-2">
                                Após uma análise interna, o sistema pode enviar o email de verificação (no caso de novo cadastro) ou liberar o acesso (para login).

                            </p>
                            <div className="email py-5">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-zinc-200">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-neutral-950 border border-neutral-800 text-zinc-200 text-sm rounded-lg focus:ring-indigo-950 focus:border-indigo-950 hover:ring-indigo-950 block w-full p-2.5"
                                    placeholder="fulano@email.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="password mb-5">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-zinc-200">Senha</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="bg-neutral-950 border border-neutral-800 text-zinc-200 text-sm rounded-lg focus:ring-indigo-950 focus:border-indigo-950 ring-indigo-950 block w-full p-2.5"
                                    required
                                    value={password}
                                    placeholder="*******"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {/* Honeypot */}
                            <div className="hidden">
                                <label>Por favor, não preencha este campo (deixe-o vazio):</label>
                                <input type="text" name="confirm_email" value="" />
                            </div>
                            <p className="text-zinc-200 py-2">
                                {message}
                            </p>
                        </div>)
                    }
                    <Button text={"Continuar"} variant="dark" className={"ml-0"} type="submit" />
                </form>
            </div>
            <Snackbar
                message={snackbarMessage}
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
            />
        </div>
       </div>
    )
}