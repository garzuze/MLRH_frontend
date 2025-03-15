import { ResumeProvider, useResume } from "../contexts/ResumeContext";
import Title from "../components/ui/Title";
import { ResumeForm } from "../components/ResumePage/ResumeForm";
import { WorkExperienceForm } from "../components/ResumePage/WorkExperienceForm";
import { BasicInfoType } from "../types/BasicInfoType";
import { useWorkExperiences } from "../hooks/useWorkExperiences";

export default function ResumePage() {
    return (
        <ResumeProvider>
            <Resume></Resume>
        </ResumeProvider>
    )
}


function Resume() {
    const { resume } = useResume();
    const { WorkExperiences, loadingWorkExperiences } = useWorkExperiences();
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
                    <Title variant="h3" text={`Experiências`} className="text-center pb-2 my-6" />
                    <WorkExperienceForm />
                    {(!loadingWorkExperiences && WorkExperiences) && (
                        WorkExperiences.map((experience) => (
                            <WorkExperienceForm experience={experience} />
                        ))
                    )}
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