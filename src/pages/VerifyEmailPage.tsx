import { useEffect, useState, useRef, ReactNode } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/ui/Title";
import Button from "../components/ui/Button";
import { useAxiosClient } from "../hooks/useAxiosClient";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function VerifyEmailPage() {
    const [verified, setVerified] = useState<boolean>();
    const [searchParams] = useSearchParams();
    const uid = searchParams.get("uid");
    const token = searchParams.get("token");
    const hasSentRequest = useRef(false);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate();
    const { login } = useAuth();
    const axiosClient = useAxiosClient();


    let status: ReactNode;

    useEffect(() => {
        const verifyEmail = async (uid: string, token: string) => {
            try {
                const response = await axiosClient.get(`api/verify-email?uid=${uid}&token=${token}`);
                setEmail(response.data.email);
                setVerified(true);
            } catch (error) {
                console.error(error);
                setVerified(false);
            }
        };
        if (uid && token && !hasSentRequest.current) {
            hasSentRequest.current = true;
            verifyEmail(uid, token);
        }
    }, [uid, token]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email && password) {
            const isLogged = await login(email, password);
            if (isLogged) {
                navigate('/curriculo');
            } else {
                status = "Houve algum erro"
            }
        }
    }

    if (verified) {
        status =
            <div>
                <Title variant="h2" text="Email validado!" className="text-center"></Title>
                <h5 className="subtitle text-center font-normal text-lg text-gray-400 md:text-xl mt-2 mb-8">
                    Agora você pode cadastar seu currículo.
                </h5>
                    <div className="mx-auto text-center">
                        <form onSubmit={handleSubmit} className="bg-neutral-950 border border-neutral-800 rounded-lg shadow md:mt-0 sm:max-w-md p-8">
                            <label htmlFor="email" className="block mb-2 text-sm text-left font-medium text-zinc-200">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="bg-neutral-950 border border-neutral-800 text-zinc-200 text-sm rounded-lg focus:ring-indigo-950 focus:border-indigo-950 hover:ring-indigo-950 block w-full p-2.5"
                                required
                            value={email}
                            />
                            <label htmlFor="password" className="block my-2 text-left text-sm font-medium text-zinc-200">Senha</label>
                            <input
                                type="password"
                                id="password"
                                className="bg-neutral-950 border border-neutral-800 text-zinc-200 text-sm rounded-lg focus:ring-indigo-950 focus:border-indigo-950 ring-indigo-950 block w-full p-2.5"
                                required
                                value={password}
                                placeholder="*******"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button text="Cadastrar currículo" type="submit" className="w-full mx-0"></Button>
                        </form>
                    </div>
            </div>
    } else {
        status =
            <div>
                <Title variant="h2" text="Alguma coisa deu errado." className="py-8"></Title>
                <div className="mx-auto text-center">
                    <Button text="Contatar suporte"></Button>
                </div>
            </div>
    }

    return (
        <main className="w-full mx-auto min-h-screen grid grid-cols-4">
            <div className="col-span-4">
                <div className="flex flex-col items-center justify-center px-6 py-8 h-screen font-roboto bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-900 lg:py-0">
                    {status}
                </div>
            </div>
        </main>
    );
}