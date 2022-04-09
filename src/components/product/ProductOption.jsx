import React from "react";
import { message, Modal } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import LinkButton from "components/ui/LinkButton";
import { reqDelProduct, reqDeleteImage } from "api";

import "./productOption.less";

const ProductOption = ({ product, onBack }) => {
  const navigate = useNavigate();
  const { confirm } = Modal;

  const delelteProduct = async (product) => {

    const { _id: productId, imgs } = product;
    

    // delete the product
    const result = await reqDelProduct(productId);
    if (result.status === 0) {
      // delete the images after delete the product
      if (imgs && imgs.length > 0) {
        const imgsPromises = imgs.map(async (img) => {
          const result = await reqDeleteImage(img);
          return result;
        });
        const results = await Promise.all(imgsPromises);
        if (results.some((r) => r.status !== 0)) {
          console.log(`Delete imgs of ${product.name} failed.`);
        } else {
          console.log(`Delete imgs of ${product.name} successfully.`);
        }
      }

      message.success("Delete product successfully!");
      onBack();
    }
    if (result.status !== 0) {
      console.log(result)
      message.error(`Delete product failed! ${result.msg}`);
    }
  };

  const showDetail = (product) => {
    // pass product to Detail page
    navigate("detail", { replace: true, state: { product } });
  };
  const showUpdate = (product) => {
    navigate("addupdate", { replace: true, state: { product } });
  };

  const showDelete = (product) => {
    confirm({
      title: "Do you want to delete this product?",
      centered: true,
      icon: <ExclamationCircleOutlined />,
      content: "Once deleted, all data of this product will be lost",
      async onOk() {
        delelteProduct(product);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className='product__option'>
      <div className='product__detail_update'>
        <div>
          <LinkButton onClick={() => showDetail(product)}>Detail</LinkButton>
        </div>
        <div>
          <LinkButton onClick={() => showUpdate(product)}>Update</LinkButton>
        </div>
      </div>
      <div className='product__delete'>
        <LinkButton onClick={() => showDelete(product)}>
          <DeleteOutlined />
        </LinkButton>
      </div>
    </div>
  );
};

export default ProductOption;
