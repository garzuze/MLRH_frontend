import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useProfiles } from "../../hooks/useProfiles";
import { useReports } from "../../hooks/useReports";
import ReportPDF from "./pdf/ReportPDF";
import { ReportType } from "../../types/ReportType";
import { useResume } from "../../hooks/useResume";
import { useWorkExperiences } from "../../hooks/useWorkExperiences";
import { useAuth } from "../../contexts/AuthContext";

export default function ReportList() {
  const { reports, loadingReports, reportsError } = useReports();

  if (loadingReports) return <div>Carregando pareceres...</div>;
  if (reportsError) return <div>Erro ao carregar pareceres.</div>;

  return (
    <ul>
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
      <div>
        <div>{report.strRepresentation}</div>
        <button
          className="p-2 bg-black font-semibold rounded text-stone-100"
          onClick={handleCreatePDF}
        >
          Criar PDF
        </button>
      </div>
    );
  }

  if (fetchingProfiles || fetchingResume || fetchingExperiences) {
    return <div>Carrendo dados do PDF...</div>;
  }

  const profileData = Array.isArray(profiles) ? profiles[0] : profiles;
  const resumeData = Array.isArray(resume) ? resume[0] : resume;

  if (profileData && resumeData && experiences && user) {
    return (
      <div>
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
          fileName={`${report.strRepresentation}.pdf`}
        >
          {({ loading }) => (loading ? 'Gerando PDF...' : 'Baixar PDF')}
        </PDFDownloadLink>
      </div>
    );
  }

}
