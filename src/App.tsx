import React, { useState, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserOutlined, VideoCameraOutlined, LoginOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, MenuProps, Avatar, Tooltip, Modal, ConfigProvider, ColorPicker } from 'antd';
import { useAuthStore } from './store/authStore';
import type { ColorPickerProps } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type GetProp<T, K extends keyof T> = T[K];
type Color = GetProp<ColorPickerProps, 'value'>;

const App: React.FC = () => {
    const { logout } = useAuthStore();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [colorHex, setColorHex] = useState<Color>('#DBE2EB');

    const hexString = useMemo<string>(() => (
        (typeof colorHex === 'string' ? colorHex : colorHex?.toHexString() ?? '#DBE2EB')
    ), [colorHex]);

    type MenuItem = Required<MenuProps>['items'][number];
    const {
        token: { colorBgContainer },
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
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: `${hexString}`,
                    borderRadius: 6,
                    colorBgContainer: '#C4D3E7',
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
                    }
                }
            }}
        >
            <Layout style={{ height: '100vh' }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
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
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                        <div style={{ paddingLeft: '16px' }}>asd</div>
                        <div style={{ display: 'flex', alignItems: 'center', paddingRight: '16px' }}>
                            <Tooltip title={<div><div>Nome: Alex Sandro</div><div>Nível de Acesso: Admin</div></div>}>
                                <div style={{ padding: 4, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                                    <div style={{ marginLeft: 8 }}>Alex S</div>
                                </div>
                            </Tooltip>
                            <LoginOutlined style={{ fontSize: '20px', marginLeft: 16, cursor: 'pointer' }} onClick={showLogoutModal} />
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'auto' }}>
                        <div style={{ padding: 24, minHeight: 'calc(100vh - 112px)', background: colorBgContainer }}>
                            <ColorPicker
                                value={colorHex}
                                onChange={setColorHex}
                                format="hex"
                            />
                            <Outlet />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
                <Modal title="Logout" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Sim" cancelText="Não">
                    <p>Você deseja deslogar da aplicação?</p>
                </Modal>
            </Layout>
        </ConfigProvider>
    );
};

export default App;
