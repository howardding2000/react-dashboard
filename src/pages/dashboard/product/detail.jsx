import React, { useState, useEffect } from "react";
import { Card, List } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import LinkButton from "components/ui/LinkButton";
import { BASE_IMG_URL } from "utils/constants";
import { reqCategory } from "api/index";

import "./detail.less";

const ProductDetail = () => {
  const Item = List.Item;
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState({});

  // get product from location.state
  const location = useLocation();
  const { product } = location.state;

  useEffect(() => {
    const getCategoryInfo = async () => {
      const results = await Promise.all([
        reqCategory(product.pCategoryId),
        reqCategory(product.categoryId),
      ]);

      const [pCategory, category] = results;

      if (pCategory.status === 0 && category.status === 0) {
        const pCategoryName = pCategory.data?.name;
        const categoryName = category.data?.name;
        setCategoryName({
          pCategoryName,
          categoryName,
        });
      }
    };

    getCategoryInfo();
  }, [product.pCategoryId, product.categoryId]);

  // useEffect(() => {}, []);
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
            {categoryName.pCategoryName}{" "}
            {categoryName.categoryName && <ArrowRightOutlined />}{" "}
            {categoryName.categoryName}
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
