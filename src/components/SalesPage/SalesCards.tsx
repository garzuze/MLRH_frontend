import ClientForm from "./ClientForm";
import ClientContactForm from "./ClientContactForm";
import ClientFeeForm from "./ClientFeeForm";
import { ClientProvider, useClient } from "../../contexts/ClientContext";
import ProposalForm from "./ProposalForm";
import { Card } from "../ui/Card";

export default function SalesCards() {
    return <>
        <ClientProvider>
            <Cards />
        </ClientProvider>
    </>
}

function Cards() {
    const { proposalComponent } = useClient();
    return (<>
        <Card title="Cadastrar cliente" form={ClientForm} variant="1/3" />
        <Card title="Cadastrar Contato do cliente" form={ClientContactForm} variant="1/3" />
        <Card title="Definir valor dos serviços" form={ClientFeeForm} variant="1/3" />
        {proposalComponent ? (
            <Card title="Prévia de dados da proposta" form={ProposalForm} variant="full"></Card>
        ) : null}
    </>)
}