import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { ResumeType } from "../types/ResumeType";
import { useAxiosClient } from "../hooks/useAxiosClient";

interface ResumeContextType {
    resume: ResumeType | null;
    setResume: React.Dispatch<React.SetStateAction<ResumeType | null>>
    getResume: () => Promise<ResumeType>;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
    const [resume, setResume] = useState<ResumeType | null>(null);
    const axiosClient = useAxiosClient();

    const getResume = useCallback(async () => {
        try {
            const response = await axiosClient.get("hr/resume/");
            return response.data[0];
        } catch (error) {
            console.error("Failed to fetch resume:", error);
            return null;
        }
    }, []);

    useEffect(() => {
        if (!resume) {
            getResume().then((data) => {
                if (data) setResume(data);
            });
        }
        console.log(resume)
    }, [resume, getResume]);

    return (
        <ResumeContext.Provider value={{ resume, setResume, getResume }}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error("UseResume deve ser utilizado dentro de um ResumeProvider!")
    }
    return context;
}