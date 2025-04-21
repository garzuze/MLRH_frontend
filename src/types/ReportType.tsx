export interface ReportType {
    id: number;
    profile: number; //perfil
    resume: number; //currículo
    userData: string[];
    strRepresentation: string; //strRepresentação
    testResult: string; //testeResultado
    personalFamilyContext: string; //pessoalFamíliaContexto
    educationalBackground: string; //educacionalHistórico
    candidateProfile: string; //candidatoPerfil
    careerObjectives: string; //carreiraObjetivos
    finalConsiderations: string; //finalConsiderações
    agreedSalary: number; //acordadoSalário
    candidateStartDate: string; //candidatoDataInício
}