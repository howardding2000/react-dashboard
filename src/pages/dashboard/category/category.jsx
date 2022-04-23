import React, { useCallback, useEffect, useState, useRef } from "react";
import { Card, Button, Table, message, Modal } from "antd";
import {
  ArrowRightOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import LinkButton from "components/ui/LinkButton";
import AddCategoryForm from "components/category/AddCategoryForm";
import {
  reqCategories,
  reqAddCategory,
} from "api/index";
import { PAGE_SIZE } from "utils/constants";
import "./category.less";
import CategoryOption from "components/category/CategoryOption";

const Category = () => {
  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState();
  const [showModalStatus, setShowModalStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [{ parentId, parentName }, setParent] = useState({
    parentId: "0",
    parentName: "",
  });

  const columnsRef = useRef();
  const formRef = useRef();

  // show first level category list
  const showCategories = () => {
    // update state
    setParent({ parentId: "0", parentName: "" });
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
          message.success("Add successfully!");
          //refresh categories
          if (storedParentId === parentId) {
            getCategory(parentId);
          }
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
      },
      {
        title: "Option",
        key: "option",
        width: "14rem",
        render: (category) => (
          <CategoryOption
            category={category}
            setParent={setParent}
            getCategory={getCategory}
          />
        ),
      },
    ];

    getCategory(parentId);
  }, [parentId, getCategory]);

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
        pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
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

    </Card>
  );
};

export default Category;
