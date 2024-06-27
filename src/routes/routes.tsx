import { createBrowserRouter, Navigate } from "react-router-dom";
import App from '../App.tsx';
import Product from "../components/product";
import Error404 from "../components/error404.tsx";
import ProductDetails from "../components/productDetails.tsx";
import Products from "../components/products.tsx";
import Login from "../components/Login/login.tsx";

// Função de exemplo para verificar se o usuário está autenticado
const isAuthenticated = () => {
    // Implemente sua lógica de verificação de autenticação aqui
    // Exemplo simples: verificar se há um token no localStorage
    const token = localStorage.getItem('token');
    console.log(token)
    return !!token; // Retorna true se estiver autenticado, false caso contrário
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: isAuthenticated() ? <App /> : <Navigate to="/login" />,
        errorElement: <Error404 />,
        children: [
            {
                path: "Product",
                element: <Product />
            },
            {
                path: "Products",
                element: <Products />
            },
            {
                path: "/productDetails/:id",
                element: <ProductDetails />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*", // Qualquer rota não correspondente redireciona para a raiz "/"
        element: <Navigate to={"/"} />
    }
]);
