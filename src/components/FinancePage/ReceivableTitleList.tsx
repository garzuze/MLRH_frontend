import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { useClientContact } from "../../hooks/useClientContact";
import { useClientMlrh } from "../../hooks/useClientMlrh";
import { useReceivableTitle } from "../../hooks/useReceivableTitle";
import { useReports } from "../../hooks/useReports";
import { ReceivableTitleType } from "../../types/ReceivableTitleType";
import ReceivableTitlePDF from "./ReceivableTitlePDF";
import { ReportType } from "../../types/ReportType";

export default function ReceivableTitleList() {
  const { data: titles, isLoading: loadingTitles, error: errorTitles } = useReceivableTitle();

  if (loadingTitles) return <div>Carregando Títulos...</div>;
  if (errorTitles) return <div>Erro ao carregar títulos.</div>;

  return (
    <ul className="space-y-2">
      {titles?.map((title) => (
        <li key={title.id}>
          <div className="text-sm text-stone-900 px-2 py-1 hover:bg-gray-100 rounded">
            <Invoice title={title} />
          </div>
        </li>
      ))}
    </ul>
  );
}

interface InvoiceProps {
  title: ReceivableTitleType
}

function Invoice({ title }: InvoiceProps) {
  const [showPDF, setShowPDF] = useState(false);
  const { data: reports, isFetching: fetchingReports, error: reportsError, refetch: refetchReports } = useReports(title.reports, { enabled: false });
  const { data: client, isFetching: fetchingClient, error: clientError, refetch: refetchClients } = useClientMlrh(title.client, { enabled: false })
  const { data: clientContact, isFetching: fetchingClientContact, error: clientContactError, refetch: refetchClientContacts } = useClientContact(title.clientContact, { enabled: false })

  const clientData = Array.isArray(client) ? client[0] : client;
  const clientContactData = Array.isArray(clientContact) ? clientContact[0] : clientContact;

  if (fetchingReports || fetchingClient || fetchingClientContact) {
    return <div>Carrendo dados do PDF...</div>;
  }

  if (reportsError || clientError || clientContactError) {
    return <div>Vish! Deu erro.</div>;

  }

  const handleCreatePDF = async () => {
    await Promise.all([
      refetchReports(),
      refetchClients(),
      refetchClientContacts(),
    ]);
    setShowPDF(true);
  };

  if (!showPDF) {
    return (
      <div className="text-sm text-gray-800 px-2 py-1 hover:bg-gray-100 rounded">
        <div onClick={handleCreatePDF} className="flex items-center justify-between text-stone-600 hover:text-stone-900 hover:cursor-pointer">
          <p className="w-4/5">{title.strRepresentation}</p>
          <FiDownload size={14} />
        </div>
      </div>
    );
  }

  if (reports && clientData && clientContactData && title) {
    return (
      <div className="text-sm text-stone-900 px-2 py-1 hover:bg-gray-100 rounded">
        <div>{title.strRepresentation}</div>
        <PDFDownloadLink
          document={
            <ReceivableTitlePDF
              client={clientData}
              clientContact={clientContactData}
              reports={reports}
              title={title}
            />
          }
          className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
          fileName={`${title.strRepresentation}.pdf`}
        >
          {({ loading }) => (loading ? 'Gerando PDF...' : 'Baixar PDF')}
        </PDFDownloadLink>
      </div>
    );
  }
}
