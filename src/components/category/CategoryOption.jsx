import React, { useState, useRef } from "react";
import { Space, message, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import LinkButton from "components/ui/LinkButton";
import { reqCategories, reqDeleteCategory, reqUpdateCategory } from "api/index";

import UpdateCategoryForm from "./UpdateCategoryForm";

const CategoryOption = ({
  category,
  setParent,
  setSubCategories,
  setCategories,
}) => {
  // showModalStatus: 0 = not show ,1 = show 'Add Category',2 = show 'Update Category'
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef();

  //update categories state after update the datebase
  const updateCategories = (cat, action) => {
    if (cat.parentId === "0") {
      setCategories((preCats) => {
        const updatedCats = [...preCats];
        const index = updatedCats.findIndex((item) => item._id === cat._id);
        if (action === "UPDATE") {
          updatedCats.splice(index, 1, cat);
        }
        if (action === "DELETE") {
          updatedCats.splice(index, 1);
        }
        return updatedCats;
      });
    }
    if (cat.parentId !== "0") {
      setSubCategories((preCats) => {
        const updateCats = [...preCats];
        const index = updateCats.findIndex((item) => item._id === cat._id);
        if (action === "UPDATE") {
          updateCats.splice(index, 1, cat);
        }
        if (action === "DELETE") {
          updateCats.splice(index, 1);
        }
        return updateCats;
      });
    }
  };

  // show sub category list
  const showSubCategories = (category) => {
    // update state
    setParent({ parentId: category._id, parentName: category.name });
  };

  // delete category and it's sub categories by id
  const deleteCategory = async (category) => {
    const result = await reqDeleteCategory(category._id);
    if (result.status === 0) {
      message.success("Delete category successfully!");
      //update categories state
      updateCategories(category, "DELETE");
    } else {
      message.error("Delete category successfully!");
    }
  };

  // update Category's name
  const updateCategory = (category) => {
    // Form validation
    formRef.current
      .validateFields()
      .then(async (values) => {
        const { categoryName } = values;
        const categoryId = category._id;

        const result = await reqUpdateCategory({ categoryId, categoryName });

        if (result.status === 0) {
          setShowModal(false);
          message.success("Update category's name successfully!");
          //update categories state
          const updateCat = { ...category, name: categoryName };
          //update categories state
          updateCategories(updateCat, "UPDATE");
        } else {
          message.error("Update category's name failed, please try again");
        }
      })
      .catch((errorInfo) => {});
  };

  const showDelete = async (id) => {
    // check if category has sub categories
    if (id) {
      const result = await reqCategories(id);
      if (result.status === 0) {
        let title;
        let content;
        if (result.data.length !== 0) {
          title = "This category has sub categories!";
          content = "Deleting it will LOST all categories under it!!!";
        } else {
          title = "Do you want to delete this category?";
          // content = "OK to confirm";
        }

        Modal.confirm({
          title: title,
          icon: <ExclamationCircleOutlined />,
          content: content,
          onOk() {
            deleteCategory(category);
          },
          onCancel() {},
        });
      }
    }
  };

  return (
    <Space
      size='middle'
      align='center'
      style={{ width: "100%", justifyContent: "space-evenly" }}
    >
      {/* how to pass param to event function */}
      {/* only show 'Sub category' in First Level */}
      {category.parentId === "0" && (
        <LinkButton onClick={() => showSubCategories(category)}>
          Sub Category
          {/* <FileTextOutlined /> */}
        </LinkButton>
      )}
      <LinkButton onClick={() => setShowModal(true)}>
        <EditOutlined style={{ fontSize: "1rem" }} />
      </LinkButton>
      <LinkButton onClick={() => showDelete(category._id, category.parentId)}>
        <DeleteOutlined style={{ fontSize: "1rem" }} />
      </LinkButton>

      <Modal
        title='Update Category'
        visible={showModal}
        onOk={() => updateCategory(category)}
        onCancel={() => setShowModal(false)}
        destroyOnClose={true}
      >
        <UpdateCategoryForm ref={formRef} categoryName={category.name} />
      </Modal>
    </Space>
  );
};

export default CategoryOption;
