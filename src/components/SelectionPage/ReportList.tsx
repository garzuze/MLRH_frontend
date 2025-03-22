import { PDFDownloadLink } from "@react-pdf/renderer";
import { useProfiles } from "../../hooks/useProfiles";
import { useReports } from "../../hooks/useReports"
import ReportPDF from "./pdf/ReportPDF";
import { ReportType } from "../../types/ReportType";
import { useResume } from "../../hooks/useResume";
import { useWorkExperiences } from "../../hooks/useWorkExperiences";
import { useAuth } from "../../contexts/AuthContext";

export default function ReportList() {
  const { reports, loadingReports, reportsError } = useReports();

  return (
    <ul>
      {reports.map((report, key) => (
        <Report report={report} key={key} />
      ))}
    </ul>
  )
}

interface ReportProps {
  report: ReportType;
}

function Report({ report }: ReportProps) {
  const { profiles, loadingProfiles, profilesError } = useProfiles(report.profile);
  const { resume, loadingResume, resumeError } = useResume(report.resume);
  const { experieces, laodingExperiences, experiecesError } = useWorkExperiences(report.resume);
  const { user } = useAuth();

  if (loadingProfiles || loadingResume || laodingExperiences) {
    return <div>Carregando...</div>;
  }
  if (profilesError || resumeError || experiecesError) {
    return <div>Erro ao carregar.</div>;
  }

  const profileData = Array.isArray(profiles) ? profiles[0] : profiles
  const resumeData = Array.isArray(resume) ? resume[0] : resume
  if (user) {
    return (
      <div>
        <div>{profileData.strRepresentation} {resumeData.name}</div>
        <button className="p-2 bg-black font-semibold rounded text-stone-100">
          <PDFDownloadLink
            document={
              <ReportPDF
                report={report}
                profile={profileData}
                resume={resumeData}
                experieces={experieces}
                user={user}
              />
            }
            fileName={`${resumeData.name} - ${profileData.strRepresentation}.pdf`}
          >
            {({ loading }) => (loading ? 'Gerando PDF...' : 'Baixar PDF')}
          </PDFDownloadLink>
        </button>
      </div>
    );

  }
}