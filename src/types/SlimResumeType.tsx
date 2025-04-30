import { ResumeType } from "./ResumeType";
import { WorkExperienceType } from "./WorkExperienceType";

export interface SlimResumeType extends Pick<
    ResumeType,
    | 'id'
    | 'name'
    | 'phone'
    | 'expectedSalary'
    | 'neighborhood'
    | 'city'
    | 'age'
    | 'positionsStr'
    | 'updatedAt'
    | 'desiredPositions'
> {
    workExperiences: WorkExperienceType[];
}
