import { useEffect, useState, useRef, ReactNode } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/ui/Title";
import Button from "../components/ui/Button";
import { useAxiosClient } from "../hooks/useAxiosClient";

export default function VerifyEmailPage() {
    const [verified, setVerified] = useState<boolean>();
    const [searchParams] = useSearchParams();
    const uid = searchParams.get("uid");
    const token = searchParams.get("token");
    const hasSentRequest = useRef(false);
    const navigate = useNavigate();
    const axiosClient = useAxiosClient();


    let status: ReactNode;

    useEffect(() => {
        const verifyEmail = async (uid: string, token: string) => {
            try {
                await axiosClient.get(`api/verify-email?uid=${uid}&token=${token}`);
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

    if (verified) {
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            navigate('/');
        }

        status =
            <div>
                <Title variant="h2" text="Email validado!"></Title>
                <form onSubmit={handleSubmit}>
                    <div className="mx-auto text-center">
                        <Button text="Fazer login" type="submit"></Button>
                    </div>
                </form>
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
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen font-roboto bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-900 lg:py-0">
                    {status}
                </div>
            </div>
        </main>
    );
}