import { useAuth } from "../contexts/AuthContext";
import { positionType } from "../types/positionType";
import { useAxiosClient } from "./useAxiosClient";
import { useQuery } from "@tanstack/react-query";

export const usePositions = (id?: number) => {
    const { token } = useAuth();
    const axiosClient = useAxiosClient();
    
    const { data: positions = [], isLoading: loadingPositions, error: positionsError } = useQuery<positionType[]>({
        queryKey: ['positions', token],
        queryFn: async () => {
            const url = id ? `/hr/positions/${id}` : "/hr/positions/";
            const response = await axiosClient.get(url);
            return response.data;
        },
        staleTime: 30000,
    })
    return { positions, loadingPositions, positionsError };
}