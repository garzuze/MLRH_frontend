import { ClientProvider, useClient } from "../../contexts/ClientContext";
import { ResumeProvider } from "../../contexts/ResumeContext";
import { Card } from "../ui/Card";
import ProfileForm from "./ProfileForm";
import ReportForm from "./ReportForm";

export default function SalesCards() {
    return <>
        <ClientProvider>
            <ResumeProvider>
                <Cards />
            </ResumeProvider>
        </ClientProvider>
    </>
}

function Cards() {
    return (<>
        <Card title="Cadastrar perfil" form={ProfileForm} variant="1/3" />
        <Card title="Cadastrar parecer" form={ReportForm} variant="1/3" />
    </>)
}