import { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import ClientSelector from "../form/ClientAutocompletInput";
import { ClientType } from "../../types/ClientType";
import { useQueryClient } from "@tanstack/react-query";
import { useAxiosClient } from "../../hooks/useAxiosClient";
import Button from "../ui/Button";
import Snackbar from "../ui/Snackbar";
import { useProfiles } from "../../hooks/useProfiles";
import { useClientMlrh } from "../../hooks/useClientMlrh";
import { useReports } from "../../hooks/useReports";
import { useClientContact } from "../../hooks/useClientContact";
import { clientData, ReportType } from "../../types/ReportType";
import { ReceivableTitleType } from "../../types/ReceivableTitleType";

const ReceivableTitleForm = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedReports, setSelectedReports] = useState<ReportType[]>();
  const [amount, setAmount] = useState<number>();

  // Referência para controle do select
  const selectRef = useRef<HTMLSelectElement>(null);
  // Última seleção válida
  const lastValidSelection = useRef<number[]>([]);

  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  const {
    data: reports,
    isFetching: fetchingReports,
    error: reportsError,
    refetch: refetchReports
  } = useReports({ invoiceable: true });
  async function createReceivableTitle(data: ReceivableTitleType) {
    try {
      const response: AxiosResponse = await axiosClient.post("/finance/receivable_title/", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        setSnackbarMessage("Título criado com sucesso!")
        queryClient.invalidateQueries({ queryKey: ['receivable_title'] });
        (document.getElementById('ReceivableTitleForm') as HTMLFormElement).reset();
        setAmount(undefined);
        setSelectedReports(undefined);
      }
    } catch (error) {
      setSnackbarMessage("Ops... Alguma coisa deu errado.")
      console.error(error);
    }
    setIsSnackbarOpen(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    if (!selectedReports) {
      setSnackbarMessage("Você precisa selecionar pareceres!")
      setIsSnackbarOpen(true);
      return
    }
    event.preventDefault();
    const formValues = Object.fromEntries(Array.from(formData.entries()).filter(
      ([_, value]) => value !== ""
    ));
    const payload = {
      ...formValues,
      reports: selectedReports?.map(r => r.id),
      client: selectedReports[0].clientData.client,
      clientContact: selectedReports[0].clientData.clientContact,
    } as ReceivableTitleType;

    createReceivableTitle(payload);
  }

  const handleSelectReports = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    // Pega os ids dos pareceres que o usuário selecionou
    const selectedIds = Array.from(event.target.selectedOptions, option => Number(option.value));
    // Pega os pareceres baseado nos ids
    const selectedReports = reports?.filter(r => selectedIds.includes(r.id)) || [];
    // Transforma em set (elimina duplicatas)
    const clientsIds = new Set(selectedReports.map(r => r.clientData.client));
    if (clientsIds.size > 1) {
      setSnackbarMessage("Os pareceres tem que ser do mesmo cliente!")
      setIsSnackbarOpen(true);

      // Reverter para seleção anterior válida
      if (selectRef.current) {
        selectRef.current.value = lastValidSelection.current.join(",");
      }
      return;
    }
    setSelectedReports(selectedReports);
    const amount = selectedReports.reduce((acc, report) => acc + (Number(report.agreedSalary) * Number(report.profileFee) / 100), 0)
    setAmount(amount)
    lastValidSelection.current = selectedIds;
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="post" id="ReceivableTitleForm">
        <p className="text-sm">Selecione os pareceres aprovados</p>
        <select
          ref={selectRef}
          multiple={true}
          value={lastValidSelection.current as unknown as string[]}
          defaultValue={[""]}
          name="reports"
          disabled={fetchingReports}
          onChange={handleSelectReports}
          className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full">
          {fetchingReports ? (<option disabled>Carregando...</option>)
            : (
              reports?.map((report, key) => (
                <option key={key} value={report.id}>{report.strRepresentation}</option>
              ))
            )}
        </select>

        <ul>
          {selectedReports ? selectedReports.map((r, key) => (
            <li className="text-sm">{r.agreedSalary} x {r.profileFee}% = {(Number(r.agreedSalary) * Number(r.profileFee)) / 100}</li>
          )) : null}

        </ul>

        <input type="number" name="amount" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" placeholder="Valor do título" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <input type="text" name="document" className="text-sm placeholder:text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" placeholder="Número do documento" required />

        <label className="text-sm text-stone-400">
          Data de vencimento
        </label>
        <br />
        <input type="date" name="dueDate" className="text-sm text-stone-400" placeholder="Data de vencimento" />
        <br />

        <label className="text-sm text-stone-400">
          Data de pagamento
        </label>
        <br />
        <input type="date" name="paymentDate" className="text-sm text-stone-400" placeholder="Data de pagamento" />

        <Button text={"Cadastrar Título"} variant="dark" className="w-full mx-0 p-2 text-sm mt-4"></Button>

      </form>
      <Snackbar
        message={snackbarMessage}
        isOpen={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
      />
    </>
  )
};

export default ReceivableTitleForm