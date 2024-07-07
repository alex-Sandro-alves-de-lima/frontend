import React from 'react';
import {  Breadcrumb,  Col, Divider, Layout, Row } from 'antd';
import { UserOutlined ,HomeOutlined} from '@ant-design/icons';

import Cabecalho from './Menu';
const {  Content,Header, Footer } = Layout;

const headerStyle: React.CSSProperties = {
  // textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#FFF',
};

const contentStyle: React.CSSProperties = {
 //backgroundColor: '#0958d9',
  height: 450,
  overflow: 'auto',
  marginInline : 5, 
  padding: '0 16px',
 border: '1px solid rgba(140, 140, 140, 0.35)',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const breadcrumbStyle : React.CSSProperties={
  paddingInline : 1, 
  marginInline : 5, 
  lineHeight : 1, 
  marginBottom: 5,
  border: '1px solid rgba(140, 140, 140, 0.35)',
}

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  border: '1px solid rgba(140, 140, 140, 0.35)',
 // width: 'calc(50% - 8px)',
 // maxWidth: 'calc(50% - 8px)',
};

const App: React.FC = () => (

    <Layout style={layoutStyle} >  
    {/* <Sider width="15%" > Sider</Sider> */}
       <Layout>
      <Breadcrumb style={breadcrumbStyle} items={[ {href: '',  title: <HomeOutlined />, },{ href: '', title: ( <>  <UserOutlined />  <span>Application List</span></>), },{ title: 'Application', }, ]}/>
            <Header style={headerStyle} >  
            <Row  gutter={15}>
                <Col flex={1}>
                <Cabecalho/>
             </Col>
                <Col flex={1}>
                <Divider orientation="right"> Manutenção de produtos</Divider>
                </Col>
              </Row>
                 </Header>            
      <Content style={contentStyle}>
   ss
      </Content>
      
      <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
    

    );

export default App;