import React, { useCallback, useEffect, useState, useRef } from "react";
import { Card, Button, Table, Space, message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../../compoments/ui/LinkButton";

import "./category.less";
import { reqCategories } from "../../../api/index";

const Category = () => {
  const [categories, setCategories] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [parent, setParent] = useState({ parentId: "0", parentName: "" });
  const columnsRef = useRef();

  const extra = (
    <Button>
      <PlusOutlined />
      add
    </Button>
  );

  const showSubCategories = (category) => {
    // update state
    setParent({ parentId: category._id, parentName: category.name });
  };

  const showCategories = () => {
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
      setCategories(
        categories.map((item) => {
          item.key = item._id;
          return { ...item, key: item._id };
        })
      );
    } else {
      message.error("Fetch categories error!");
    }
  };

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
            <LinkButton>Update</LinkButton>
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
  }, [parent.parentId]);

  useEffect(() => {
    initColumns();
    getCategory(parent.parentId);
  }, [initColumns, parent]);

  const title = parent.parentName ? (
    <>
      <LinkButton onClick={showCategories}>
        First level category list
      </LinkButton>{" "}
      <ArrowRightOutlined style={{ fontSize: "0.8rem", margin: "2px 2px" }} />
      {parent.parentName}
    </>
  ) : (
    "First level category list"
  );

  return (
    <Card title={title} extra={extra}>
      <Table
        dataSource={categories}
        columns={columnsRef.current}
        loading={isLoading}
        bordered
        pagination={{ defaultPageSize: 10, showQuickJumper: true }}
      />
    </Card>
  );
};

export default Category;
