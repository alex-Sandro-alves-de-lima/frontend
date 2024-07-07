
import { IProduct } from '../../modules/product.entity'; // Atualize o caminho para o arquivo onde está a interface IProduct
import productStore from '../../store/product.store'; // Atualize o caminho para o arquivo onde está o estado de Zustand
import { Form, Input, Button, Space, message, InputNumber, Select, Checkbox } from 'antd';

const { Option } = Select;

const ProductForm = () => {
    const { addProduct } = productStore();
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            const newProduct: IProduct = {
                cod_prod: 2,
                cod_prod_origem: values.cod_prod_origem,
                desc_marca: values.desc_marca,
                desc_cor: values.desc_cor.split(','),
                ind_prod_peso: values.ind_prod_peso,
                desc_prod: values.desc_prod.split(','),
                ind_prod_status: values.ind_prod_status,
                images: values.images.map((img: any) => ({
                    end_link_imagem: img.end_link_imagem,
                    cod_prod: 2
                })),
                ean_codes: values.ean_codes.map((ean: any) => ({
                    ean: ean.ean.split(','),
                    emba: ean.emba,
                    status: ean.status,
                    cod_prod: 2-
                })),
                prices: values.prices.map((price: any) => ({
                    status: price.status,
                    cod_prod: price.cod_prod
                })),
                measures: values.measures.map((measure: any) => ({
                    ean_prod: measure.ean_prod.split(','),
                    unm_desc: measure.unm_desc,
                    prod_altura: measure.prod_altura,
                    prod_larg: measure.prod_larg,
                    prod_comprimento: measure.prod_comprimento,
                    prod_peso_bruto: measure.prod_peso_bruto,
                    prod_peso_liquido: measure.prod_peso_liquido,
                    prod_peso_unm: measure.prod_peso_unm,
                    prod_mtc: measure.prod_mtc,
                    cod_prod: 2 // Este valor deve ser ajustado conforme necessário
                })),
                departmentId: values.departmentId,
                categoryId: values.categoryId,
                subcategoryId: values.subcategoryId,
                sectionId: values.sectionId,
                groupId: values.groupId,
                subgroupId: values.subgroupId
            };

            await addProduct(newProduct);
            message.success('Produto cadastrado com sucesso!');
            form.resetFields();
        } catch (error) {
            message.error('Erro ao cadastrar produto');
        }
    };

    return (
        <Form
            form={form}
            name="productForm"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ ind_prod_status: true }}
        >
            <Form.Item
                label="Código de Origem do Produto"
                name="cod_prod_origem"
                rules={[{ required: true, message: 'Por favor, insira o código de origem do produto!' }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Marca"
                name="desc_marca"
                rules={[{ required: true, message: 'Por favor, insira a marca!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Cores (separadas por vírgula)"
                name="desc_cor"
                rules={[{ required: true, message: 'Por favor, insira as cores!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Indicação de Peso"
                name="ind_prod_peso"
                rules={[{ required: true, message: 'Por favor, insira a indicação de peso!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Descrição do Produto (separada por vírgula)"
                name="desc_prod"
                rules={[{ required: true, message: 'Por favor, insira a descrição do produto!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Status do Produto"
                name="ind_prod_status"
                valuePropName="checked"
            >
                <Checkbox />
            </Form.Item>

            <Form.List name="images">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'end_link_imagem']}
                                    fieldKey={[fieldKey, 'end_link_imagem']}
                                    rules={[{ required: true, message: 'Por favor, insira o link da imagem!' }]}
                                >
                                    <Input placeholder="Link da Imagem" />
                                </Form.Item>
                                <Button onClick={() => remove(name)}>Remover</Button>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block>
                                Adicionar Imagem
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Form.List name="ean_codes">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'ean']}
                                    fieldKey={[fieldKey, 'ean']}
                                    rules={[{ required: true, message: 'Por favor, insira o EAN!' }]}
                                >
                                    <Input placeholder="EAN (separados por vírgula)" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'emba']}
                                    fieldKey={[fieldKey, 'emba']}
                                    rules={[{ required: true, message: 'Por favor, insira a embalagem!' }]}
                                >
                                    <InputNumber placeholder="Embalagem" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'status']}
                                    fieldKey={[fieldKey, 'status']}
                                    valuePropName="checked"
                                >
                                    <Checkbox>Ativo</Checkbox>
                                </Form.Item>
                                <Button onClick={() => remove(name)}>Remover</Button>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block>
                                Adicionar EAN Code
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Form.List name="prices">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'status']}
                                    fieldKey={[fieldKey, 'status']}
                                    valuePropName="checked"
                                >
                                    <Checkbox>Ativo</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'cod_prod']}
                                    fieldKey={[fieldKey, 'cod_prod']}
                                    rules={[{ required: true, message: 'Por favor, insira o preço!' }]}
                                >
                                    <InputNumber placeholder="Preço" />
                                </Form.Item>
                                <Button onClick={() => remove(name)}>Remover</Button>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block>
                                Adicionar Preço
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Form.List name="measures">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'ean_prod']}
                                    fieldKey={[fieldKey, 'ean_prod']}
                                    rules={[{ required: true, message: 'Por favor, insira o EAN do produto!' }]}
                                >
                                    <Input placeholder="EAN Produto (separados por vírgula)" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'unm_desc']}
                                    fieldKey={[fieldKey, 'unm_desc']}
                                    rules={[{ required: true, message: 'Por favor, insira a descrição da unidade!' }]}
                                >
                                    <Input placeholder="Descrição da Unidade" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'prod_altura']}
                                    fieldKey={[fieldKey, 'prod_altura']}
                                    rules={[{ required: true, message: 'Por favor, insira a altura do produto!' }]}
                                >
                                    <InputNumber placeholder="Altura" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'prod_larg']}
                                    fieldKey={[fieldKey, 'prod_larg']}
                                    rules={[{ required: true, message: 'Por favor, insira a largura do produto!' }]}
                                >
                                    <InputNumber placeholder="Largura" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'prod_comprimento']}
                                    fieldKey={[fieldKey, 'prod_comprimento']}
                                    rules={[{ required: true, message: 'Por favor, insira o comprimento do produto!' }]}
                                >
                                    <InputNumber placeholder="Comprimento" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'prod_peso_bruto']}
                                    fieldKey={[fieldKey, 'prod_peso_bruto']}
                                    rules={[{ required: true, message: 'Por favor, insira o peso bruto do produto!' }]}
                                >
                                    <InputNumber placeholder="Peso Bruto" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'prod_peso_liquido']}
                                    fieldKey={[fieldKey, 'prod_peso_liquido']}
                                    rules={[{ required: true, message: 'Por favor, insira o peso líquido do produto!' }]}
                                >
                                    <InputNumber placeholder="Peso Líquido" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'prod_peso_unm']}
                                    fieldKey={[fieldKey, 'prod_peso_unm']}
                                    rules={[{ required: true, message: 'Por favor, insira o peso por unidade!' }]}
                                >
                                    <InputNumber placeholder="Peso Unidade" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'prod_mtc']}
                                    fieldKey={[fieldKey, 'prod_mtc']}
                                    rules={[{ required: true, message: 'Por favor, insira o MTC do produto!' }]}
                                >
                                    <InputNumber placeholder="MTC" />
                                </Form.Item>
                                <Button onClick={() => remove(name)}>Remover</Button>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block>
                                Adicionar Medida
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Cadastrar Produto
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProductForm;
