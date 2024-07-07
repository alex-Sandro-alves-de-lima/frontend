
import { Layout, Space, Card } from 'antd';
import ProductList from './index'; // Atualize o caminho para o arquivo onde está o componente ProductList
import ProductForm from './ProductForm'; // Atualize o caminho para o arquivo onde está o componente ProductForm

const { Content } = Layout;

const ProductPage = () => {
    return (
        <Layout style={{ padding: '24px' }}>
            <Content>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Card title="Cadastrar Novo Produto">
                        <ProductForm />
                    </Card>
                    <Card title="Lista de Produtos">
                        <ProductList />
                    </Card>
                </Space>
            </Content>
        </Layout>
    );
};

export default ProductPage;
