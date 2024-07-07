
import { Form, Input, Button, Space, Card } from 'antd';

const { TextArea } = Input;

const ProdutoForm = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const onFinish = (values) => {
    console.log('Form Values:', values);
  };

  return (
    <Form
      name="produtoForm"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        produtos: [{
          alturaProduto: '',
          atributosDinamicos: {},
          bloco: '',
          categoria: '',
          // inicialize os outros campos conforme necessário
        }],
        status: ''
      }}
    >
      <Card title="Produtos" bordered={false}>
        <Form.List name="produtos">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} direction="vertical" style={{ width: '100%' }}>
                  <Card type="inner" title={`Produto ${key + 1}`} extra={<Button onClick={() => remove(name)}>Remover</Button>}>
                    <Form.Item
                      {...restField}
                      name={[name, 'alturaProduto']}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-expect-error
                      fieldKey={[fieldKey, 'alturaProduto']}
                      label="Altura Produto"
                      rules={[{ required: true, message: 'Altura Produto é obrigatória' }]}
                    >
                      <Input placeholder="Altura Produto" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'bloco']}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-expect-error
                      fieldKey={[fieldKey, 'bloco']}
                      label="Bloco"
                      rules={[{ required: true, message: 'Bloco é obrigatório' }]}
                    >
                      <Input placeholder="Bloco" />
                    </Form.Item>
                    {/* Adicione mais campos conforme necessário */}
                    <Form.Item
                      {...restField}
                      name={[name, 'atributosDinamicos']}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-expect-error
                      fieldKey={[fieldKey, 'atributosDinamicos']}
                      label="Atributos Dinâmicos"
                    >
                      <TextArea placeholder="Atributos Dinâmicos" />
                    </Form.Item>
                  </Card>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Adicionar Produto
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>

      <Card title="Status" bordered={false}>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Status é obrigatório' }]}
        >
          <Input placeholder="Status" />
        </Form.Item>
      </Card>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProdutoForm;
