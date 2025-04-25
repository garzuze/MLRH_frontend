import { ResumeType } from "./ResumeType";

export type SlimResumeType = Pick<ResumeType, 'name' | 'phone' | 'expectedSalary' | 'neighborhood' | 'city' | 'age' | 'positionsStr' | 'updatedAt'>;
