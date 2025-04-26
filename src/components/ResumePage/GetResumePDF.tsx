import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { useResume } from "../../hooks/useResume";
import { useWorkExperiences } from "../../hooks/useWorkExperiences";
import { ResumeType } from "../../types/ResumeType";
import ResumePDF from "./pdf/ResumePDF"

interface GetResumePDFProps {
    resumeId: number;
}

export function GetResumePDF({ resumeId }: GetResumePDFProps) {
    const [ready, setReady] = useState(false);
    const { data: resume, refetch: refetchResume, isFetching: fetchingResume } =
        useResume(resumeId, { enabled: false });
    const { data: experiences, refetch: refetchExperiences, isFetching: fetchingExperiences } =
        useWorkExperiences(resumeId, { enabled: false });

    const resumeData = Array.isArray(resume) ? resume[0] : resume;


    if (fetchingResume || fetchingExperiences) {
        return <div>Carrendo dados do PDF...</div>;
    }

    const handleCreatePDF = async () => {
        await Promise.all([
            refetchResume(),
            refetchExperiences(),
        ]);
        setReady(true);
    };

    if (!ready) {
        return (
            <div className="text-sm text-gray-800 px-2 py-1 hover:bg-gray-100 rounded">
                <div onClick={handleCreatePDF} className="flex items-center justify-between text-stone-600 hover:text-stone-900 hover:cursor-pointer">
                    <FiDownload size={14} className="mx-auto"/>
                </div>
            </div>
        );
    }

    if (!resume || !experiences) {
        return <div>Erro ao carregar dados do currículo.</div>;
    }


    return (
        <PDFDownloadLink
            document={<ResumePDF resume={resumeData as ResumeType} experiences={experiences} />}
            fileName={`Currículo - ${resumeData?.name}.pdf`}
            className="px-2 py-1 text-sm text-stone-900 hover:bg-gray-100 rounded flex items-center"
        >
            {({ loading }) =>
                loading ? 'Preparando PDF…' : (
                    <>
                        <FiDownload size={14} className="me-1" />
                        Baixar
                    </>
                )
            }
        </PDFDownloadLink>
    );
}
