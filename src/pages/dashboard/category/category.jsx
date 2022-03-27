import React, { useCallback, useEffect, useState, useRef } from "react";
import { Card, Button, Table, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../../compoments/ui/LinkButton";

import "./category.less";
import { reqCategories } from "../../../api/index";

const Category = () => {
  const [categories, setCategories] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const columnsRef = useRef();
  const title = "Category title";
  const extra = (
    <Button>
      <PlusOutlined />
      add
    </Button>
  );

  const getCategory = async (parentId) => {
    const result = await reqCategories(parentId);
    if (result.status === 0) {
      const categories = result.data;
      console.log(categories);
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
        render: () => (
          <Space size='middle'>
            <LinkButton>Update</LinkButton>
            <LinkButton>Sub Category</LinkButton>
          </Space>
        ),
      },
    ];
  }, []);

  useEffect(() => {
    initColumns();
    getCategory("0");
    setIsLoading(false);
  }, [initColumns]);

  return (
    <Card title={title} extra={extra}>
      <Table
        dataSource={categories}
        columns={columnsRef.current}
        bordered
        pagination={{ defaultPageSize: 10, showQuickJumper: true }}
      />
    </Card>
  );
};

export default Category;
