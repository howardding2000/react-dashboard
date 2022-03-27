import React from "react";
import { Card, Button, Table, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../../compoments/ui/LinkButton";

import "./category.less";

const Category = () => {
  const title = "Category title";
  const extra = (
    <Button>
      <PlusOutlined />
      add
    </Button>
  );

  const dataSource = [
    {
      _id: "5e12b8bce31bb727e4b0e348",
      parentId: "0",
      name: "家用电器",
      __v: 0,
    },
    {
      _id: "5e130e60e31bb727e4b0e34b",
      parentId: "0",
      name: "手机",
      __v: 0,
    },
    {
      _id: "5e130ec7e31bb727e4b0e34c",
      parentId: "0",
      name: "洗衣机",
      __v: 0,
    },
    {
      _id: "5e1346533ed02518b4db0cd7",
      parentId: "0",
      name: "图书",
      __v: 0,
    },
    {
      _id: "5e13467e3ed02518b4db0cd8",
      parentId: "0",
      name: "杯具",
      __v: 0,
    },
    {
      _id: "5e144dc7297c1138787e96ab",
      parentId: "0",
      name: "服装",
      __v: 0,
    },
    {
      _id: "5e144de1297c1138787e96ac",
      parentId: "0",
      name: "玩具",
      __v: 0,
    },
    {
      _id: "5e16e37e49dc6b38d018fe28",
      parentId: "0",
      name: "手机",
      __v: 0,
    },
    {
      _id: "5fc0bf33eb957f1b94f4a959",
      parentId: "0",
      name: "医药",
      __v: 0,
    },
    {
      _id: "5fc0bfa4eb957f1b94f4a95a",
      parentId: "0",
      name: "食品",
      __v: 0,
    },
    {
      _id: "5fc0bfd7eb957f1b94f4a95c",
      parentId: "0",
      name: "水果",
      __v: 0,
    },
    {
      _id: "5fc0bfdeeb957f1b94f4a95d",
      parentId: "0",
      name: "发饰",
      __v: 0,
    },
  ];

  const dataSourceKey = dataSource.map((item) => {
    item.key = item._id;
    return item;
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width:"65%",
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
      <Table dataSource={dataSourceKey} columns={columns} bordered/>
    </Card>
  );
};

export default Category;
