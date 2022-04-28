import React, { useEffect, useRef } from "react";
import { message, Modal, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import LinkButton from "components/ui/LinkButton";
import { reqDeleteProduct, reqDeleteImage, reqCategories } from "api";

const ProductOption = ({ product, onBack }) => {
  const navigate = useNavigate();
  const { confirm } = Modal;
  const categorySelectsRef = useRef();

  const delelteProduct = async (product) => {
    const { _id: productId, imgs } = product;

    // delete the product
    const result = await reqDeleteProduct(productId);

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
      message.error(`Delete product failed! ${result.msg}`);
    }
  };

  useEffect(() => {
    //find and put parent's children into its children[] property
    const findChildren = (parent, selectList) => {
      if (selectList && selectList.length > 0) {
        parent.children = [];
        selectList.forEach((item) => {
          if (parent.value === item.pValue) {
            parent.children.push(findChildren(item, selectList));
          }
        });
        if (parent.children.length === 0) {
          delete parent.children;
        }
        return parent;
      }
    };

    // turn the categories to the selects tree
    const initSelects = (categories) => {
      // turn all categories to selects list
      const selectList = categories.map((c) => ({
        value: c._id,
        label: c.name,
        pValue: c.parentId,
      }));
      //create a temporary root select for storing the optins tree.
      const tempRootSelect = {
        value: "0",
        label: "root",
        pValue: "-1",
      };
      const updatedTempRootSelect = findChildren(tempRootSelect, selectList);
      return [...updatedTempRootSelect.children];
    };

    const getAllCategories = async () => {
      // -1:fetch all categories
      const result = await reqCategories("-1");
      if (result.status === 0) {
        const categories = result.data;
        const selects = initSelects(categories);
        categorySelectsRef.current = selects;
      }
    };

    getAllCategories();
  }, []);

  const showDetail = (product) => {
    // pass product to Detail page
    navigate("detail", {
      replace: true,
      state: { product, selects: categorySelectsRef.current },
    });
  };

  const showUpdate = (product) => {
    navigate("addupdate", {
      replace: true,
      state: { product, selects: categorySelectsRef.current },
    });
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
    <Space
      size='middle'
      align='center'
      style={{
        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      <LinkButton onClick={() => showDetail(product)}>
        <FileTextOutlined style={{ fontSize: "1rem" }} />
      </LinkButton>
      <LinkButton onClick={() => showUpdate(product)}>
        <EditOutlined style={{ fontSize: "1rem" }} />
      </LinkButton>
      <LinkButton onClick={() => showDelete(product)}>
        <DeleteOutlined style={{ fontSize: "1rem" }} />
      </LinkButton>
    </Space>
  );
};

export default ProductOption;
