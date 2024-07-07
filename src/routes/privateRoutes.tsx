import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import autenticaStore from '../store/autentica.store';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const {estaAutenticado} = autenticaStore;

  //const token = localStorage.getItem('token'); // Substitua isso token da api
  return (
    estaAutenticado ? <>{children}</> : <Navigate to="/login" />
)};

export default PrivateRoute;
