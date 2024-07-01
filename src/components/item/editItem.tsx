import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Checkbox, message, Layout } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import itemStore from '../../store/store'; 
import { IItem } from '../../types';

const { Content } = Layout;

const EditItem: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { items, fetchItems, editItem } = itemStore(state => ({
        items: state.items,
        fetchItems: state.fetchItems,
        editItem: state.editItem
    }));

    const [item, setItem] = useState<IItem>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    useEffect(() => {
        if (items.length > 0) {
            const foundItem = items.find(item => item.id === Number(id));
            if (foundItem) {
                setItem(foundItem);
            }
            setLoading(false);
        }
    }, [items, id]);

    const handleFinish = async (values: IItem) => {
        await editItem(Number(id), values);
        message.success('Item atualizado com sucesso!');
        navigate('/item');
    };



    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!item) {
        return <div>Item não encontrado</div>;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Header style={{ background: '#fff', padding: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
                    <div>
                        <h1>Editar Item</h1>
                        <h2>{item.description}</h2>
                    </div>
                    <div>
                        <img src={item.urlImage} alt={item.description} style={{ maxHeight: 100, cursor: 'pointer' }}  />
                    </div>
                </div>
            </Layout.Header>
            <Content style={{ padding: '24px' }}>
                <Form
                    initialValues={item}
                    onFinish={handleFinish}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 12 }}
                >
                    <Form.Item
                        label="ID"
                        name="id"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Código"
                        name="code"
                        rules={[{ required: true, message: 'Por favor insira o código' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Descrição"
                        name="description"
                        rules={[{ required: true, message: 'Por favor insira a descrição' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="EAN"
                        name="ean"
                        rules={[{ required: true, message: 'Por favor insira o EAN' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Preço"
                        name="price"
                        rules={[{ required: true, message: 'Por favor insira o preço' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="URL da Imagem"
                        name="urlImage"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="stateItem"
                        valuePropName="checked"
                        wrapperCol={{ offset: 6, span: 12 }}
                    >
                        <Checkbox>Ativo</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                        <Button type="primary" htmlType="submit">Salvar</Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default EditItem;
