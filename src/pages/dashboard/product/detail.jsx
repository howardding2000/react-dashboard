import React from "react";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
const ProductDetail = () => {
  const { Item } = List;
  const title = (
    <span>
      <ArrowLeftOutlined />
      <span>Product Detail</span>
    </span>
  );
  const extra = {};
  return (
    <Card title={title} extra={extra} className='product__detail'>
      <List>
        <Item>
          <span>Product Name</span>
          <span>A Name....</span>
        </Item>
        <Item>
          <span>Product Description</span>
          <span>A Description...</span>
        </Item>
        <Item>
          <span>Product Price</span>
          <span>666</span>
        </Item>
        <Item>
          <span>Category</span>
          <span>A Category</span>
        </Item>
        <Item>
          <span>Image</span>
          <span>Some Image</span>
        </Item>
      </List>
    </Card>
  );
};

export default ProductDetail;
