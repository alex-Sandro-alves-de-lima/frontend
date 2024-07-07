
import { Card, Col, Row } from 'antd';

const { Meta } = Card;

const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is the description for product 1',
    price: '$10.00',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is the description for product 2',
    price: '$20.00',
    imageUrl: 'https://via.placeholder.com/150',
  },
  // Adicione mais produtos conforme necessário
];

const ProductCatalog = () => (
  <Row gutter={[16, 16]}>
    {products.map(product => (
      <Col
        xs={24}
        sm={12}
        md={8}
        lg={6}
        xl={4}
        key={product.id}
      >
        <Card
          hoverable
          cover={<img alt={product.name} src={product.imageUrl} />}
        >
          <Meta title={product.name} description={product.description} />
          <p>Price: {product.price}</p>
        </Card>
      </Col>
    ))}
  </Row>
);

export default ProductCatalog;
