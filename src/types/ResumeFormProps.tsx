import { BasicInfoType } from "../types/BasicInfoType";
import { ResumeType } from "../types/ResumeType";
import { mlrhUser } from "./TokenResponse";

export interface ResumeFormProps {
    resume?: ResumeType;
    user?: mlrhUser;
}
