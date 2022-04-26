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

const CategoryOption = ({ category, setParent, getCategory }) => {
  // showModalStatus: 0 = not show ,1 = show 'Add Category',2 = show 'Update Category'
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef();
  const showUpate = () => {
    // store category id and name for updating Modal
    setShowModal(true);
  };

  // show sub category list
  const showSubCategories = (category) => {
    // update state
    setParent({ parentId: category._id, parentName: category.name });
  };

  // handle Modal cancel event
  const handleCancel = () => {
    setShowModal(false);
  };
  // delete category and it's sub categories by id
  const deleteCategory = async (id) => {
    const result = await reqDeleteCategory(id);
    if (result.status === 0) {
      message.success("Delete successfully!");
      getCategory(category.parentId);
    } else {
    }
  };

  // update Category's name
  const updateCategory = (category) => {
    // Form validation
    formRef.current
      .validateFields()
      .then(async (values) => {
        setShowModal(false);

        const categoryId = category._id;
        const { categoryName } = values;

        const result = await reqUpdateCategory({ categoryId, categoryName });
        if (result.status === 0) {
          message.success("Update successfully!");
          //reflesh categories
          getCategory(category.parentId);
        }
      })
      .catch((err) => {});
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
            deleteCategory(id);
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
      <LinkButton onClick={() => showUpate(category)}>
        <EditOutlined style={{ fontSize: "1rem" }} />
      </LinkButton>
      <LinkButton onClick={() => showDelete(category._id)}>
        <DeleteOutlined style={{ fontSize: "1rem" }} />
      </LinkButton>

      <Modal
        title='Update Category'
        visible={showModal}
        onOk={updateCategory}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <UpdateCategoryForm ref={formRef} categoryName={category.name} />
      </Modal>
    </Space>
  );
};

export default CategoryOption;
