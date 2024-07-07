import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConfigProvider } from 'antd'; // Remova Menu e Sider se não forem usados
import router from './routes/routes';


const clientId = "117403387590-p32jt9n5fuip6t9tvegk5f58jus9ck6d.apps.googleusercontent.com";
//https://ant.design/theme-editor
ReactDOM.render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <ConfigProvider
        theme={{
            "token": {
              "colorPrimary": "#323841",
              "colorInfo": "#323841",
              "colorLink": "#738299",
              "colorTextBase": "#252323",
              "colorLinkHover": "#619ee7",
              "colorLinkActive": "#b5bac2",
              "colorBgBase": "#ffffff",
              "fontSize": 16,
              "sizeStep": 4,
              "borderRadius": 7,
              "colorTextTertiary": "#74717173",
              "colorTextSecondary": "#363333a6"
          }
          
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
