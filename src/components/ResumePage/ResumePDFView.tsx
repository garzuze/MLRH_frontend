import { PDFViewer } from "@react-pdf/renderer"
import { useResume } from "../../hooks/useResume"
import { useWorkExperiences } from "../../hooks/useWorkExperiences"
import ResumePDF from "./pdf/ResumePDF"

const ResumePDFView = () => {
    const { data: resume } = useResume(100);
    const { data: workExperiences } = useWorkExperiences(100);
    const resumeData = Array.isArray(resume) ? resume[0] : resume;

    if (resumeData && workExperiences) {
        return (
            <PDFViewer style={{ width: '100%', height: '100%' }}>
                <ResumePDF resume={resumeData} experiences={workExperiences}/>
            </PDFViewer>
        )
    }
}

export default ResumePDFView;