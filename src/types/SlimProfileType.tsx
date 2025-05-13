import { statusAbbreviation } from "../utils/constants";
import { SlimReportType } from "./SlimReportType";

export interface SlimProfileType {
    client: number;
    position: number;
    clientName: string;
    clientContact: string;
    positionName: string;
    reportsList: string;
    status: statusAbbreviation;
    reports: SlimReportType[];
}