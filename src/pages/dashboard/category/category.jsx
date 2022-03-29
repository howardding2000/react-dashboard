import React, { useCallback, useEffect, useState, useRef } from "react";
import { Card, Button, Table, Space, message, Modal } from "antd";
import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../../compoments/ui/LinkButton";
import AddCategoryForm from "../../../compoments/dashboard/content/AddCategoryForm";
import UpdateCategoryForm from "../../../compoments/dashboard/content/UpdateCategoryForm";
import {
  reqCategories,
  reqUpdateCategory,
  reqAddCategory,
} from "../../../api/index";

import "./category.less";

const Category = () => {
  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [{ parentId, parentName }, setParent] = useState({
    parentId: "0",
    parentName: "",
  });
  // showModalStatus: 0 = not show ,1 = show 'Add Category',2 = show 'Update Category'
  const [showModalStatus, setShowModalStatus] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState();
  const catRef = useRef();
  const columnsRef = useRef();
  const formRef = React.createRef();

  // show first level category list
  const showCategories = () => {
    // update state
    setParent({ parentId: "0", parentName: "" });
  };

  // show sub category list
  const showSubCategories = (category) => {
    // update state
    setParent({ parentId: category._id, parentName: category.name });
  };

  // Modal handler
  const openAddModal = () => setShowModalStatus(1);

  const showUpateModal = useCallback((category) => {
    // store category id and name for updating Modal
    setSelectedCategory(category);
    setShowModalStatus(2);
  }, []);


  const addCategory = () => {
    setShowModalStatus(0);
  };

  // update Category's name
  const updateCategory = async (e) => {
    setShowModalStatus(0);

    const categoryId = selectedCategory._id;
    const categoryName = formRef.current.getFieldValue("cat_name");

    const result = await reqUpdateCategory({ categoryId, categoryName });
    if (result.status === 0) {
      message.info("Update successfully!");
      //reflesh categories
      showCategories();
    }
  };

  // handle Modal cancel event
  const handleCancel = () => {
    setShowModalStatus(0);
  };

  // load Category data and Initialize the Table
  useEffect(() => {
    
  // Initialize columns of <Table>, and stroe it into a Ref. Because it will remain constant throughout the life of the component
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
            {/* only show 'Sub category' in First Level */}
            {parentId === "0" && (
              <LinkButton onClick={() => showSubCategories(category)}>
                Sub Category
              </LinkButton>
            )}
          </Space>
        ),
      },
    ];

    // fetch category list
    const getCategory = async (id) => {
      setIsLoading(true);

      // send request and get result
      const result = await reqCategories(id);

      setIsLoading(false);

      if (result.status === 0) {
        const categories = result.data;

        // store first level category list
        if (parentId === "0") {
          setCategories(
            categories.map((item) => {
              item.key = item._id;
              return { ...item, key: item._id };
            })
          );
        } else {
          // store sub category list
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

    getCategory(parentId);
    
  }, [parentId]);

  // Card title and extra setup
  const title = parentName ? (
    <>
      <LinkButton onClick={showCategories}>
        First level category list
      </LinkButton>{" "}
      <ArrowRightOutlined style={{ fontSize: "0.8rem", margin: "2px 2px" }} />
      {parentName}
    </>
  ) : (
    "First level category list"
  );

  // set +Add Button
  const extra = (
    <Button onClick={openAddModal}>
      <PlusOutlined />
      Add
    </Button>
  );

  return (
    <Card title={title} extra={extra}>
      <Table
        dataSource={parentId === "0" ? categories : subCategories}
        columns={columnsRef.current}
        loading={isLoading}
        bordered
        pagination={{ defaultPageSize: 10, showQuickJumper: true }}
      />

      <Modal
        title='Add Category'
        visible={showModalStatus === 1}
        onOk={addCategory}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <AddCategoryForm categories={categories} parentId={parentId} />
      </Modal>

      <Modal
        title='Update Category'
        visible={showModalStatus === 2}
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
