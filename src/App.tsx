import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserOutlined, VideoCameraOutlined, LoginOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, MenuProps, Avatar, Tooltip, Modal } from 'antd';
import { useAuthStore } from './store/authStore';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
    const { logout } = useAuthStore();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);

    type MenuItem = Required<MenuProps>['items'][number];

    const {
        token: { colorBgContainer }
    } = theme.useToken();

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[]
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem("Login", "login", <UserOutlined />),
        getItem("Produto", "Products", <UserOutlined />),
        getItem("Video", "video", <VideoCameraOutlined />),
        getItem("Product", "Product", <VideoCameraOutlined />),
    ];

    const showLogoutModal = () => {
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

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
               // style={{ background: colorBgContainer }}
            >
                <div className="demo-logo-vertical">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Babygrande_300x120_Logo.jpg" alt="Logo" style={{ width: '100%', padding: '16px' }} />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['login']}
                    onClick={(event) => {
                        navigate(event.key);
                    }}
                  //  style={{ background: colorBgContainer }}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ 
                    //background: colorBgContainer,
                     padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>asd</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title={<div><div>Nome: Alex Sandro</div><div>Nível de Acesso: Admin</div></div>}>
                            <div style={{ padding: 4, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                                <div style={{ marginLeft: 8 }}>Alex S</div>
                            </div>
                        </Tooltip>
                        <LoginOutlined style={{ fontSize: '20px', marginLeft: 16, cursor: 'pointer' }} onClick={showLogoutModal} />
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'auto'
                   // , background: colorBgContainer 
                    }}>
                    <div style={{ padding: 24, minHeight: 'calc(100vh - 112px)' }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', background: colorBgContainer }}>Ant Design ©2023 Created by Ant UED</Footer>
                <Modal title="Logout" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Sim" cancelText="Não">
                    <p>Você deseja deslogar da aplicação?</p>
                </Modal>
            </Layout>
        </Layout>
    );
};

export default App;
