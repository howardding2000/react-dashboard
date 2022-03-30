import React, { useCallback, useEffect, useState, useRef } from "react";
import { Card, Button, Table, Space, message, Modal } from "antd";
import {
  ArrowRightOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
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
  const selectedCategory = useRef();
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

  // fetch category list
  const getCategory = useCallback(
    async (id) => {
      setIsLoading(true);
      id = id || parentId;
      // send request and get result
      const result = await reqCategories(id);

      setIsLoading(false);

      if (result.status === 0) {
        const categories = result.data;

        // store first level category list
        if (id === "0") {
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
    },
    [parentId]
  );

  // Modal handler
  const openAddModal = () => setShowModalStatus(1);

  const showUpate = useCallback((category) => {
    // store category id and name for updating Modal
    selectedCategory.current = category;
    setShowModalStatus(2);
  }, []);

  const showDelete = async (id) => {
    // check if category has sub categories
    if (id) {
      const result = await reqCategories(id);
      if (result.status === 0) {
        console.log(result.data);
        let title;
        let content;
        if (result.data.length !== 0) {
          title = "This item has sub categories!";
          content = "Deleting this item will LOST ALL sub categories under it";
        } else {
          title = "Do you want to delete this category?";
          content = "OK to confirm";
        }

        Modal.confirm({
          title: title,
          icon: <ExclamationCircleOutlined />,
          content: content,
          onOk() {
            console.log("OK");
          },
          onCancel() {
            console.log("Cancel");
          },
        });
      }
    }
  };

  // add Category to Parent
  const addCategory = () => {
    // Form validation
    formRef.current
      .validateFields()
      .then(async (values) => {
        setShowModalStatus(0);

        const { categoryName, parentId: storedParentId } = values;

        const result = await reqAddCategory(categoryName, storedParentId);
        if (result.status === 0) {
          console.log(result.data);
          message.success("Add successfully!");
          //refresh categories
          if (storedParentId === parentId) {
            getCategory(parentId);
          }
        }
      })
      .catch((err) => {});
  };

  // update Category's name
  const updateCategory = (e) => {
    // Form validation
    formRef.current
      .validateFields()
      .then(async (values) => {
        setShowModalStatus(0);

        const categoryId = selectedCategory.current._id;
        const { categoryName } = values;

        const result = await reqUpdateCategory({ categoryId, categoryName });
        if (result.status === 0) {
          message.success("Update successfully!");
          //reflesh categories
          getCategory(parentId);
        }
      })
      .catch((err) => {});
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
            <LinkButton onClick={() => showUpate(category)}>Update</LinkButton>
            <LinkButton onClick={() => showDelete(category._id)}>
              Delete
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

    getCategory(parentId);
  }, [parentId, showUpate, getCategory]);

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
        <AddCategoryForm
          ref={formRef}
          categories={categories}
          parentId={parentId}
        />
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
          categoryName={
            selectedCategory.current ? selectedCategory.current.name : ""
          }
        />
      </Modal>
    </Card>
  );
};

export default Category;
