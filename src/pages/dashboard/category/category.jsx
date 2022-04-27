import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  // useReducer,
} from "react";
import { Card, Button, Table, message, Modal } from "antd";
import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import LinkButton from "components/ui/LinkButton";
import AddCategoryForm from "components/category/AddCategoryForm";
import { reqCategories, reqAddCategory } from "api/index";
import { PAGE_SIZE } from "utils/constants";
import CategoryOption from "components/category/CategoryOption";

// const initCategoryState = {
//   categories: [],
//   subCategories: [],
//   showModalStatus: 0,
//   isLoading: false,
//   parentId: "0",
//   parentName: "",
// };

// const categoryReducer =(state,action)=>{
//   switch(action.type){

//     default:
//       return initCategoryState;
//   }
// }

const Category = () => {
  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [{ parentId, parentName }, setParent] = useState({
    parentId: "0",
    parentName: "",
  });

  // const [categoryState, dispatchCategory] = useReducer(
  //   categoryReducer,
  //   initCategoryState
  // );

  const columnsRef = useRef();
  const formRef = useRef();

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
          setCategories(categories);
        } else {
          // store sub category list
          setSubCategories(categories);
        }
      } else {
        message.error("Fetch categories error!");
      }
    },
    [parentId]
  );

  // Modal handler
  const openAddModal = () => setShowModal(true);

  // add Category to Parent
  const addCategory = () => {
    // Form validation
    formRef.current
      .validateFields()
      .then(async (values) => {
        setShowModal(false);

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
    setShowModal(false);
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
            setCategories={setCategories}
            setSubCategories={setSubCategories}
          />
        ),
      },
    ];

    getCategory(parentId);
  }, [parentId, getCategory]);

  // Card title and extra setup
  const title = parentName ? (
    <>
      <LinkButton onClick={() => setParent({ parentId: "0", parentName: "" })}>
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
    <Card title={title} extra={extra} style={{ height: "100%" }}>
      <Table
        dataSource={parentId === "0" ? categories : subCategories}
        columns={columnsRef.current}
        loading={isLoading}
        rowKey='_id'
        bordered
        pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
      />
      <Modal
        title='Add Category'
        visible={showModal}
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
