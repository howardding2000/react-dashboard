import React, { useState, useRef, useEffect, useCallback } from "react";
import { Card, Select, Input, Button, Table, message, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../../compoments/ui/LinkButton";
import { reqProducts, reqSearchProduects } from "../../../api/index";

import "./home.less";

const ProductHome = () => {
  const [produces, setProduces] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const columnsRef = useRef();

  const [form] = Form.useForm();

  const showDetial = (product) => {};
  const showUpdate = (product) => {};

  const Option = Select.Option;
  const Search = Input.Search;
  const Item = Form.Item;

  const PAGE_SIZE = 10;

  const getProducts = useCallback(async (pageNum) => {
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
    console.log(searchType, searchName);
    setIsLoading(true);

    const reslut = await reqSearchProduects({
      pageNum: produces.pageNum,
      pageSize: produces.pageSize,
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

  const backToProduct = () => {
    getProducts(1);
    setShowReturn(false);
  };

  useEffect(() => {
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
        sorter: (a, b) => a.price - b.price,
        render: (price) => `$ ${price}`,
        // key: "price",
      },
      {
        title: "Status",
        dataIndex: "status",
        width: 100,
        align: "center",
        render: (status) => {
          // status : 1=> On Sale, 2=> Sold Out
          if (status === 1) {
            return (
              <>
                <Button>Sold Out</Button>
                <span>On sale</span>
              </>
            );
          }
          if (status === 2) {
            return (
              <>
                <Button>On sale</Button>
                <div>Sold Out</div>
              </>
            );
          }
        },
      },
      {
        title: "Option",
        width: 50,
        render: (product) => (
          <>
            <div>
              <LinkButton onClick={() => showDetial(product)}>
                Detail
              </LinkButton>
            </div>
            <div>
              <LinkButton onClick={() => showUpdate(product)}>
                Update
              </LinkButton>
            </div>
          </>
        ),
      },
    ];

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
    <Button onClick={{}}>
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
