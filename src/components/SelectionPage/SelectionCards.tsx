import { ClientProvider, useClient } from "../../contexts/ClientContext";
import { Card } from "../ui/Card";
import ProfileForm from "./ProfileForm";

export default function SalesCards() {
    return <>
        <ClientProvider>
            <Cards />
        </ClientProvider>
    </>
}

function Cards() {
    return (<>
        <Card title="Cadastrar perfil" form={ProfileForm} variant="2/3" />

    </>)
}