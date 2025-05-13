import { AxiosResponse } from "axios";
import { useState } from "react";
import ClientSelector from "../form/ClientAutocompletInput";
import { ClientType } from "../../types/ClientType";
import { useQueryClient } from "@tanstack/react-query";
import { useAxiosClient } from "../../hooks/useAxiosClient";
import Button from "../ui/Button";
import Snackbar from "../ui/Snackbar";
import { useProfiles } from "../../hooks/useProfiles";
import { useClientMlrh } from "../../hooks/useClientMlrh";

const ReceivableTitleForm = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  const [client, setClient] = useState<ClientType | null>(null);
  const [amount, setAmount] = useState<number>(0)

  const { data: profiles, isLoading: loadingProfiles, error: profilesError } = useProfiles(undefined, undefined, { enabled: true });
  const clientsIds = profiles?.filter(p => p.status == "A").map((profile) => (profile.client)) || [];
  const { data: clients, isLoading: loadingClients } = useClientMlrh(clientsIds, { enabled: clientsIds.length > 0 });

  async function createReceivableTitle(formData: FormData) {
    try {
      const response: AxiosResponse = await axiosClient.post("/finance/receivable_title/", formData);
      if (response.status === 201) {
        setSnackbarMessage("Título criado com sucesso!")
        queryClient.invalidateQueries({ queryKey: ['receivable_titles'] });
        (document.getElementById('ReceivableTitleForm') as HTMLFormElement).reset();
      }
    } catch (error) {
      setSnackbarMessage("Ops... Alguma coisa deu errado.")
      console.error(error);
    }
    setIsSnackbarOpen(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    createReceivableTitle(formData);
  }

  function handleProfileChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selected = Number(event.target.value);
    const profile = profiles?.find(p => p.id == selected);
    if (profile) {
      setAmount((profile.remuneration * profile.serviceFee) / 100);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="post" id="ReceivableTitleForm">
        <ClientSelector selectedClient={client} setSelectedClient={setClient} />

        <select
          name="profile"
          defaultValue=""
          className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full"
          onChange={handleProfileChange}
          disabled={loadingProfiles || loadingClients}
        >
          <option value="" disabled>Selecione a vaga</option>
          {profilesError ? <option disabled>Houve um erro</option> :
            loadingProfiles || loadingClients ? (<option>Carregando...</option>) :
              profiles?.filter(p => p.status == "A").map((profile) => {
                const client = clients?.find(client => client.id === profile.client);
                return (
                  <option key={profile.id} value={profile.id}>{profile.positionStr} - {client?.tradeName ?? "Carregando..."}</option>
                );
              })
          }
        </select>

        <input type="text" name="document" className="text-sm placeholder:text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" placeholder="Número do documento" />

        <input type="number" name="amount" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" placeholder="Valor do título" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />

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