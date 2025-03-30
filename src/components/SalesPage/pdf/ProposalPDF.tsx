import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { ClientType } from "../../../types/ClientType";
import { ClientContactType } from "../../../types/ClientContactType";
import { ClientFeeType } from "../../../types/ClientFeeType";
import { serviceType } from "../../../types/serviceType";
import getDate from "../../../utils/getDate";
import logo from "../../../assets/logo_mlrh.png"


const styles = StyleSheet.create({
    body: {
        paddingTop: 45,
        paddingBottom: 65,
        paddingHorizontal: 45,
        fontFamily: "Helvetica",
    },
    section: { marginBottom: 12 },
    title: {
        fontSize: 14,
        marginVertical: 10,
        fontFamily: "Helvetica-Bold",
        color: "green",
        textTransform: "uppercase",
    },
    paragraph: {
        fontSize: 10,
        marginVertical: 6,
        textIndent: 50,
        textAlign: "justify",
        lineHeight: 1.4,
    },
    text: {
        fontSize: 10,
        marginVertical: 4,
        textAlign: "justify",
        lineHeight: 1.4,
    },
    listItem: {
        marginLeft: 15,
        fontSize: 10,
        marginBottom: 4,
        textAlign: "justify",
    },
    image: {
        marginVertical: 15,
        alignSelf: "center",
        width: 150,
        height: 50,
    },
    logo: {
        width: 30,
    }
});

const currentDate = getDate();

interface ProposalPDFProps {
    clientData: ClientType;
    clientContactData: ClientContactType;
    clientFeeData: ClientFeeType[];
    services: serviceType[];
}

export function ProposalPDF({ clientData, clientContactData, clientFeeData, services }: ProposalPDFProps) {
    return (
        <Document author="MLRH Gestão de pessoas">
            <Page size="A4" style={styles.body}>
                <Image src={logo} style={styles.logo}></Image>
                <View style={styles.section}>
                    <Text style={styles.text}>{currentDate}</Text>
                    <Text style={styles.text}>À {clientData.corporateName}</Text>
                    <Text style={styles.text}>A/C: {clientContactData.name}</Text>
                    <Text style={styles.text}>{clientData.city} - {clientData.state}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>Prezados Senhores,</Text>
                    <Text style={styles.text}>Agradecemos a oportunidade de apresentar nossa proposta para os serviços de Recrutamento & Seleção de Pessoal.</Text>
                    <Text style={styles.paragraph}>
                        A <Text style={{ fontFamily: "Helvetica-Bold" }}>ML GESTÃO DE PESSOAS</Text> coloca a sua disposição a excelência na captação de profissionais qualificados para sua empresa, primando pelo compromisso com o cliente, agilidade, qualidade e personalização dos serviços. </Text>
                    <Text style={styles.paragraph}>Nossos clientes contam com a experiência de quem atua nos mais diversos ramos de atividade. Assim entende-se a especificidade de exigências para cada setor e, a partir disso, oferecemos um serviço que atende as suas expectativas.</Text>
                    <Text style={styles.paragraph}>Como diferenciais apontamos: larga experiência, possibilidade do cliente ser informado a qualquer tempo sobre o andamento da(s) vaga(s), todos os processos de seleção conduzidos por profissionais (psicólogos), testes inerentes ao cargo para todos os processos sem custo adicional e respeito aos prazos acordados. A <Text style={{ fontFamily: "Helvetica-Bold" }}>ML GESTÃO DE PESSOAS</Text> entende que cada vaga aberta é um compromisso fechado com o cliente. Só finaliza quando um profissional capacitado assume o cargo.</Text>
                    <Text style={styles.title}>PROCESSO DE TRABALHO</Text>
                    <Text style={styles.listItem}> • Visita ao cliente para entender sua cultura organizacional; </Text>
                    <Text style={styles.listItem}> • Definição dos objetivos do cargo, suas responsabilidades e resultados esperados; e o perfil do profissional que possa atender as necessidades da empresa cliente;</Text>
                    <Text style={styles.listItem}> • Pesquisa em nosso banco de profissionais cadastrados; </Text>
                    <Text style={styles.listItem}> • Divulgação da oportunidade nas mais variadas fontes de recrutamento; </Text>
                    <Text style={styles.listItem}> • Realização de entrevistas, que podem ser de avaliação técnica e comportamental ou por competências;</Text>
                    <Text style={styles.listItem}> • Aplicação de testes psicológicos;</Text>
                    <Text style={styles.listItem}> • Apresentação de até 03(três) candidatos por vaga com parecer das entrevistas e resultado das avaliações;</Text>
                    <Text style={styles.listItem}> • Agendamento das entrevistas junto à empresa cliente.</Text>

                </View>
            </Page>
            <Page size="A4" style={styles.body}>
                <View style={styles.section}>
                    <Text style={styles.title}>ENCAMINHAMENTO DE CANDIDATOS</Text>
                    <Text style={styles.text}>O prazo médio para o encaminhamento de candidatos será de:</Text>
                    <Text style={styles.listItem}> • 5 (Cinco) dias úteis para cargos operacionais; </Text>
                    <Text style={styles.listItem}> • 10 (Dez) dias úteis para cargos administrativos, analistas, especializados, técnicos e de estágios;  </Text>
                    <Text style={styles.listItem}> • 20 (vinte) dias úteis para cargos de liderança, supervisão e gerência. </Text>
                    <Text style={[{ fontFamily: "Helvetica-Bold" }, styles.text]}>Esse prazo, porém, poderá alterar dependendo das características do cargo, da complexidade em atrair a mão de obra necessária e da urgência da {clientData.corporateName}.</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>INVESTIMENTO</Text>
                    <Text style={styles.text}>Nossos serviços são remunerados através de um <Text style={{ fontFamily: "Helvetica-Bold" }}>percentual aplicado sobre a remuneração bruta mensal (Salários, Comissões, Gratificações, etc.) do profissional a ser contratado:</Text></Text>
                    {clientFeeData.map((fee) => (
                        <Text key={fee.id} style={styles.listItem}>
                            • {(fee.percentual && fee.value) ? `${fee.percentual}% - R$ ${fee.value}` : (
                                fee.percentual ? (`${fee.percentual}%`) : (`R${fee.value}`)
                            )} - {services.find(s => s.id === fee.service)?.service}
                        </Text>
                    ))}
                    <Text style={styles.text}><Text style={[{ fontFamily: "Helvetica-Bold" }, styles.text]}>Obs: </Text>O faturamento mínimo de nossos honorários é de R$ 650,00 (seiscentos e cinquenta reais) por vaga. </Text>
                    <Text style={styles.title}>FORMA DE PAGAMENTO</Text>
                    <Text style={styles.paragraph}>O total do investimento será cobrado sempre 05 (cinco) dias corridos após emissão da nota(s) fiscal(ais) e após a conclusão do processo seletivo. Entende-se como conclusão do processo seletivo a escolha pelo cliente de um ou mais candidatos apresentados.</Text>
                    <Text style={styles.paragraph}>Havendo diferença entre a remuneração usada para cálculo e o valor efetivamente acordado entre o profissional e a empresa, será recalculado o valor dos honorários, a diferença a maior ou a menor será ajustada no pagamento da parcela restante.</Text>
                </View>
            </Page>
            <Page size="A4" style={styles.body}>
                <Text style={styles.title}>CANCELAMENTO</Text>
                <Text style={styles.paragraph}>No caso de cancelamento da vaga ao longo do processo seletivo por parte da <Text style={[{ fontFamily: "Helvetica-Bold" }, styles.text]}>{clientData.corporateName}</Text> será cobrado o total de 50% (cinquenta por cento) da taxa acertada, que servirá para o reembolso dos custos operacionais incorridos.  O cancelamento automático da vaga poderá acontecer por parte da <Text style={[{ fontFamily: "Helvetica-Bold" }, styles.text]}>ML GESTÃO DE PESSOAS</Text> no caso da <Text style={[{ fontFamily: "Helvetica-Bold" }, styles.text]}>{clientData.corporateName}</Text>, não se pronunciar em 10 (dez) dias após a apresentação dos candidatos, incidindo desta forma a cobrança do percentual acima informado. O vencimento da fatura ocorrerá após 05 (cinco) dias da formalização do cancelamento.</Text>
                <Text style={styles.title}>REPOSIÇÃO DE CANDIDATOS </Text>
                <Text style={styles.paragraph}>Caso ocorra eventual não adaptação do Profissional contratado, por questões de ordem funcional ou de desempenho que resulte no seu desligamento da empresa em um prazo de até 30 (trinta) dias para os níveis operacional (ais) e administrativo (os) e 45 (quarenta e cinco) para os demais cargos, após a respectiva data de admissão, a primeira substituição será realizada, sem custo adicional.</Text>
                <Text style={styles.text}>Sendo assim, colocamo-nos a sua disposição para maiores esclarecimentos que se fizerem necessários.</Text>
                <Text style={styles.text}>Atenciosamente,</Text>
                <Text style={[{ fontFamily: "Helvetica-Bold" }, styles.text]}>Marlon Cordeiro</Text>
                <Text style={[{ fontFamily: "Helvetica-Bold" }, styles.text]}>ML Gestão de Pessoas</Text>
                <Text style={styles.text}>Cel.:   9 9869-0165</Text>
            </Page>
        </Document>
    );
}