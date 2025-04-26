import { ResumeType } from "./ResumeType";

export type SlimResumeType = Pick<ResumeType, 'id' | 'name' | 'phone' | 'expectedSalary' | 'neighborhood' | 'city' | 'age' | 'positionsStr' | 'updatedAt'>;
