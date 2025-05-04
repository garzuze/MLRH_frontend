import { Card } from "../ui/Card";
import PayableTitleForm from "./PayableTitleForm";
import ReceivableTitleForm from "./ReceivableTitleForm";
import ReceivableTitleList from "./ReceivableTitleList";

const FinanceCards = () => {
    return (<>
        <Card title="Cadastrar Contas a receber" form={ReceivableTitleForm} variant="1/3" />
        <Card title="Cadastrar Contas a pagar" form={PayableTitleForm} variant="1/3" />
        <Card title="Lista de contas a receber" form={ReceivableTitleList} variant="1/3" />
    </>)
};

export default FinanceCards