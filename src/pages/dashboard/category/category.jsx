import React, { useCallback, useEffect, useState, useRef } from "react";
import { Card, Button, Table, Space, message, Modal } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../../compoments/ui/LinkButton";
import AddCategoryForm from "../../../compoments/dashboard/content/AddCategoryForm";
import UpdateCategoryForm from "../../../compoments/dashboard/content/UpdateCategoryForm";
import "./category.less";
import {
  reqCategories,
  reqUpdateCategory,
  reqAddCategory,
} from "../../../api/index";

const Category = () => {
  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [parent, setParent] = useState({ parentId: "0", parentName: "" });
  // showStatus: 0 = not show ,1 = show 'Add Category',2 = show 'Update Category'
  const [showStatus, setShowStatus] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState();
  const columnsRef = useRef();

  const formRef = React.createRef();

  const showSubCategories = (category) => {
    // update state
    setParent({ parentId: category._id, parentName: category.name });
  };

  // get First level category list
  const getCategories = () => {
    // update state
    setParent({ parentId: "0", parentName: "" });
  };

  const getCategory = async (parentId) => {
    setIsLoading(true);
    const result = await reqCategories(parentId);
    setIsLoading(false);
    if (result.status === 0) {
      // get category list
      const categories = result.data;
      if (parentId === "0") {
        setCategories(
          categories.map((item) => {
            item.key = item._id;
            return { ...item, key: item._id };
          })
        );
      } else {
        setSubCategories(
          categories.map((item) => {
            item.key = item._id;
            return { ...item, key: item._id };
          })
        );
      }
    } else {
      message.error("Fetch categories error!");
    }
  };

  const openAddModel = () => setShowStatus(1);

  const showUpateModal = useCallback((category) => {
    setSelectedCategory(category);
    // formRef.current.setFildsValue({ cat_name: category.name });
    // formRef.current.categoryId = category._id;
    setShowStatus(2);
  }, []);

  const extra = (
    <Button onClick={openAddModel}>
      <PlusOutlined />
      Add
    </Button>
  );

  const initColumns = useCallback(() => {
    columnsRef.current = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "65%",
      },
      {
        title: "Action",
        key: "action",
        render: (category) => (
          <Space size='middle'>
            <LinkButton onClick={() => showUpateModal(category)}>
              Update
            </LinkButton>
            {/* how to pass param to event function */}
            {parent.parentId === "0" && (
              <LinkButton onClick={() => showSubCategories(category)}>
                Sub Category
              </LinkButton>
            )}
          </Space>
        ),
      },
    ];
  }, [parent.parentId, showUpateModal]);

  const addCategory = () => {
    setShowStatus(0);
  };

  // update Category
  const updateCategory = async (e) => {
    console.log(formRef);
    setShowStatus(0);
    const categoryId = selectedCategory._id;
    const categoryName = formRef.current.getFieldValue("cat_name");
    console.log(categoryId, categoryName);
    const result = await reqUpdateCategory({ categoryId, categoryName });
    if (result.status === 0) {
      console.log("updat successfully!");
      //reflesh categories
      getCategories();
    }
  };

  const handleCancel = () => {
    setShowStatus(0);
  };

  useEffect(() => {
    initColumns();
    getCategory(parent.parentId);
  }, [initColumns, parent]);

  const title = parent.parentName ? (
    <>
      <LinkButton onClick={getCategories}>First level category list</LinkButton>{" "}
      <ArrowRightOutlined style={{ fontSize: "0.8rem", margin: "2px 2px" }} />
      {parent.parentName}
    </>
  ) : (
    "First level category list"
  );

  return (
    <Card title={title} extra={extra}>
      <Table
        dataSource={parent.parentId === "0" ? categories : subCategories}
        columns={columnsRef.current}
        loading={isLoading}
        bordered
        pagination={{ defaultPageSize: 10, showQuickJumper: true }}
      />

      <Modal
        title='Add Category'
        visible={showStatus === 1}
        onOk={addCategory}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <AddCategoryForm categories={categories} parentId={parent.parentId} />
      </Modal>

      <Modal
        title='Update Category'
        visible={showStatus === 2}
        onOk={updateCategory}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <UpdateCategoryForm
          ref={formRef}
          categoryName={selectedCategory ? selectedCategory.name : ""}
        />
      </Modal>
    </Card>
  );
};

export default Category;
