import { GenderAbbreviation, maritalStatusAbbreviation, StateAbbreviation, EducationLevelAbbreviation, languageLevelAbbreviation, statusAbbreviation } from "../utils/constants";

export interface ResumeType {
    id: number;
    name: string; //nome
    user: number; //usuário
    cpf: string; //cpf
    gender: GenderAbbreviation; //sexo
    cnh: string;
    birthDate: string; //datanascimento
    age: string; // idade
    birthPlace: string; //localnascimento
    maritalStatus: maritalStatusAbbreviation; //estado civil
    availability: string; //disponibilidade
    spouseName?: string; //nomedocônjuge
    spouseProfession?: string; //profissãodocônjuge
    hasChildren?: boolean; //temfilhos
    childrenAges?: string; //idadesdosfilhos
    isSmoker?: boolean; //éfumante
    hasCar?: boolean; //temcarro
    hasDisability?: boolean; //temdeficiência
    disabilityCid?: string; //deficiênciaCid
    address: string; //endereço
    neighborhood: string; //bairro
    city: string; //cidade
    state: StateAbbreviation; //estado
    cep: string; //cep
    phone: string; //telefone
    contactPhone?: string; //contatoTelefone
    email: string; //e-mail
    linkedin?: string; //linkedin
    educationLevel: EducationLevelAbbreviation; //educaçãoNível
    educationDetails: string; //educaçãoDetalhes
    englishLevel: languageLevelAbbreviation; //nívelinglês
    spanishLevel: languageLevelAbbreviation; //nívelespanhol
    otherLanguages?: string; //outrosidiomas
    computerSkills?: string; //competênciasemcomputador
    additionalCourses?: string; //cursosadicionais
    desiredPositions: number[]; //cargosdesejados
    positionsStr: string;
    expectedSalary?: number; //salárioesperado
    availableFullTime?: boolean; //disponívelIntegral
    availableMorningAfternoon?: boolean; //disponívelManhãTarde
    availableAfternoonNight?: boolean; //disponívelTardeNoite
    availableNightShift?: boolean; //disponívelTurnoNoturno
    available1236?: boolean; //disponível1236
    availableAsSubstitute?: boolean; //disponívelComoSubstituto
    status: statusAbbreviation; //status
}