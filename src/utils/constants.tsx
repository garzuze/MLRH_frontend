import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
const token = localStorage.getItem("access_token");

export const educationLevels = {
    EF: "Ensino Fundamental",
    EM: "Ensino Médio",
    ET: "Ensino Médio Técnico",
    GR: "Graduação",
    PG: "Pós-graduação",
    ME: "Mestrado",
    DR: "Doutorado",
} as const;

export const genders = {
    M: "Masculino",
    F: "Feminino",
    O: "Outro",
} as const;

export const cnhLevels = {
    A: "A",
    B: "B",
    AB: "AB",
    C: "C",
    D: "D",
} as const;

export const languageLevels = {
    1: "Básico",
    2: "Intermediário",
    3: "Fluente",
} as const;

export const maritalStatus = {
    S: "Solteiro(a)",
    M: "Casado(a)",
    D: "Divorciado(a)",
    V: "Viúvo(a)",
} as const;

export const states = {
    AC: "Acre",
    AL: "Alagoas",
    AM: "Amazonas",
    BA: "Bahia",
    CE: "Ceará",
    DF: "Distrito Federal",
    ES: "Espírito Santo",
    GO: "Goiás",
    MA: "Maranhão",
    MT: "Mato Grosso",
    MS: "Mato Grosso do Sul",
    MG: "Minas Gerais",
    PA: "Pará",
    PB: "Paraíba",
    PR: "Paraná",
    PE: "Pernambuco",
    PI: "Piauí",
    RJ: "Rio de Janeiro",
    RN: "Rio Grande do Norte",
    RS: "Rio Grande do Sul",
    RO: "Rondônia",
    RR: "Roraima",
    SC: "Santa Catarina",
    SP: "São Paulo",
    SE: "Sergipe",
    TO: "Tocantins",
} as const;

// Verificar depois se tem algum objeto que usa o C ou S no momento
export const status = {
    A: "Ativo",
    I: "Inativo",
    C: "Cancelado",
    S: "Suspenso",
} as const;

export const profileStatus = {
    A: "Aberto",
    F: "Fechado",
    C: "Cancelado",
    S: "Seleção",
} as const;

export const contractTypes = {
    CLT: "CLT",
    PJ: "PJ",
    EST: "Estágio",
} as const;

export type StateAbbreviation = keyof typeof states;
export type EducationLevelAbbreviation = keyof typeof educationLevels;
export type GenderAbbreviation = keyof typeof genders;
export type languageLevelAbbreviation = keyof typeof languageLevels;
export type statusAbbreviation = keyof typeof status;
export type profileStatusAbbreviation = keyof typeof profileStatus;
export type contractTypesAbbreviation = keyof typeof contractTypes;
export type maritalStatusAbbreviation = keyof typeof maritalStatus;