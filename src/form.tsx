import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import itemStore from './store/store'; // Importa a loja Zustand
import { IItem } from './modules/item.entity';

const App = () => {
    const { items, fetchItems, addItem, deleteItem } = itemStore(); // Usa a loja Zustand

    useEffect(() => {
        fetchItems();
    }, []);

    const onFinish = async (values: IItem) => {
        await addItem(values);
    };

    const handleDelete = async (id: number) => {
        await deleteItem(id);
    };

    const handleEdit = async (id: number, values: IItem) => {
        await editItem(id, values);
    };

    return (
        <div>
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
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <div>
                {items.map((e, index) => (
                    <div key={index}>
                        <p>{JSON.stringify(e)}</p>
                        <Button type="danger" onClick={() => handleDelete(e.id)}>Delete</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
