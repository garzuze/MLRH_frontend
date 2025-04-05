import { ClientProvider } from "../../contexts/ClientContext";
import { Card } from "../ui/Card";
import ProfileForm from "./ProfileForm";
import ReportForm from "./ReportForm";
import ReportList from "./ReportList";

export default function SalesCards() {
    return <>
        <ClientProvider>
            <Cards />
        </ClientProvider>
    </>
}

function Cards() {
    return (<>
        <Card title="Cadastrar perfil" form={ProfileForm} variant="1/3" />
        <Card title="Cadastrar parecer" form={ReportForm} variant="1/3" />
        <Card title="Lista de pareceres" form={ReportList} variant="1/3" />
    </>)
}