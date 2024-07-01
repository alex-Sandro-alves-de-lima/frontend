import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserOutlined, VideoCameraOutlined, LoginOutlined } from '@ant-design/icons';
import { Layout, Menu, Tooltip, Avatar, Modal } from 'antd';
import { useAuthStore } from './store/authStore';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleLogout = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        logout();
        navigate('/login');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const renderUserInfo = () => {
        if (user) {
            return (
                <Tooltip title={`Nome: ${user.name}\n Nível de Acesso: ${user.email}`}>
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <Avatar src={String(user.picture)} />
                        <div style={{ marginLeft: 8 }}>{user.name}</div>
                    </div>
                </Tooltip>
            );
        }
        return null;
    };

    const menuItems = [
        { label: 'Produto', key: 'products', icon: <UserOutlined /> },
        { label: 'AddItemForm', key: 'AddItemForm', icon: <VideoCameraOutlined /> },
        { label: 'ListItemForm', key: 'ListItemForm', icon: <VideoCameraOutlined /> },
        { label: 'ListItem', key: 'ListItem', icon: <VideoCameraOutlined /> },   
        { label: 'Item', key: 'Item', icon: <VideoCameraOutlined /> },   
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
            >
                <div className="demo-logo-vertical">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Babygrande_300x120_Logo.jpg"
                        alt="Logo"
                        style={{ width: '100%', padding: '16px' }}
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['login']}
                    onClick={({ key }) => {
                        navigate(key);
                    }}
                >
                    {menuItems.map((item) => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
                        <div>{/* Insira qualquer conteúdo extra aqui, se necessário */}</div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {renderUserInfo()}
                            <LoginOutlined style={{ fontSize: '20px', marginLeft: 16, cursor: 'pointer' }} onClick={handleLogout} />
                        </div>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'auto' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
                <Modal
                    title="Logout"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Sim"
                    cancelText="Não"
                >
                    <p>Você deseja deslogar da aplicação?</p>
                </Modal>
            </Layout>
        </Layout>
    );
};

export default App;
