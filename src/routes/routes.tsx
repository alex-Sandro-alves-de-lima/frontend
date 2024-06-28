import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import Product from "../components/product";
import Error404 from "../components/error404.tsx";
import ProductDetails from "../components/productDetails.tsx";
import Products from "../components/products.tsx";
import Login from "../components/Login/login.tsx";
import PrivateRoute from './privateRoutes.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, /// Rota publica
    children: [
      {
        path: "product", /// Rota privada
        element: (
          <PrivateRoute> 
            <Product />
          </PrivateRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "products",
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />, /// Rota publica
  },
]);

export default router;
