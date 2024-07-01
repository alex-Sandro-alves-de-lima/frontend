


import React, { useEffect } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import itemStore from '../../store/store';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ListItemForm: React.FC = () => {
const { items, fetchItems,deleteItem } = itemStore(); // Usa a loja Zustand
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = async (id: number) => {
    await deleteItem(id);
  };

  const handleEdit = (id: number) => {
    navigate(`/editItem/${id}`);
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={items}
      footer={
        <div>
          <b>Item List</b> footer part
        </div>
      }
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            <Button icon={<EditOutlined />} onClick={() => handleEdit(item.id)}>Edit</Button>,
            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(item.id)} danger>Delete</Button>,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src={item.urlImage}
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.urlImage} />}
            title={<a href={`/item/${item.id}`}>{item.description}</a>}
            description={item.description}
          />
          {`Code: ${item.code}, EAN: ${item.ean}, Price: ${item.price}, State: ${item.stateItem}`}
        </List.Item>
      )}
    />
  );
};

export default ListItemForm;
