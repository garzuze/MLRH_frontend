import { profileStatusAbbreviation, statusAbbreviation } from "../utils/constants";
import { SlimReportType } from "./SlimReportType";

export interface SlimProfileType {
    id: number,
    client: number;
    position: number;
    clientName: string;
    clientContact: string;
    positionName: string;
    reportsList: string;
    status: profileStatusAbbreviation;
    reports: SlimReportType[];
}