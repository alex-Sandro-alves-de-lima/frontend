import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Layout, message } from 'antd';
import itemStore from '../../store/store'; // Importa a loja Zustand
import { IItem } from '../../modules/item.entity';

const { Content, Header } = Layout;

const AddItemForm: React.FC = () => {
    const { fetchItems, addItem } = itemStore(); // Usa a loja Zustand

    useEffect(() => {
        fetchItems();
    }, []);

    const onFinish = async (values: IItem) => {
        await addItem(values);
        message.success('Item adicionado com sucesso!');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff', padding: 0 }}>
                <h1 style={{ textAlign: 'center' }}>Incluir Item</h1>
            </Header>
            <Content style={{ padding: '24px' }}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ stateItem: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Code"
                        name="code"
                        rules={[{ required: true, message: 'Please input the code!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="EAN"
                        name="ean"
                        rules={[{ required: true, message: 'Please input the EAN!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="URL Image"
                        name="urlImage"
                        rules={[{ required: true, message: 'Please input the URL of the image!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="stateItem"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>State Item</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Add Item
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default AddItemForm;
