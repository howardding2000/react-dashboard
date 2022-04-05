import React, { useState, useEffect, useCallback } from "react";
import { Card, Form, Input, Cascader, Upload, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from "components/ui/LinkButton";
import { useNavigate, useLocation } from "react-router-dom";
import { reqCategories, reqCategory } from "api";

const ProductAddUpdate = () => {
  const { Item } = Form;
  const { TextArea } = Input;
  const navigate = useNavigate();

  // get product from location.state
  const location = useLocation();
  const product = location.state?.product;
  const [categoryOptions, setCategoryOptions] = useState();

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

  // set top options
  const initOptions = async (categories) => {
    // turn categories to options
    const options = categories.map((c) => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }));

    if (product && product.pCategoryId !== 0) {

      const targetOption = options.find((o) => o.value === product.pCategoryId);

      // fetch sub categories
      const subCategories = await getCategories(product.pCategoryId);
      const subOptions = subCategories.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));

      targetOption.children = subOptions;
    }
    setCategoryOptions(options);
  };

  const getCategories = useCallback(async (parentId) => {
    const result = await reqCategories(parentId);

    if (result.status === 0) {
      const categories = result.data;
      if (parentId === "0") {
        // setup top categories
        initOptions(categories);
      } else {
        // return sub categories
        return categories;
      }
    }
  }, []);

  // load sub options
  const onLoadData = async (selectedOptions) => {
    const targetOption = selectedOptions[0];

    targetOption.loading = true;
    // fetch sub categories
    const subCategories = await getCategories(targetOption.value);

    
    // turn categories to options
    if (subCategories && subCategories.length > 0) {
      const subOptions = subCategories.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      targetOption.children = subOptions;
      
      targetOption.loading = false;
    } else {
      targetOption.isLeaf = true;
    }

    setCategoryOptions([...categoryOptions]);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    getCategories("0");
  }, [getCategories]);

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
          rules={[
            { required: true, message: "Category can not be empty." },
            // { validator: validatePrice },
          ]}
        >
          <Cascader
            options={categoryOptions}
            loadData={onLoadData}
            placeholder='Please select'
            changeOnSelect
          />
        </Item>
        {/* <Item name='image' label='Image'>
        </Item>
        <Item name='detail' label='Detail'>
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
