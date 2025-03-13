import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { mlrhUser, tokenResponse } from "../types/TokenResponse";
import axios, { AxiosResponse } from "axios";

interface AuthContextType {
    user: mlrhUser | null;
    token: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<mlrhUser | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("access_token"));
    const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refresh_token"));
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const axiosClient = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser) as mlrhUser);
        }
    }, []);

    const refreshAccessToken = async () => {
        if (!refreshToken) {
            logout();
            return false;
        }

        try {
            const response: AxiosResponse = await axiosClient.post("/api/token/refresh/", {
                refresh: refreshToken,
            });

            if (response.status === 200) {
                const newAccessToken: string = response.data.access;
                setToken(newAccessToken);
                localStorage.setItem("access_token", newAccessToken);
                return true;
            }
        } catch (error) {
            console.error("Failed to refresh token", error);
            logout();
        }

        return false;
    };

    useEffect(() => {
        if (!refreshToken) return;

        const interval = setInterval(async () => {
            const refreshed = await refreshAccessToken();
            if (!refreshed) {
                clearInterval(interval);
            }
        }, 59 * 60 * 1000);

        return () => clearInterval(interval);
    }, [refreshToken]);

    const login = async (email: string, password: string) => {
        try {
            const response: AxiosResponse = await axiosClient.post("/api/token/", {
                email: email,
                password: password,
            });

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

    const register = async (email: string, password: string) => {
        try {
            const response: AxiosResponse = await axiosClient.post("/api/register/", {
                email: email,
                password: password,
            });

            if (response.status === 201) {
                return true;
            }

            return false;
        } catch (error) {
            console.error("Erro ao se cadastrar ;(", error);
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
    };

    const isTokenValid = async () => {
        if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }

        try {
            const response: AxiosResponse = await axiosClient.post("/api/token/verify/", { token });

            if (response.status === 200) {
                setIsAuthenticated(true);
            } else {
                const refreshed = await refreshAccessToken();
                setIsAuthenticated(refreshed);
            }
        } catch (error) {
            console.error("Deu ruim", error);
            const refreshed = await refreshAccessToken();
            setIsAuthenticated(refreshed);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (!isAuthenticated) {
            isTokenValid();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado em um AuthProvider");
    }
    return context;
}