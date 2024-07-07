import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserOutlined, VideoCameraOutlined, LoginOutlined } from '@ant-design/icons';
import { Layout, Menu, Tooltip, Avatar, Modal, theme } from 'antd';
import { useAuthStore } from './store/authStore';
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];
const { Header, Content, Footer, Sider } = Layout;

const menuItems: MenuItem[] = [
    { label: 'Produto', key: 'product', icon: <UserOutlined /> },
    { label: 'AddItemForm', key: 'AddItemForm', icon: <VideoCameraOutlined /> },
    { label: 'ListItemForm', key: 'ListItemForm', icon: <VideoCameraOutlined /> },
    { label: 'ListItem', key: 'ListItem', icon: <VideoCameraOutlined /> },   
    { label: 'Item', key: 'Item', icon: <VideoCameraOutlined /> },   
    { label: 'teste', key: 'teste', icon: <VideoCameraOutlined /> }, 
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <UserOutlined />,
      children: [
        { key: '5', label: 'Option 5' },
        { key: '6', label: 'Option 6' },
        { key: '7', label: 'Option 7' },
        { key: '8', label: 'Option 8' },
      ],
    },
    {
      key: 'sub2',
      label: 'Navigation Two',
      icon: <UserOutlined />,
      children: [
        { key: '9', label: 'Option 9' },
        { key: '10', label: 'Option 10' },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            { key: '11', label: 'Option 11' },
            { key: '12', label: 'Option 12' },
          ],
        },
      ],
    },
  ];

  


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

    const {
        token: { colorBgBase },
      } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
             style={{backgroundColor :colorBgBase}}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
            >
                <div >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Babygrande_300x120_Logo.jpg"
                        alt="Logo"
                        style={{ width: '100%', padding: '16px' }}
                    />              
                </div>
             
                <Menu
                    // style={{backgroundColor :"#FFF"}}
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['Dashboard']}
                    onClick={({ key }) => {
                        navigate(key);
                    }}
              
                    items={menuItems}
                >
                    {/* {menuItems.map((item) => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            {item.label}
                        </Menu.Item>
                    ))} */}
                </Menu>
                
            </Sider>
            <Layout >
                <Header  style={{ background: colorBgBase ,padding : 0}} >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
                        <div></div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {renderUserInfo()}
                            <LoginOutlined style={{ fontSize: '20px', marginLeft: 16, cursor: 'pointer' }} onClick={handleLogout} />
                        </div>
                    </div>
                </Header>
                <Content style={{ 
                    margin: '10px 10px 0',
                     overflow: 'auto',
                     height: 400,
                     padding: '0 1px',
                    // border: '1px solid rgba(140, 140, 140, 0.35)',
                     }}>
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
