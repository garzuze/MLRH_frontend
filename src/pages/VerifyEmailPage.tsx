import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "react-router-dom";
import { axiosClient } from "../utils/constants";

export default function VerifyEmailPage() {
    const [message, setMessage] = useState<string>();
    const [searchParams] = useSearchParams();
    const uid = searchParams.get("uid");
    const token = searchParams.get("token");
    const hasSentRequest = useRef(false);

    useEffect(() => {
        const verifyEmail = async (uid: string, token: string) => {
            try {
                await axiosClient.get(`api/verify-email?uid=${uid}&token=${token}`);
                setMessage("Deu boa! foi verificado");
            } catch (error) {
                console.error(error);
                setMessage("Alguma coisa deu errado :(");
            }
        };
        if (uid && token && !hasSentRequest.current) {
            hasSentRequest.current = true;
            verifyEmail(uid, token);
        }
    }, [uid, token]);

    return (
        <main className="text-white text-3xl">
            {message}
        </main>
    );
}