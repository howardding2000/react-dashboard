import React, { useEffect, useState } from "react";
import { Card, Button, Table, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../../compoments/ui/LinkButton";

import "./category.less";
import { reqCategory } from "../../../api";

const Category = () => {
  const [category, setCategory] = useState();
  const title = "Category title";
  const extra = (
    <Button>
      <PlusOutlined />
      add
    </Button>
  );

  const getCategory = async (parentId) => {
    const { data } = await reqCategory(parentId);
    const category = data.data;
    console.log(category);
    setCategory(
      category.map((item) => {
        item.key = item._id;
        return { ...item, key: item._id };
      })
    );
  };

  useEffect(() => {
    getCategory("0");
  }, []);

  const columns = [
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

  return (
    <Card title={title} extra={extra}>
      <Table dataSource={category} columns={columns} bordered />
    </Card>
  );
};

export default Category;
