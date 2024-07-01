import React from 'react';
import { Layout, Button } from 'antd';
import ListItem from './ListItem';

const Item: React.FC = () => {
  const YourExistingComponent = () => (
    <div style={{ backgroundColor: '#f0f0f0', padding: 16, borderRadius: 8, height: 'calc(100vh - 64px)', overflow: 'auto' }}>
      <ListItem />
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ background: '#fff', padding: 0 }}>
        <h1 style={{ textAlign: 'center' }}>Catalogo de itens.</h1>
      </Layout.Header>
      <Layout.Content style={{ margin: '24px 16px 0', display: 'flex', flexDirection: 'column' }}>
       
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Button type="primary" style={{ width: '32%' }}>

          </Button>
          <Button type="primary" style={{ width: '32%' }}>
    
          </Button>
          <Button type="primary" style={{ width: '32%' }}>
      Adicionar item.
          </Button>
        </div>
        {/* Componente que você carrega ocupando o espaço disponível */}
        <div style={{ flex: 1 }}>
          <YourExistingComponent />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default Item;
