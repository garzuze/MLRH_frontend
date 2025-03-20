import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";
import { ProfileType } from "../../../types/ProfileType";
import { ReportType } from "../../../types/ReportType";
import { ResumeType } from "../../../types/ResumeType";
import { WorkExperienceType } from "../../../types/WorkExperienceType";
import { useProfiles } from "../../../hooks/useProfiles";
import { maritalStatus } from "../../../utils/constants";
import getDate from "../../../utils/getDate";

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
    bold: {
        fontFamily: "Helvetica-Bold",
    }
});

interface ReportPDFProps {
    report: ReportType;
    profile: ProfileType;
    resume: ResumeType;
    experieces: WorkExperienceType[];
}

const currentDate = getDate();

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
                <View style={styles.row}>
                    <Text>{currentDate}</Text>
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
                    <Text><Text style={styles.bold}>Nome:</Text> {resume.name}
                        <Text style={styles.bold}> Idade:</Text> {resume.age} anos
                        <Text style={styles.bold}> Natural de:</Text> {resume.birthPlace}</Text>
                </View>
                <View style={styles.row}>
                    <Text><Text style={styles.bold}>Estado Civil:</Text> {maritalStatus[resume.maritalStatus]}
                        <Text style={styles.bold}> Tem filhos:</Text> {resume.hasChildren ? "Sim" : "Não"}
                        {resume.hasChildren && <Text><Text style={styles.bold}> Idade dos filhos:</Text> {resume.childrenAges}</Text>}
                        <Text style={styles.bold}> Data Nasc:</Text> {resume.birthDate}</Text>
                </View>
                <View style={styles.row}>
                    <Text><Text style={styles.bold}>Rua:</Text> {resume.address}
                        <Text style={styles.bold}>  Bairro:</Text> {resume.neighborhood}</Text>
                    <Text><Text style={styles.bold}>  Cidade:</Text> {resume.city}</Text>
                </View>
                <View style={styles.row}>
                    <Text><Text style={styles.bold}>Celular:</Text> {resume.phone}
                        <Text style={styles.bold}>  E-mail:</Text> {resume.email}</Text>
                    {/* <Text><Text style={styles.bold}>  CPF:</Text> {resume}</Text> */}
                </View>
            </View>

            {/* Contexto Familiar */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contexto Familiar</Text>
                <Text>{report.personalFamilyContext}</Text>
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
