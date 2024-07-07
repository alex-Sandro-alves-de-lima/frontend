import create from 'zustand';
import {jwtDecode} from 'jwt-decode';
import { GooglePayloadLogin } from '../types/index';
import autenticaStore from './autentica.store';

type AuthStore = {
    token: string | null;
    user: GooglePayloadLogin | null;
    login: (username: string, password: string) => Promise<void>;
    loginG: (idToken: string) => Promise<void>;
    logout: () => void;
};

function isValidToken(token: string): boolean {
    const parts = token.split('.');
    return parts.length === 3;
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('token') && isValidToken(localStorage.getItem('token')!)
        ? jwtDecode<GooglePayloadLogin>(localStorage.getItem('token')!)
        : null,
    login: async (username: string, password: string) => {
        try {

            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulação de uma requisição assíncrona
            const token = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjJhZjkwZTg3YmUxNDBjMjAwMzg4OThhNmVmYTExMjgzZGFiNjAzMWQiLCJ0eXAiOiJKV1QifQ`; // Substitua pelo token real obtido da API
            if (!isValidToken(token)) {
                throw new Error('Token inválido');
            }
            localStorage.setItem('token', token);
            const decodedUser = jwtDecode<GooglePayloadLogin>(token); // Decodifica o token
            set({ token, user: decodedUser });
        } catch (error) {
            console.error('Erro ao fazer login:' +username, error);
            throw new Error('Erro ao fazer login'+password);
        }
    },
    loginG: async (idToken: string) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulação de uma requisição assíncrona

            const token: string = `${idToken}`;
            if (!isValidToken(token)) {
                throw new Error('Token inválido');
            }

          //  localStorage.setItem('token', token);
            const decodedUser = jwtDecode<GooglePayloadLogin>(token); // Decodifica o token
            set({ token, user: decodedUser });
            autenticaStore.logIn({email: decodedUser.email , token: token});

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw new Error('Erro ao fazer login');
        }
    },
    logout: () => {
      //  localStorage.removeItem('token');
        autenticaStore.logOut();
       // set({ token: null, user: null });
    },
}));
