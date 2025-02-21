import { ReactNode } from "react";
import ClientForm from "./ClientForm";
import ClientContactForm from "./ClientContactForm";
import ClientFeeForm from "./ClientFeeForm";
import { ClientProvider, useClient } from "../../contexts/ClientContext";
import ProposalForm from "./ProposalForm";

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
            <Card title="Criar proposta" form={ProposalForm} variant="full"></Card>
        ) : null}
    </>)
}

interface CardTypes {
    title: string;
    form: () => ReactNode;
    variant: "1/3" | "2/3" | "full"
}

const Card = ({
    title,
    form,
    variant
}: CardTypes) => {
    const variants = {
        "1/3": "md:col-span-4 col-span-12",
        "2/3": "col-span-8",
        "full": "col-span-12"
    }

    return (
        <div className={`p-4 rounded border border-stone-300 ${variants[variant]}`}>
            <div className="flex mb-2 items-start justify-between">
                <div>
                    <h3 className="font-bold mb-2 text-sm">{title}</h3>
                </div>
            </div>
            {form()}
        </div>
    )
}