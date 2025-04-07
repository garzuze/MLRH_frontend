import React from 'react';
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from '@react-pdf/renderer';
import { ResumeType } from '../../../types/ResumeType';
import { mlrhUser } from '../../../types/TokenResponse';
import { WorkExperienceType } from '../../../types/WorkExperienceType';
import { formatDate } from '../../../utils/formatDate';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        fontSize: 10,
        padding: 30,
        fontFamily: 'Times-Roman',
    },
    headerContainer: {
        marginBottom: 20,
        textAlign: 'center',
    },
    name: {
        fontSize: 18,
        textTransform: 'uppercase',
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
        marginBottom: 12,
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
                <Text style={styles.contactInfo}>
                    {resume.city}, {resume.state} | {resume.phone} | {user.email} | {resume.linkedin}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Experiência</Text>
                <View style={{ marginBottom: 10 }}>
                    {experiences.map((experience, key) => (
                        <View key={key}>
                            <View>
                                <Text style={styles.jobTitle}>{experience.positionTitle}</Text>
                                <View style={styles.companyAndDate}>
                                    <Text>{experience.companyName}</Text>
                                    <Text>{formatDate(experience.startDate)} – {experience.endDate ? formatDate(experience.endDate) : "atual"}</Text>
                                </View>
                            </View>
                            <View>
                                <Text>
                                    <Text style={styles.bold}>Último Salário: </Text>{experience.salary}
                                </Text>
                            </View>
                            <View>
                                <Text>
                                    <Text style={styles.bold}>Atividades Realizadas: </Text>{experience.responsibilities}
                                </Text>
                            </View>
                            <View>
                                <Text>
                                    <Text style={styles.bold}>Motivo da Saída: </Text>{experience.reasonForLeaving}
                                </Text>
                            </View>
                            <View>
                                <Text>
                                    <Text></Text>
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Educação</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Informática</Text>
            </View>
        </Page>
    </Document>
);

export default ResumeTemplate;
