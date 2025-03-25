import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Link
} from "@react-pdf/renderer";
import { ProfileType } from "../../../types/ProfileType";
import { ReportType } from "../../../types/ReportType";
import { ResumeType } from "../../../types/ResumeType";
import { WorkExperienceType } from "../../../types/WorkExperienceType";
import { maritalStatus, states } from "../../../utils/constants";
import getDate from "../../../utils/getDate";
import { mlrhUser } from "../../../types/TokenResponse";
import logo from "../../../assets/logo_mlrh.png"

const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        fontSize: 11,
        fontFamily: "Helvetica",
        lineHeight: 1.4,
    },
    header: {
        fontSize: 16,
        fontFamily: "Helvetica-Bold",
        marginBottom: 8,
        borderBottom: "1 solid #CCCCCC",
        paddingBottom: 4,
        textTransform: "uppercase",
        position: 'absolute',
        top: 0,
        paddingVertical: 22,
        paddingHorizontal: 162,
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
    },
    logo: {
        width: 30,
    },
    footer: {
        position: 'absolute',
        fontSize: 8,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 18,
        paddingVertical: 4,
        borderTop: "0.5 solid #CCCCCC"
    },
    author: {
        fontSize: 8,
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 18,
    }
});

interface ReportPDFProps {
    report: ReportType;
    profile: ProfileType;
    resume: ResumeType;
    experieces: WorkExperienceType[];
    user: mlrhUser;
}

const currentDate = getDate();
const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
};

const ReportPDF = ({ report, profile, resume, experieces, user }: ReportPDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Image src={logo} style={styles.logo}></Image>
            <Text style={styles.header}>Parecer da Entrevista</Text>
            <View style={styles.row}>
                <Text style={[styles.bold, { textAlign: "right", width: "100%" }]}>Data: {currentDate}</Text>
            </View>
            {/* Empresa e Vaga */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações da Vaga e Cliente</Text>
                <View style={styles.row}>
                    <Text>{profile.strRepresentation} - {profile.clientName}</Text>
                </View>
            </View>

            {/* Disponibilidade de Horários */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Disponibilidade de Horários do Candidato
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
                        {resume.linkedin && <Text> -
                            <Link src={resume.linkedin} style={styles.bold}>LinkedIn</Link>
                        </Text>}
                        <Text style={styles.bold}> Idade:</Text> {resume.age} anos
                        <Text style={styles.bold}> Natural de:</Text> {resume.birthPlace}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text><Text style={styles.bold}>Estado Civil:</Text> {maritalStatus[resume.maritalStatus]}
                        <Text style={styles.bold}> Tem filhos:</Text> {resume.hasChildren ? "Sim" : "Não"}
                        {resume.hasChildren && <Text><Text style={styles.bold}> Idade dos filhos:</Text> {resume.childrenAges}</Text>}
                        <Text style={styles.bold}> Data Nasc:</Text> {formatDate(resume.birthDate)}</Text>
                </View>
                <View style={styles.row}>
                    <Text><Text style={styles.bold}>Rua:</Text> {resume.address}
                        <Text style={styles.bold}>  Bairro:</Text> {resume.neighborhood}</Text>
                    <Text><Text style={styles.bold}>  Cidade:</Text> {resume.city}/{states[resume.state]}</Text>
                </View>
                <View style={styles.row}>
                    <Text>
                        <Text style={styles.bold}>Celular:</Text> {resume.phone}
                        <Text style={styles.bold}>  E-mail:</Text> {resume.email}
                        <Text style={styles.bold}> CNH:</Text> {resume.cnh ? resume.cnh : "Não tem"}
                        <Text style={styles.bold}>  CPF:</Text> {resume.cpf}
                    </Text>
                </View>
            </View>

            {/* Contexto Familiar */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contexto Familiar</Text>
                <Text>{report.personalFamilyContext}</Text>
            </View>

            {/* Histórico educacional */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Histórico Educacional</Text>
                <View style={styles.row}>
                    <Text>{report.educationalBackground}</Text>
                </View>
            </View>
            <Text style={styles.footer}>As informações constantes neste documento são confidenciais, sendo proibida a divulgação das mesmas, sob pena da Lei.</Text>
        </Page>
        <Page size="A4" style={styles.page}>
            <Image src="https://github.com/garzuze/MLRH_frontend/blob/main/src/assets/logo_mlrh.png?raw=true" style={styles.logo}></Image>
            <Text style={styles.header}>Parecer da Entrevista</Text>
            {/* Resumo profissional */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Resumo Profissional</Text>
                {experieces.map((experience, key) => (
                    <View key={key}>
                        <View style={styles.row}>
                            <Text><Text style={styles.bold}>Empresa: </Text>{experience.companyName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text><Text style={styles.bold}>Data de Admissão: </Text>{formatDate(experience.startDate)}</Text>
                            {experience.endDate ? (
                                <Text>
                                    <Text style={styles.bold}> Data de Demissão: </Text>{formatDate(experience.endDate)}
                                </Text>
                            ) : (<Text> - Atual</Text>)}
                        </View>
                        <View style={styles.row}>
                            <Text>
                                <Text style={styles.bold}>Cargo: </Text>{experience.positionTitle}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text>
                                <Text style={styles.bold}>Último Salário: </Text>{experience.salary}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text>
                                <Text style={styles.bold}>Atividades Realizadas: </Text>{experience.responsibilities}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text>
                                <Text style={styles.bold}>Motivo da Saída: </Text>{experience.reasonForLeaving}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text>
                                <Text></Text>
                            </Text>
                        </View>
                    </View>
                ))}

            </View>
            {/* Pretensão Salarial */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Pretensão salarial
                </Text>
                <View style={styles.row}>
                    <Text>{report.careerObjectives}</Text>
                </View>
            </View>
            {/*Perfil do Candidato (a) */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Perfil do Candidato (a)
                </Text>
                <View style={styles.row}>
                    <Text>{report.candidateProfile}</Text>
                </View>
            </View>
            {/*Resultado do teste*/}
            {report.testResult &&
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Resultado do teste
                    </Text>
                    <View style={styles.row}>
                        <Text>{report.testResult}</Text>
                    </View>
                </View>
            }
            <Text style={styles.author}>Elaborado por: <Text style={styles.bold}>{user.firstName} {user.lastName}</Text></Text>
            <Text style={styles.footer}>As informações constantes neste documento são confidenciais, sendo proibida a divulgação das mesmas, sob pena da Lei.</Text>
        </Page>
    </Document >
);

export default ReportPDF;
