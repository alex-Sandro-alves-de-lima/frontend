import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton, Button, Input } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import itemStore from '../../store/store'; // Importa a loja Zustand
import { IItem } from '../../types';

const ListItemForm: React.FC = () => {
  const { items, fetchItems, deleteItem } = itemStore(state => ({
    items: state.items,
    fetchItems: state.fetchItems,
    deleteItem: state.deleteItem
  }));

  const [loading, setLoading] = useState(false);
  const [displayedItems, setDisplayedItems] = useState<IItem[]>([]); // Definindo o tipo como IItem[]

  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    setDisplayedItems(items.slice(0, 10)); // Corrigindo a inicialização do estado
  }, [items]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setDisplayedItems(prevItems => [
        ...prevItems,
        ...items.slice(prevItems.length, prevItems.length + 10)
      ]); // Corrigindo a função de atualização do estado
      setLoading(false);
    }, 500);
  };

  const handleDelete = async (id: number) => {
    await deleteItem(id);
  };

  const handleEdit = (id: number) => {
    navigate(`/editItem/${id}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(
    item =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().includes(searchTerm)
  );

  return (
    <div>
      <Input 
        placeholder="Busca por id, ou descrição do produto." 
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <InfiniteScroll
          dataLength={displayedItems.length}
          next={loadMoreData}
          hasMore={displayedItems.length < filteredItems.length}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={filteredItems.slice(0, displayedItems.length)}
            renderItem={(item: IItem) => (
              <List.Item key={item.id} actions={[
                <Button icon={<EditOutlined />} onClick={() => handleEdit(item.id)}>Edit</Button>,
                <Button icon={<DeleteOutlined />} onClick={() => handleDelete(item.id)} danger>Delete</Button>
              ]}>
                <List.Item.Meta
                  avatar={<Avatar src={item.urlImage} />}
                  title={<a href={`/item/${item.id}`}>{item.description}</a>}
                  description={`Code: ${item.code}, EAN: ${item.ean}, Price: ${item.price}, State: ${item.stateItem}`}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ListItemForm;
