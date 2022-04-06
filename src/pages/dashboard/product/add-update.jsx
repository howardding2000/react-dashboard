import React, { useRef } from "react";
import { Card, Form, Input, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from "components/ui/LinkButton";
import { useNavigate, useLocation } from "react-router-dom";
import PicturesWall from "components/product/PicturesWall";
import CategoryStaticOptions from "components/product/CategoryStaticOptions";

const ProductAddUpdate = () => {
  const { Item } = Form;
  const { TextArea } = Input;
  const navigate = useNavigate();
  const imgsRef = useRef();


  // initialize the values for update page
  const location = useLocation();
  const product = location.state?.product;

  const initialValues = {
    name: product?.name,
    desc: product?.desc,
    price: product?.price,
    category: product && [product?.pCategoryId, product?.categoryId],
  };

  
  const title = (
    <span>
      <LinkButton onClick={() => navigate("/product")}>
        <ArrowLeftOutlined />
      </LinkButton>
      <span style={{ marginLeft: "0.5rem" }}>
        {product ? "Update Product" : "Add Product"}
      </span>
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

  const validatePrice = (rule, value) => {
    if (value > 0) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Price should greater than $0.00"));
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values, imgsRef.current);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card title={title}>
      <Form
        name='addupdate'
        {...formItemLayout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
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
        <Item
          name='category'
          label='Category'
          required
          rules={[{ required: true, message: "Category can not be empty." }]}
        >
          <CategoryStaticOptions />
        </Item>
        <Item name='image' label='Image'>
          <PicturesWall ref={imgsRef} />
        </Item>
        {/* <Item name='detail' label='Detail'>
        </Item> */}
        <Item
          wrapperCol={{
            xxl: { span: 8 },
            xl: { offset: 3, span: 10 },
            md: { offset: 5, span: 12 },
            sm: { offset: 7 },
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
