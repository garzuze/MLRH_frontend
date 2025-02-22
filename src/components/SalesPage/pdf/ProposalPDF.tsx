import { Document, Page, Text, View, StyleSheet, renderToFile } from "@react-pdf/renderer";
import { ClientType } from "../../../types/ClientType";
import { ClientContactType } from "../../../types/ClientContactType";
import { ClientFeeType } from "../../../types/ClientFeeType";
import { serviceType } from "../../../services/useServices";

const styles = StyleSheet.create({
    page: { padding: 20 },
    section: { marginBottom: 10 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    text: { fontSize: 12 },
    listItem: { marginLeft: 10, fontSize: 12 },
});

interface ProposalPDFProps {
    clientData: ClientType;
    clientContactData: ClientContactType;
    clientFeeData: ClientFeeType[];
    services: serviceType[];
}

export function ProposalPDF({ clientData, clientContactData, clientFeeData, services }: ProposalPDFProps) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Proposta Comercial</Text>
                    <Text style={styles.text}>Empresa: {clientData.corporate_name}</Text>
                    <Text style={styles.text}>Localização: {clientData.city} - {clientData.state}</Text>
                    <Text style={styles.text}>Contato: {clientContactData.name} - {clientContactData.department}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Investimento</Text>
                    {clientFeeData.map((fee) => (
                        <Text key={fee.id} style={styles.listItem}>
                            {services.find(s => s.id === fee.service)?.service} - {fee.percentual ? `${fee.percentual}%` : `R$${fee.value}`}
                            {fee.deadline && ` - Prazo: ${fee.deadline}`}
                        </Text>
                    ))}
                </View>
            </Page>
        </Document>
    );
}

