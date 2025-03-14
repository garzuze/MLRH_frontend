import { useEffect } from "react";
import { ResumeProvider, useResume } from "../contexts/ResumeContext";
import Title from "../components/ui/Title";
export interface BasicInfoType {
    email: string;
    cpf: string;
    password: string;
}

import { ResumeType } from "../types/ResumeType";
import { ResumeForm } from "../components/ResumePage/ResumeForm";
import { mlrhUser } from "../types/TokenResponse";

export default function ResumePage() {
    return (
        <ResumeProvider>
            <Resume></Resume>
        </ResumeProvider>
    )
}


export interface ResumeFormProps {
    resume?: ResumeType;
    basicInfo?: BasicInfoType;
}

function Resume() {
    const { resume } = useResume();
    const basicInfo = JSON.parse(localStorage.getItem('basic_info') ?? "null") as BasicInfoType | null;

    if (resume) {
        return (
            <main className="w-full mx-auto">
                <div className="px-6 py-8 font-roboto bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-900">
                    <Title variant="h3" text={`Seja bem vindo, ${resume.name}!`} className="text-center pb-2" />
                    <p className="mb-3 font-normal text-zinc-300 line-clamp-3 text-center">Estas são as informações do seu currículo:</p>
                    <div className="w-full bg-neutral-950 border border-neutral-800 rounded-lg shadow md:mt-0 md text-zinc-50 p-4 xl:max-w-screen-xl mx-auto">
                        <ResumeForm resume={resume} />
                    </div>
                </div>
            </main>
        );
    } else if (basicInfo) {
        return (
            <main className="w-full mx-auto">
                <div className="px-6 py-8 font-roboto bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-900">
                    <Title variant="h3" text={`Seja bem vindo!`} className="text-center pb-2" />
                    <p className="mb-3 font-normal text-zinc-300 line-clamp-3 text-center">Estas são as informações do seu currículo:</p>
                    <div className="w-full bg-neutral-950 border border-neutral-800 rounded-lg shadow md:mt-0 md text-zinc-50 p-4 xl:max-w-screen-xl mx-auto">
                        <ResumeForm basicInfo={basicInfo} />
                    </div>
                </div>
            </main>
        )
    }
    return (
        <main className="w-full mx-auto text-white">
            <Title variant={"h3"} text={"Você precisa estar logado para acessar seu currículo!"} ></Title>
        </main>
    )

}