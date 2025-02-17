interface mlrhUser {
    id: number,
    email: string,
    is_staff: boolean,
    is_superuser: boolean
}

export interface tokenResponse {
    "refresh": string,
    "access": string,
    "user": mlrhUser
}