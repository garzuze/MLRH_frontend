import { ReportType } from '../../types/ReportType';

export function geReportsAmount(reports: ReportType[]) {
  const invoiced = reports.reduce((acc, report) => acc + (Number(report.agreedSalary) * report.profileFee) / 100, 0);
  return invoiced.toFixed(2);
}
