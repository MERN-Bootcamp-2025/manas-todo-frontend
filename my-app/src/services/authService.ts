

import api from '../utils/api';
import type { User } from '../types';


export interface LoginCredentials {
    email: string,
    password: string
}

export interface LoginResponse{
    message: string,
    accessToken : string,
    refreshToken: string,
    user: User
}

export const authService = {
    login: async (credentials: LoginCredentials) : Promise<LoginResponse> => {
        const response = await api.post('/login', credentials);
        return response.data;
    },

    refreshToken: async() => {
        const response = await api.post('/refresh-token');
        return response.data;
    }
}
