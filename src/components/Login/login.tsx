import React, { useState } from 'react';
import { Button, Input, Form, Card, Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LoginGoogle from '../Login/loginGoogle';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onFinish = async (values: any) => {
        const { username, password } = values;
        setLoading(true);
        setError(null);
        try {
            await login(username, password);
            console.log('Login bem-sucedido!');
            navigate("/product");
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro ao fazer login. Por favor, verifique suas credenciais.');
        } finally {
            setLoading(false);
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
                        {error && <Alert message={error} type="error" showIcon />}
                        <Form.Item name="username" rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuário" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}>
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Senha" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <LoginGoogle />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
