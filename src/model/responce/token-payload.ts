
export interface TokenPayload {
    id: number;
    email: string;
    password: string;
    username: string;
    date: Date;
}

export interface AuthenticateModel {
    email: string;
    password: string;
}
