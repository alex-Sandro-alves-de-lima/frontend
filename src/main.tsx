import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConfigProvider } from 'antd'; // Remova Menu e Sider se não forem usados
import router from './routes/routes';


const clientId = "117403387590-rr88piui2d41mnagjonfn4a1lip0ptt4.apps.googleusercontent.com";

ReactDOM.render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'red', // Cor primária do tema
            borderRadius: 7,
            //colorBgContainer: "black", // Cor de fundo padrão
            //colorText:"red"
          },
          components: {
            Descriptions: {
              colorSplit: "#C4D3E7",
              colorFillAlter: '#C4D3E7',
              colorText: '#040A13'
            },
            Card: {
              colorFillAlter: "rgb(244, 244, 244)",
              colorBgContainer: "#FFF"
            },
            Layout: {
              colorBgContainer: 'red', // Cor de fundo do Sider
              colorText: '#FFFFFF', // Cor do texto dentro do Sider
            }
            
          }
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
