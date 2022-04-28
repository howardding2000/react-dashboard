import React from "react";
import { Card, List } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import LinkButton from "components/ui/LinkButton";
import { BASE_IMG_URL } from "utils/constants";

import "./detail.less";

const ProductDetail = () => {
  const Item = List.Item;
  const navigate = useNavigate();

  // get product from location.state
  const location = useLocation();
  const { product, selects } = location.state;

  const pCategory = selects.find((item) => item.value === product.pCategoryId);
  const category =
    pCategory &&
    pCategory.children.find((item) => item.value === product.categoryId);

  const title = (
    <span>
      <LinkButton onClick={() => navigate("/product")}>
        <ArrowLeftOutlined />
      </LinkButton>
      <span style={{ marginLeft: "0.5rem" }}>Product Detail</span>
    </span>
  );

  return (
    <Card title={title} className='product__detail'>
      <List>
        <Item>
          <h2>Product Name</h2>
          <span>{product.name}</span>
        </Item>
        <Item>
          <h2>Product Description</h2>
          <span>{product.desc}</span>
        </Item>
        <Item>
          <h2>Product Price</h2>
          <span>${product.price}</span>
        </Item>
        <Item>
          <h2>Category</h2>
          <span>
            {pCategory.label} {category.label && <ArrowRightOutlined />}{" "}
            {category.label}
          </span>
        </Item>
        <Item>
          <h2>Image</h2>
          <span>
            {product.imgs.map((img) => (
              <img
                className='product__img'
                key={img}
                src={BASE_IMG_URL + img}
                alt='img'
              />
            ))}
          </span>
        </Item>
        <Item>
          <h2>Detail</h2>
          <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
        </Item>
      </List>
    </Card>
  );
};

export default ProductDetail;
