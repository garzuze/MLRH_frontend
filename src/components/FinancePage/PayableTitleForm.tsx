import { AxiosResponse } from "axios";
import { useState } from "react";
import { useAxiosClient } from "../../hooks/useAxiosClient";
import Button from "../ui/Button";
import Snackbar from "../ui/Snackbar";

const PayableTitleForm = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const axiosClient = useAxiosClient();

  async function createPayableTitle(formData: FormData) {
    try {
      const response: AxiosResponse = await axiosClient.post("/finance/payable_title/", formData);
      if (response.status === 201) {
        setSnackbarMessage("Título criado com sucesso!");
        (document.getElementById('PayableTitleForm') as HTMLFormElement).reset();
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
    createPayableTitle(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="post" id="PayableTitleForm">

        <input type="text" name="documentNumber" className="text-sm placeholder:text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" placeholder="Número do documento" required />

        <input type="text" name="invoiceNumber" className="text-sm placeholder:text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" placeholder="Número do boleto ou fatura" required />

        <input type="text" name="supplier" className="text-sm placeholder:text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" placeholder="Fornecedor" />

        <input type="number" name="amount" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" placeholder="Valor do título" />
        <input type="text" name="description" className="text-sm placeholder:text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" placeholder="Descrição do Título" />

        <label className="text-sm text-stone-400">
          Data de emissão
        </label><br />
        <input type="date" name="issueDate" className="text-sm text-stone-400" /><br />

        <label className="text-sm text-stone-400">
          Data de vencimento
        </label><br />
        <input type="date" name="paymentDate" className="text-sm text-stone-400" /><br />

        <label className="text-sm text-stone-400">
          Data de vencimento
        </label><br />
        <input type="date" name="dueDate" className="text-sm text-stone-400" placeholder="Previsão de Entrega" /><br />

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

export default PayableTitleForm