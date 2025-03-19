import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";
import { ClientContactType } from "../../../types/ClientContactType";
import { ClientFeeType } from "../../../types/ClientFeeType";
import { ClientType } from "../../../types/ClientType";
import { serviceType } from "../../../types/serviceType";
import { ProfileType } from "../../../types/ProfileType";
import { ReportType } from "../../../types/ReportType";
import { ResumeType } from "../../../types/ResumeType";
import { WorkExperienceType } from "../../../types/WorkExperienceType";
import { useProfiles } from "../../../hooks/useProfiles";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 11,
        fontFamily: "Helvetica",
        lineHeight: 1.4,
    },
    header: {
        textAlign: "center",
        fontSize: 16,
        fontFamily: "Helvetica-Bold",
        marginBottom: 20,
    },
    section: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: "#F7F7F7",
        border: "1 solid #CCCCCC",
        borderRadius: 4,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        marginBottom: 8,
        borderBottom: "1 solid #CCCCCC",
        paddingBottom: 4,
    },
    row: {
        flexDirection: "row",
        marginBottom: 6,
    },
});

interface ReportPDFProps {
    report: ReportType;
    profile: ProfileType;
    resume: ResumeType;
    experieces: WorkExperienceType[];
}

const ReportPDF = ({ report, profile, resume, experieces }: ReportPDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>Parecer da Entrevista</Text>

            {/* Empresa e Vaga */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações da vaga</Text>
                <View style={styles.row}>
                    <Text>{profile.strRepresentation}</Text>
                </View>
            </View>

            {/* Disponibilidade de Horários */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                Disponibilidade de Horários
                </Text>
                <View style={styles.row}>
                    <Text>{resume.availability}</Text>
                </View>
            </View>

            {/* Dados do Candidato */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Dados do Candidato</Text>
                <View style={styles.row}>
                <Text>Nome: {resume.name}</Text>
                </View>
                <View style={styles.row}>

                </View>
                <View style={styles.row}>

                </View>
            </View>

            {/* Contexto Familiar */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contexto Familiar</Text>

            </View>

            {/* Histórico educacional */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Histórico educacional</Text>
                <View style={styles.row}>

                </View>
                <View style={styles.row}>

                </View>
                <View style={styles.row}>

                </View>
            </View>

            {/* Resumo profissional */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Resumo profissional</Text>
                <View style={styles.row}>

                </View>
            </View>
        </Page>
    </Document>
);

export default ReportPDF;
