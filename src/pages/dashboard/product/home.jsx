import React, { useState, useRef, useEffect, useCallback } from "react";
import { Card, Select, Input, Button, Table, message, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  reqProducts,
  reqSearchProduects,
  reqUpdateProduectStatus,
} from "api/index";
import { PAGE_SIZE } from "utils/constants";
import LinkButton from "components/ui/LinkButton";
import ProductOption from "components/product/ProductOption";

const ProductHome = () => {
  const [produces, setProduces] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const navigate = useNavigate();
  const columnsRef = useRef();
  const pageNumRef = useRef(1);
  const [form] = Form.useForm();

  const Option = Select.Option;
  const Search = Input.Search;
  const Item = Form.Item;

  const getProducts = useCallback(async (pageNum) => {
    pageNumRef.current = pageNum;

    setIsLoading(true);

    const reslut = await reqProducts(pageNum, PAGE_SIZE);

    setIsLoading(false);

    if (reslut.status === 0) {
      setProduces(reslut.data);
    } else {
      message.error("Fetch products fail!");
    }
  }, []);

  const searchProduct = async () => {
    const { searchType, searchName } = form.getFieldsValue();

    setIsLoading(true);

    const reslut = await reqSearchProduects({
      pageNum: produces.pageNum,
      pageSize: PAGE_SIZE,
      searchName,
      searchType,
    });

    setIsLoading(false);

    if (reslut.status === 0) {
      setProduces(reslut.data);
      setShowReturn(true);
    } else {
      message.error("Search products fail!");
    }
  };

  const updateProductStatus = async (productId, status) => {
    const newStatus = status === 1 ? 2 : 1;
    const result = await reqUpdateProduectStatus(productId, newStatus);

    if (result.status === 0) {
      message.success("Prodect Status updated!");
      getProducts(pageNumRef.current);
    }
  };

  const backToProduct = () => {
    getProducts(1);
    setShowReturn(false);
  };

  columnsRef.current = [
    {
      title: "Name",
      dataIndex: "name",
      // key: "name",
    },
    {
      title: "Description",
      dataIndex: "desc",
      // key: "desc",
    },
    {
      title: "Price",
      dataIndex: "price",
      // sorter: (a, b) => a.price - b.price,
      render: (price) => `$ ${price}`,
      // key: "price",
    },
    {
      title: "Status",
      // dataIndex: "status",
      width: 100,
      align: "center",
      render: (product) => {
        // status : 1=> On Sale, 2=> Sold Out
        const { status, _id } = product;
        return (
          <>
            <Button onClick={() => updateProductStatus(_id, status)}>
              {status === 1 ? "Sold Out" : "On Sale"}
            </Button>
            <span>{status === 1 ? "On Sale" : "Sold Out"}</span>
          </>
        );
      },
    },
    {
      title: "Option",
      width: 50,
      render: (product) => (
        <ProductOption
          product={product}
          onBack={() => getProducts(pageNumRef.current)}
        />
      ),
    },
  ];

  useEffect(() => {
    getProducts(1);
  }, [getProducts]);

  const title = (
    <Form
      form={form}
      initialValues={{
        searchType: "productName",
      }}
    >
      <Item name='searchType' noStyle>
        <Select>
          <Option value='productName'>Search by name</Option>
          <Option value='productDesc'>Search by description</Option>
        </Select>
      </Item>
      <Item name='searchName' noStyle>
        <Search
          className='product__search'
          placeholder='key word...'
          style={{ width: "15rem", margin: "0 5px" }}
          enterButton
          onSearch={() => searchProduct()}
        />
      </Item>
      {showReturn && (
        <Item name='backToProduct' noStyle>
          <LinkButton onClick={backToProduct}>Back to Product</LinkButton>
        </Item>
      )}
    </Form>
  );

  const extra = (
    <Button onClick={() => navigate("addupdate", { replace: true })}>
      <PlusOutlined />
      Add
    </Button>
  );

  return (
    <Card title={title} extra={extra}>
      <Table
        dataSource={produces?.list}
        columns={columnsRef.current}
        loading={isLoading}
        pagination={{
          pageSize: PAGE_SIZE,
          current: produces?.pageNum,
          total: produces?.total,
          showQuickJumper: true,
        }}
        rowKey='_id'
        bordered
        showQuickJumper
        onChange={(page) => getProducts(page.current)}
      />
    </Card>
  );
};

export default ProductHome;
