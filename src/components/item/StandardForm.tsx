import React from 'react';
import { Form, Button, Space, Card } from 'antd';
interface IFormularioDinamico {
  name: string;
  label: string;
  rules: { required: boolean; message: string }[];
  component: React.ReactNode;
}

interface IStandardForm{
  onFinish: ()=> void,
   formItems: IFormularioDinamico[]
}
const { Item: FormItem } = Form;

const StandardForm = ({ onFinish, formItems }:IStandardForm) => (
  <Card title="Fomulario dinamico" style={{ maxWidth: 600, margin: 'auto' }}>
    <Form onFinish={onFinish} layout="vertical">
      {formItems.map(({ name, label, rules, component } : IFormularioDinamico) => (
        <FormItem key={name} name={name} label={label} rules={rules}>
          {component}
        </FormItem>
      ))}
      <FormItem>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">
            Reset
          </Button>
        </Space>
      </FormItem>
    </Form>
  </Card>
);

export default StandardForm;
