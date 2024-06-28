import React from 'react';
import { Button, Input, Form, Card } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './login.css';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate para navegação
import { useAuthStore } from '../../store/authStore';

const Login: React.FC = () => {
    const navigate = useNavigate(); // Use o hook useNavigate para navegação
    const { login } = useAuthStore();

    const onFinish = async (values: any) => {
        const { username, password } = values;
        try {
            await login(username, password); // Chame a função de login do store ao submeter o formulário
            console.log('Login bem-sucedido!');
            // Após o login bem-sucedido, você pode redirecionar o usuário para a página inicial ou outra rota desejada
            navigate("/product"); // Redireciona para a rota inicial ('/')
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            // Trate o erro de login aqui, como exibir uma mensagem de erro para o usuário
        }
    };

    return (
        <div className="login-container">
            <div className="login-overlay" />
            <div className="login-content">
                <Card className="login-card">
                    <img
                        src="https://w7.pngwing.com/pngs/829/736/png-transparent-gold-rim-illustration-leading-edge-academy-gilbert-elementary-frame-round-frame-deco-rectangle-poster-logo.png"
                        alt="Logo"
                        className="login-logo"
                    />
                    <Form name="login_form" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                        <Form.Item name="username" rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuário" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}>
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Senha" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default Login;
