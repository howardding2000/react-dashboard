import React from "react";
import { Card, Form, Input, Cascader, Upload, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from "components/ui/LinkButton";
import { useNavigate } from "react-router-dom";

const ProductAddUpdate = () => {
  const { Item } = Form;
  const { TextArea } = Input;

  const navigate = useNavigate();

  const title = (
    <span>
      <LinkButton onClick={() => navigate("/product")}>
        <ArrowLeftOutlined />
      </LinkButton>
      <span style={{ marginLeft: "0.5rem" }}>Add Product</span>
    </span>
  );

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  return (
    <Card title={title}>
      <Form {...formItemLayout}>
        <Item label='Product Name' required>
          <Input placeholder='Product name...' />
        </Item>
        <Item label='Description' required>
          <TextArea
            placeholder='Please enter the description...'
            autoSize={{ minRows: 2, MaxRows: 4 }}
          />
        </Item>
        <Item label='Price' required>
          <Input
            type='number'
            addonBefore='$'
            step='0.01'
            min='0'
            placeholder='Please enter the price...'
          />
        </Item>
        <Item label='Category' required>
          <Cascader></Cascader>
        </Item>
        <Item label='image'>
          <Upload></Upload>
        </Item>
        <Item label='Detail'>
          <Upload></Upload>
        </Item>
        <Item>
          <Button type='primary'>Submit</Button>
        </Item>
      </Form>
    </Card>
  );
};

export default ProductAddUpdate;
