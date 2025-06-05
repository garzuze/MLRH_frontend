import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ClientType } from '../../types/ClientType';
import { ClientContactType } from '../../types/ClientContactType';
import { ReportType } from '../../types/ReportType';
import { ReceivableTitleType } from '../../types/ReceivableTitleType';
import { formatDate } from '../../utils/formatDate';
import { geReportsAmount } from '../../utils/geReportsAmount';

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
  title: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: "Times-Bold"
  },
  subtitle: {
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
    textAlign: "center",
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
  tableHeader: {
    backgroundColor: "#D3D3D3",
    flexDirection: 'row',
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',
    padding: 5,
  },
  column: {
    width: '11%',
    fontSize: 8,
    textAlign: 'right'
  },
  wideColumn: {
    width: '35%',
    fontSize: 8,
  },
  total: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    fontSize: 8,
    color: '#666',
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
  },
  stamp: {
    marginTop: "30",
    border: "1px solid #D3D3D3",
    padding: "20px",
    width: "50%",
    textAlign: "center",
  }
});

interface ReceivableTitleProps {
  client: ClientType;
  clientContact: ClientContactType;
  reports: ReportType[];
  title: ReceivableTitleType;
}

const ReceivableTitlePDF = ({ client, clientContact, reports, title }: ReceivableTitleProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>DEMONSTRATIVO DE FATURAMENTO</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Dados da empresa</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text>
              <Text style={styles.bold}>
                Empresa:{' '}
              </Text>
              {client.corporateName}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>
              <Text style={styles.bold}>
                Endereço:{' '}
              </Text>
              {client.address}, {client.neighborhood} - {client.city}, {client.state}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>
              <Text style={styles.bold}>
                CNPJ:{' '}
              </Text>
              {client.cnpj}
              <Text style={styles.bold}>
                {' '}IE:{' '}
              </Text>
              {client.stateRegistration}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>
              <Text style={styles.bold}>
                Cidade - UF:{' '}
              </Text>
              {client.city} - {client.state}
              <Text style={styles.bold}>
                {' '}Fone:{' '}
              </Text>
              {clientContact.phone}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>
              <Text style={styles.bold}>
                Contato:{' '}
              </Text>
              {clientContact.name}
              <Text style={styles.bold}>
                {' '}Setor:{' '}
              </Text>
              {clientContact.department}
              <Text style={styles.bold}>
                {' '}Email:{' '}
              </Text>
              {clientContact.email}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>
              <Text style={styles.bold}>
                Data de comando:{' '}
              </Text>
              {title.paymentDate ? formatDate(title.paymentDate) : " - "}
              <Text style={styles.bold}>
                {' '}Data de vencimento:{' '}
              </Text>
              {title.dueDate ? formatDate(title.dueDate) : " - "}
            </Text>
          </View>
        </View>
      </View>
      <View />
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { fontSize: "10", textTransform: "none" }]}>Segue demonstrativo dos serviços prestados por Marlon Edner Cordeiro referente nota fiscal nº:{' '}{title.document}</Text>
        <View style={styles.section}>
          <View style={styles.tableHeader}>
            <Text style={styles.wideColumn}>Cargo</Text>
            <Text style={styles.wideColumn}>Nome</Text>
            <Text style={styles.column}>Admissão</Text>
            <Text style={styles.column}>Salário</Text>
            <Text style={styles.column}>Taxa</Text>
            <Text style={styles.column}>Honorário</Text>
          </View>
        </View>
        {reports.length > 0 ? reports.map((report, key) => (
          <View style={styles.tableRow} key={key}>
            <Text style={styles.wideColumn}>{report.strRepresentation.split("-")[0]}</Text>
            <Text style={styles.wideColumn}>{report.strRepresentation.split("-")[2]}</Text>
            <Text style={styles.column}>{report.candidateStartDate ? formatDate(report.candidateStartDate) : " - "}</Text>
            <Text style={styles.column}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(report.agreedSalary))}</Text>
            <Text style={styles.column}>{report.profileFee}%</Text>
            <Text style={styles.column}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((Number(report.agreedSalary) * report.profileFee) / 100)}</Text>
          </View>
        )) : null}
        <View style={styles.tableRow}>
          <Text style={styles.wideColumn}>{' '}</Text>
          <Text style={styles.wideColumn}>{' '}</Text>
          <Text style={styles.column}>{' '}</Text>
          <Text style={styles.column}>{' '}</Text>
          <Text style={styles.column}><Text style={styles.bold}>Total: </Text></Text>
          <Text style={styles.column}><Text style={styles.bold}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(geReportsAmount(reports))}</Text></Text>
        </View>
      </View>

      {/* Carimbo */}
      <View style={styles.stamp}>
        <Text style={styles.title}>44.951.276/0001-20</Text>
        <Text style={{
          textTransform: 'uppercase',
          fontFamily: "Times-Bold",
          fontSize: 10,
          marginBottom: 6,
        }}>Marlon Edner Cordeiro</Text>
        <View style={styles.section}>
          <Text style={styles.row}>Rua Goiânia, 1597 - Cajuru</Text>
          <Text style={styles.row}>Cep 82940-150</Text>
          <Text style={styles.row}>Curitiba, Paraná</Text>
        </View>
      </View>
    </Page>
  </Document >
);

export default ReceivableTitlePDF;