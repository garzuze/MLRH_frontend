import { Card } from "../ui/Card";
import ReceivableTitleForm from "./ReceivableTitleForm";

const FinanceCards = () => {
    return (<>
        <Card title="Cadastrar Contas a receber" form={ReceivableTitleForm} variant="1/3" />
    </>)
};

export default FinanceCards