export interface ReportType {
    id: number;
    profile: number; //perfil
    resume: number; //currículo
    strRepresentation: string; //strRepresentação
    testResult: string; //testeResultado
    personalFamilyContext: string; //pessoalFamíliaContexto
    educationalBackground: string; //educacionalHistórico
    candidateProfile: string | null; //candidatoPerfil
    careerObjectives: string; //carreiraObjetivos
    finalConsiderations: string; //finalConsiderações
    agreedSalary: number | null; //acordadoSalário
    candidateStartDate: string | null; //candidatoDataInício,
    createdAt: string;
    updatedAt: string;
    profileFee: number;
}