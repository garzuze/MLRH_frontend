import { Card } from "../ui/Card";
import PayableTitleForm from "./PayableTitleForm";
import ProfileTable from "./ProfileTable";
import ReceivableTitleForm from "./ReceivableTitleForm";
import ReceivableTitleList from "./ReceivableTitleList";

const FinanceCards = () => {
    return (<>
        <Card title="Vagas abertas" form={ProfileTable} variant="2/3"></Card>
        <Card title="Cadastrar Contas a receber" form={ReceivableTitleForm} variant="1/3" />
        <Card title="Cadastrar Contas a pagar" form={PayableTitleForm} variant="1/3" />
        <Card title="Lista de contas a receber" form={ReceivableTitleList} variant="1/3" />
    </>)
};

export default FinanceCards