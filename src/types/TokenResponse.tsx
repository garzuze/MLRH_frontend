interface mlrhUser {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    is_staff: boolean,
    is_superuser: boolean
}

export interface tokenResponse {
    "refresh": string,
    "access": string,
    "user": mlrhUser
}