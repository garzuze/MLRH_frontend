import Title from "../components/ui/Title";
import { ResumeForm } from "../components/ResumePage/ResumeForm";
import { WorkExperienceForm } from "../components/ResumePage/WorkExperienceForm";
import { useWorkExperiences } from "../hooks/useWorkExperiences";
import { useResume } from "../hooks/useResume";
import { useAuth } from "../contexts/AuthContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../components/ResumePage/pdf/ResumePDF";

export default function ResumePage() {
    const { data: resume } = useResume(undefined, { enabled: true });
    const { user } = useAuth();
    const resumeData = Array.isArray(resume) ? resume[0] : resume;
    const { data: experieces, isLoading: laodingExperiences } = useWorkExperiences(undefined, { enabled: true });
    if (user) {
        return (
            <main className="w-full mx-auto">
                <div className="px-6 py-8 font-roboto bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-900">
                    <Title variant="h3" text={`Seja bem vindo${resumeData ? `, ${resumeData.name}` : ""}!`} className="text-center pb-2" />
                    <p className="mb-3 font-normal text-zinc-300 line-clamp-3 text-center">Estas são as informações do seu currículo:</p>
                    <div className="w-full bg-neutral-950 border border-neutral-800 rounded-lg shadow md:mt-0 md text-zinc-50 p-4 xl:max-w-screen-xl mx-auto">
                        <ResumeForm resume={resumeData} user={user} />
                        {resumeData && user && experieces && (
                            <button className="bg-neutral-950 border-2 border-neutral-800 text-zinc-50 m-2 p-3 rounded-md w-40 font-bold">
                                <PDFDownloadLink
                                    document={
                                        <ResumePDF
                                            resume={resumeData}
                                            user={user}
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
                            <WorkExperienceForm />
                            {!laodingExperiences && experieces &&
                                experieces.map((experience) => (
                                    <WorkExperienceForm key={experience.id} experience={experience} />
                                ))
                            }</>
                    )}
                </div>
            </main>
        );
    }
    return (
        <main className="w-full mx-auto text-white">
            <Title variant={"h3"} text={"Você precisa estar logado para acessar seu currículo!"} ></Title>
        </main>
    )

}