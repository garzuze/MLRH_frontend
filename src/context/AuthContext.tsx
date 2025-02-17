import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { mlrhUser, tokenResponse } from "../types/TokenResponse";
import axios, { AxiosResponse } from "axios";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

interface AuthContextType{
    user: mlrhUser | null;
    token: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<mlrhUser | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("access_token"));
    const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refresh_token"));

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser) as mlrhUser);
        }

    }, [])

    const refreshAccessToken = async () => {
        if (!refreshToken) return;

        try {
            const response: AxiosResponse = await client.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            
            const newAccessToken: string = response.data.access;
            setToken(newAccessToken);
            localStorage.setItem("access_token", newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error("Failed to refresh token", error);
            logout();
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            refreshAccessToken();
        }, 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, [refreshToken]);

    const login = async (email: string, password: string) => {
            try {
                const response: AxiosResponse = await client.post("/api/token/", {
                    "username": email,
                    "password": password,
                })
                const tokenResponse: tokenResponse = response.data;
                const { access, refresh, user } = tokenResponse;

                setToken(access);
                setRefreshToken(refresh);
                setUser(user);

                localStorage.setItem("access_token", access);
                localStorage.setItem("refresh_token", refresh);
                localStorage.setItem("user", JSON.stringify(user));

                return true;
            } catch (error) {
                console.error("Erro ao fazer login ;(", error);
                return false;
            }
            
    };
    
    const logout = () => {
        setToken(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.location.href = "/MLRH_frontend/login";
    };

    return <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado em um AuthProvider");
    }
    return context;
}