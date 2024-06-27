import create from 'zustand';

type AuthStore = {
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    token: localStorage.getItem('token') || null,
    login: async (username: string, password: string) => {
        try {
            // Aqui você pode fazer uma chamada a uma API de autenticação
            // Exemplo fictício de chamada assíncrona simulando uma API
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulação de uma requisição assíncrona

            // Suponha que você obteve um token válido da sua API de autenticação
            const token = `${password} ; ${username}`; // Substitua pelo token real obtido da API

            // Salva o token no localStorage e atualiza o estado do store
            localStorage.setItem('token', token);
            set({ token });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            // Trate os erros de login aqui, como exibir uma mensagem de erro
            throw new Error('Erro ao fazer login');
        }
    },
    logout: () => {
        // Remove o token do localStorage e atualiza o estado do store
        localStorage.removeItem('token');
        set({ token: null });
    },
}));
