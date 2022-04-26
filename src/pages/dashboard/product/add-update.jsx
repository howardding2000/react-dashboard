import React, { useRef } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from "components/ui/LinkButton";
import { useNavigate, useLocation } from "react-router-dom";
import PicturesWall from "components/product/PicturesWall";

import { reqAddProduct, reqUpdateProduct } from "api";
import CategoryStaticSelects from "components/product/CategoryStaticSelects";
import RichTextEditor from "components/product/RichTextEditor";

const ProductAddUpdate = () => {
  // initialize the values for update page
  const location = useLocation();
  const product = location.state?.product;

  const { Item } = Form;
  const { TextArea } = Input;
  const navigate = useNavigate();
  const imgsRef = useRef();
  const editorRef = useRef({ getDetial: {}, detail: product?.detail });

  let initialValues = {
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

  const RichTextLayout = {
    labelCol: { xl: { span: 3 }, md: { span: 5 }, span: 7 },
    wrapperCol: {
      xxl: { span: 12 },
      xl: { span: 14 },
      md: { span: 16 },
      span: 16,
    },
  };

  const SubmitButtonLayout = {
    wrapperCol: {
      xxl: { offset: 3, span: 12 },
      xl: { offset: 3, span: 14 },
      md: { offset: 5, span: 16 },
      sm: { offset: 7, span: 16 },
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

  const onFinish = async (values) => {
    const { name, desc, price, category } = values;
    const imgs = imgsRef.current?.fileList.map((item) => item.name);
    const status = product?.status || "1";
    const detail = editorRef.current.getDetail();

    const updatedProduct = {
      categoryId: category[1],
      desc,
      detail,
      imgs,
      name,
      pCategoryId: category[0],
      price,
      status,
      __v: 0,
      _id: product?._id,
    };

    const result = product
      ? await reqUpdateProduct(updatedProduct)
      : await reqAddProduct(updatedProduct);

    const text = product ? "update" : "add";

    if (result.status === 0) {
      message.success(`Product ${text} successfully!`);
      navigate("/product");
    } else {
      message.error(`Product ${text} failed! ${result.msg}`);
    }
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
          <CategoryStaticSelects />
        </Item>
        <Item name='image' label='Image'>
          <PicturesWall ref={imgsRef} imgs={product?.imgs} />
        </Item>
        <Item
          name='detail'
          label='Detail'
          labelCol={RichTextLayout.labelCol}
          wrapperCol={RichTextLayout.wrapperCol}
        >
          <RichTextEditor editorRef={editorRef} detail={product?.detail} />
        </Item>
        <Item wrapperCol={SubmitButtonLayout.wrapperCol}>
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
