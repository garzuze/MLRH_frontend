import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
const token = localStorage.getItem("access_token");

export const educationLevels = {
    EF: "Ensino Fundamental",
    EM: "Ensino Médio",
    ET: "Ensino Médio Técnico",
    TE: "Tecnólogo",
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

export const status = {
    A: "Ativo",
    I: "Inativo",
} as const;

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const axiosConfig: AxiosRequestConfig = {
    headers: {
        'Authorization': `Bearer ${token}`,
    } as RawAxiosRequestHeaders,
};