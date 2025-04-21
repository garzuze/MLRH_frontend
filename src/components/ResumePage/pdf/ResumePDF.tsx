import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Link,
} from '@react-pdf/renderer';
import { ResumeType } from '../../../types/ResumeType';
import { mlrhUser } from '../../../types/TokenResponse';
import { WorkExperienceType } from '../../../types/WorkExperienceType';
import { formatDate } from '../../../utils/formatDate';
import { languageLevels, maritalStatus, states } from '../../../utils/constants';
import getDate from '../../../utils/getDate';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        fontSize: 10,
        padding: 40,
        fontFamily: 'Times-Roman',
    },
    headerContainer: {
        marginBottom: 20,
        textAlign: 'center',
    },
    name: {
        fontSize: 18,
        textTransform: 'uppercase',
        fontFamily: "Times-Bold"
    },
    subtitle: {
        fontSize: 12,
        marginTop: 4,
    },
    contactInfo: {
        marginTop: 4,
        fontSize: 10,
        color: '#555',
    },
    section: {
        marginBottom: 6,
    },
    sectionHeader: {
        fontSize: 12,
        fontFamily: "Times-Bold",
        marginBottom: 6,
        textTransform: 'uppercase',
        borderBottom: '1 solid #000',
        paddingBottom: 2,
    },
    jobTitle: {
        fontSize: 10,
        fontFamily: "Times-Bold",
    },
    companyAndDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 10,
        marginTop: 2,
        marginBottom: 2,
    },
    bold: {
        fontFamily: "Times-Bold",
    },
    row: {
        flexDirection: "row",
        marginBottom: 6,
    },
    footer: {
        position: 'absolute',
        fontSize: 10,
        color: "#555",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 18,
        paddingVertical: 4,
        borderTop: "0.5 solid #CCCCCC"
    },
});

interface ResumePDFProps {
    resume: ResumeType;
    user: mlrhUser;
    experiences: WorkExperienceType[];
}

const ResumeTemplate = ({ resume, user, experiences }: ResumePDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.headerContainer}>
                <Text style={styles.name}>{resume.name}</Text>
                <Text style={styles.contactInfo}>{resume.positionsStr}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>INFORMAÇÕES PESSOAIS</Text>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text>
                            <Text style={styles.bold}>Data Nasc:</Text> {formatDate(resume.birthDate)}</Text>
                        <Text><Text style={styles.bold}>  Idade:</Text> {resume.age} anos</Text>
                        <Text><Text style={styles.bold}>  Natural de:</Text> {resume.birthPlace}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>
                            <Text style={styles.bold}>Estado Civil:</Text> {maritalStatus[resume.maritalStatus]}
                            <Text style={styles.bold}> Tem filhos:</Text> {resume.hasChildren ? "Sim" : "Não"}
                            {resume.childrenAges ? <Text><Text style={styles.bold}> Idade dos filhos:</Text> {resume.childrenAges}</Text> : null}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text>
                            <Text style={styles.bold}>Endereço:</Text> {resume.address}
                            <Text style={styles.bold}>  Bairro:</Text> {resume.neighborhood}
                        </Text>
                        <Text>
                            <Text style={styles.bold}>  Cidade:</Text> {resume.city}/{states[resume.state]}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text>
                            <Text style={styles.bold}>Celular:</Text> {resume.phone}
                            <Text style={styles.bold}>  E-mail:</Text> {user.email}
                            {resume.linkedin ? <Text> -
                                <Link src={resume.linkedin} style={styles.bold}>  LinkedIn  </Link>
                            </Text> : null}
                            <Text style={styles.bold}> CNH:</Text> {resume.cnh ? resume.cnh : "Não tem"}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>formação escolar</Text>
                <View style={styles.section}>
                    {resume.educationDetails.split(/\r?\n/).map((detail, key) => (
                        <Text style={styles.row} key={key}>{detail}</Text>
                    ))}
                    {resume.additionalCourses ? (
                        <View>
                            <Text style={{ marginBottom: 6, fontFamily: "Times-Bold", fontSize: 12 }}>Outros cursos</Text>
                            {resume.additionalCourses.split(/\r?\n/).map((course, key) => (
                                <Text style={styles.row} key={key}>{course}</Text>
                            ))}
                        </View>
                    ) : null}
                    {(resume.englishLevel != "N" || resume.spanishLevel != "N" || resume.otherLanguages) ? (
                        <View>
                            <Text style={{ marginBottom: 6, fontFamily: "Times-Bold", fontSize: 12 }}>Idiomas</Text>
                            <Text>{resume.englishLevel != "N" ? `Inglês: ${languageLevels[resume.englishLevel]} |` : null} {resume.spanishLevel != "N" ? `Espanhol: ${languageLevels[resume.spanishLevel]} |` : null}{resume.otherLanguages ? `Outras linguas: ${resume.otherLanguages}` : null}
                            </Text>
                        </View>
                    ) : null}
                </View>
            </View>

            {resume.computerSkills ? (
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>INFORMÁTICA</Text>
                    {resume.computerSkills.split(/\r?\n/).map((skill, key) => (
                        <Text style={styles.row} key={key}>{skill}</Text>
                    ))}
                </View>
            ): null}
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>EXPERIÊNCIAS PROFISSIONAIS</Text>
                <View>
                    {experiences.map((experience, key) => (
                        <View key={key} style={{ marginBottom: 5 }}>
                            <View>
                                <View style={styles.row}>
                                    <Text>{formatDate(experience.startDate)}  a  {experience.endDate ? formatDate(experience.endDate) : "atual"}  -  </Text>
                                    <Text style={styles.bold}>{experience.companyName}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.bold}>Cargo:</Text><Text> {experience.positionTitle}</Text>
                                </View>
                            </View>
                            <View>
                                <View style={styles.row}>
                                    {experience.salary || Number(experience.salary) > 0 ? <Text><Text style={styles.bold}>Salário: </Text> R$ {experience.salary}</Text> : null}
                                </View>
                                <View>
                                    <View>
                                        <Text style={{ marginBottom: 6, fontFamily: "Times-Bold" }}>Atividades Realizadas: </Text>
                                        {experience.responsibilities.split(/\r?\n/).map((responsability, key) => (
                                            <Text style={styles.row} key={key}>- {responsability}</Text>
                                        ))}
                                    </View>
                                </View>
                                {experience.reasonForLeaving ? (
                                    <View>
                                        <View style={styles.row}>
                                            <Text>
                                                <Text style={styles.bold}>Motivo da Saída: </Text>{experience.reasonForLeaving}
                                            </Text>
                                        </View>
                                    </View>
                                ) : null}

                            </View>
                        </View>


                    ))}
                </View>
            </View>
            {resume.expectedSalary ? (
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>PRETENSÃO SALARIAL</Text>
                    <Text style={styles}> R$ {resume.expectedSalary}</Text>
                </View>
            ) : null}
            <Text style={styles.footer}>Elaborado por MLRH em {getDate()}.</Text>
        </Page>
    </Document >
);

export default ResumeTemplate;
