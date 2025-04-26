import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useProfiles } from "../../hooks/useProfiles";
import { useReports } from "../../hooks/useReports";
import ReportPDF from "./pdf/ReportPDF";
import { ReportType } from "../../types/ReportType";
import { useResume } from "../../hooks/useResume";
import { useWorkExperiences } from "../../hooks/useWorkExperiences";
import { useAuth } from "../../contexts/AuthContext";
import { FiDownload } from "react-icons/fi";

export default function ReportList() {
  const { reports, loadingReports, reportsError } = useReports();

  if (loadingReports) return <div>Carregando pareceres...</div>;
  if (reportsError) return <div>Erro ao carregar pareceres.</div>;

  return (
    <ul className="space-y-2">
      {reports.map((report) => (
        <li key={report.id}>
          <Report report={report} />
        </li>
      ))}
    </ul>
  );
}

interface ReportProps {
  report: ReportType;
}

function Report({ report }: ReportProps) {
  const [showPDF, setShowPDF] = useState(false);

  const { data: profiles, refetch: refetchProfiles, isFetching: fetchingProfiles } =
    useProfiles(report.profile, { enabled: false });
  const { data: resume, refetch: refetchResume, isFetching: fetchingResume } =
    useResume(report.resume, { enabled: false });
  const { data: experiences, refetch: refetchExperiences, isFetching: fetchingExperiences } =
    useWorkExperiences(report.resume, { enabled: false });
  const { user } = useAuth();

  const profileData = Array.isArray(profiles) ? profiles[0] : profiles;
  const resumeData = Array.isArray(resume) ? resume[0] : resume;


  if (fetchingProfiles || fetchingResume || fetchingExperiences) {
    return <div>Carrendo dados do PDF...</div>;
  }

  const handleCreatePDF = async () => {
    await Promise.all([
      refetchProfiles(),
      refetchResume(),
      refetchExperiences(),
    ]);
    setShowPDF(true);
  };

  if (!showPDF) {
    return (
      <div className="text-sm text-gray-800 px-2 py-1 hover:bg-gray-100 rounded">
        <div onClick={handleCreatePDF} className="flex items-center justify-between text-stone-600 hover:text-stone-900 hover:cursor-pointer">
          <p className="w-4/5">{report.strRepresentation}</p>
          <FiDownload size={14}/>
        </div>
      </div>
    );
  }

  if (profileData && resumeData && experiences && user) {
    return (
      <div className="text-sm text-stone-900 px-2 py-1 hover:bg-gray-100 rounded">
        <div>{report.strRepresentation}</div>
        <PDFDownloadLink
          document={
            <ReportPDF
              report={report}
              profile={profileData}
              resume={resumeData}
              experiences={experiences}
              user={user}
            />
          }
          className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
          fileName={`${report.strRepresentation}.pdf`}
        >
          {({ loading }) => (loading ? 'Gerando PDF...' : 'Baixar PDF')}
        </PDFDownloadLink>
      </div>
    );
  }

}
