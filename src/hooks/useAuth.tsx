import axios, { AxiosResponse } from 'axios';
import { tokenResponse } from '../types/TokenResponse';

const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
})

export const login = async (email: string, password: string) => {
    try {
        const response: AxiosResponse = await client.post("/api/token/", {
            "username": email,
            "password": password,
        })
        const tokenResponse: tokenResponse = response.data;
        localStorage.setItem("access_token", tokenResponse.access);
        localStorage.setItem("refresh_token", tokenResponse.refresh);
        return true;
    } catch (error) {
        console.error("Erro ao fazer login ;(", error);
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/";
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("access_token");
};