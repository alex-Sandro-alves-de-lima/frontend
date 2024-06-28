import React from 'react';
import { Button, Input, Form, Card } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LoginGoogle from '../Login/loginGoogle';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const onFinish = async (values: any) => {
        const { username, password } = values;
        try {
            await login(username, password);
            console.log('Login bem-sucedido!');
            navigate("/product");
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
                        src=""
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
                            <LoginGoogle />
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default Login;
