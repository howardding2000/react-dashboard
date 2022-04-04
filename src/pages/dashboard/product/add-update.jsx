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
    labelCol: { xl: { span: 3 }, md: { span: 5 }, span: 7 },
    wrapperCol: {
      xxl: { span: 8 },
      xl: { span: 10 },
      md: { span: 12 },
      span: 16,
    },
  };

  const validatePrice = (rule, value, callback) => {
    console.log(value);
    if (value > 0) {
    } else {
      callback("Price should greater than $0.00");
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card title={title}>
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Item
          name='name'
          label='Product Name'
          required
          rules={[
            { required: true, message: "Product name can not be empty." },
          ]}
        >
          <Input placeholder='Product name...' />
        </Item>
        <Item
          name='desc'
          label='Description'
          required
          rules={[{ required: true, message: "Description can not be empty." }]}
        >
          <TextArea
            placeholder='Please enter the description...'
            autoSize={{ minRows: 2, MaxRows: 4 }}
          />
        </Item>
        <Item
          name='price'
          label='Price'
          required
          rules={[
            { required: true, message: "Price can not be empty." },
            { validator: validatePrice },
          ]}
        >
          <Input
            type='number'
            addonBefore='$'
            step='0.01'
            placeholder='Please enter the price...'
          />
        </Item>
        <Item name='category' label='Category' required>
          <Cascader></Cascader>
        </Item>
        <Item label='image'>{/* <Upload></Upload> */}</Item>
        <Item label='Detail'>{/* <Upload></Upload> */}</Item>
        <Item
          wrapperCol={{
            xxl: { span: 8 },
            xl: { offset: 3, span: 10 },
            md: { offset: 5, span: 12 },
            sm:{offset: 7},
            // offset: 7,
            span: 16,
          }}
        >
          <Button
            type='primary'
            htmlType='submit'
            style={{ position: "absolute", right: "0" }}
          >
            Submit
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default ProductAddUpdate;
