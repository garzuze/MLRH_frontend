import { ResumeForm } from "../components/ResumePage/ResumeForm";
import { WorkExperienceForm } from "../components/ResumePage/WorkExperienceForm";
import { useWorkExperiences } from "../hooks/useWorkExperiences";
import { useResume } from "../hooks/useResume";
import { useAuth } from "../contexts/AuthContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../components/ResumePage/pdf/ResumePDF";
import Title from "../components/ui/Title";
import Button from "../components/ui/Button";
import { useParams } from "react-router-dom";

export default function ResumePage() {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { data: resume, error: resumeError } = useResume(id && user?.isSuperuser ? Number(id) : undefined);
    const { data: experieces, isLoading: laodingExperiences } = useWorkExperiences(id && user?.isSuperuser ? Number(id) : undefined);
    const resumeData = Array.isArray(resume) ? resume[0] : resume;
    if (user && !resumeError) {
        return (
            <main className="w-full mx-auto">
                <div className="px-6 py-8 font-roboto bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-900">
                    <Title variant="h3" text={`Seja bem vindo${resumeData ? `, ${resumeData.name}` : ""}!`} className="text-center pb-2" />
                    <p className="mb-3 font-normal text-zinc-300 line-clamp-3 text-center">Estas são as informações do seu currículo:</p>
                    <div className="w-full bg-neutral-950 border border-neutral-800 rounded-lg shadow md:mt-0 md text-zinc-50 p-4 xl:max-w-screen-xl mx-auto">
                        <ResumeForm resume={resumeData} user={user} />
                        { resumeData && user && experieces && (
                            <button className="bg-neutral-950 border-2 border-neutral-800 text-zinc-50 m-2 p-3 rounded-md w-40 font-bold">
                                <PDFDownloadLink
                                    document={
                                        <ResumePDF
                                            resume={resumeData}
                                            experiences={experieces}
                                        />
                                    }
                                    fileName={`Currículo - ${resumeData.name}.pdf`}
                                >
                                    {({ loading }) => (loading ? 'Gerando PDF...' : 'Baixar PDF')}
                                </PDFDownloadLink>
                            </button>
                        )}
                    </div>
                    {resumeData && (
                        <>
                            <Title variant="h3" text={`Experiências`} className="text-center pb-2 my-6" />
                            <WorkExperienceForm resumeId={resumeData.id} />
                            {!laodingExperiences && experieces &&
                                experieces.map((experience) => (
                                    <WorkExperienceForm key={experience.id} resumeId={resumeData.id} experience={experience} />
                                ))
                            }</>
                    )}
                </div>
            </main>
        );
    }
    return (
        <main className="w-full mx-auto min-h-screen grid grid-cols-4">
            <div className="col-span-4">
                <div className="flex flex-col items-center justify-center px-6 py-8 h-screen font-roboto bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-900 lg:py-0">
                    <Title text="Você precisa estar logado para ver seu currículo!" variant="h2"></Title>
                    <a href="https://mlrh-frontend.vercel.app/#curriculo">
                        <Button text="Fazer login"></Button>
                    </a>
                </div>
            </div>
        </main>
    )

}