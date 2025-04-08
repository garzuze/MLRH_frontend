import { PDFViewer } from "@react-pdf/renderer"
import ResumeTemplate from "./pdf/ResumePDF"
import { useResume } from "../../hooks/useResume"
import { mlrhUser } from "../../types/TokenResponse"
import { useWorkExperiences } from "../../hooks/useWorkExperiences"

const ResumePDFView = () => {
    const { data: resume } = useResume(9, { enabled: true });
    const { data: workExperiences } = useWorkExperiences(9, { enabled: true });
    const resumeData = Array.isArray(resume) ? resume[0] : resume;

    const user: mlrhUser = {
        id: 123,
        email: 'teste@teste.com',
        cpf: "111.111.1111-111",
        firstName: "Testtinho",
        lastName: "Testando",
        isActive: true,
        isStaff: false,
        isSuperuser: false,
    }
    if (resumeData && workExperiences) {
        return (
            <PDFViewer style={{ width: '100%', height: '100%' }}>
                <ResumeTemplate resume={resumeData} user={user} experiences={workExperiences}/>
            </PDFViewer>
        )
    }
}

export default ResumePDFView;