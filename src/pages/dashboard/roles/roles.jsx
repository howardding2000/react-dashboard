import React, { useEffect, useState, useRef } from "react";
import { Card, Button, Table, message, Modal } from "antd";
import { PAGE_SIZE } from "utils/constants";
import { reqRoles } from "api";
import AddRoleForm from "components/roles/AddRoleForm";
import UpdateRoleForm from "components/roles/UpdateRoleForm";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({});
  // showModalStatus: 1=> add role, 2=> update role
  const [showModalStatus, setShowModalStatus] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  const columnsRef = useRef();
  const formRef = useRef();

  const title = (
    <span className='users__title'>
      <Button type='primary' onClick={() => setShowModalStatus(1)}>
        Add Role
      </Button>
      <Button
        type='primary'
        onClick={() => setShowModalStatus(2)}
        disabled={!role._id}
      >
        Set Role
      </Button>
    </span>
  );

  // handle Modal cancel event
  const handleCancel = () => {
    setShowModalStatus(0);
  };

  const addRole = () => {
    formRef.current
    .validateFields()
    .then(async (values) => {
      setShowModalStatus(0);
      
      const { roleName } = values;
      console.log("addRole",roleName);

        // const result = await reqAddCategory(categoryName, storedParentId);
        // if (result.status === 0) {
        //   message.success("Add successfully!");
        //   //refresh categories
        //   if (storedParentId === parentId) {
        //     getCategory(parentId);
        //   }
        // }
      })
      .catch((err) => {});
  };
  const updateRole = () => {
    console.log("UpdateRole");
    formRef.current
    .validateFields()
    .then(async (values) => {
      setShowModalStatus(0);
      
      const { roleName } = values;
      console.log("updateRole",roleName);

        // const result = await reqAddCategory(categoryName, storedParentId);
        // if (result.status === 0) {
        //   message.success("Add successfully!");
        //   //refresh categories
        //   if (storedParentId === parentId) {
        //     getCategory(parentId);
        //   }
        // }
      })
      .catch((err) => {});

  };
  const rowSelection = {
    type: "radio",
    selectedRowKeys: [role._id],
  };

  const onRow = (role, rowIndex) => {
    return {
      onClick: (event) => {
        console.log("row click", role);
        setRole(role);
      },
    };
  };

  useEffect(() => {
    columnsRef.current = [
      {
        title: "Name",
        key: "name",
        dataIndex: "name",
      },
      {
        title: "Creation time",
        key: "create_time",
        dataIndex: "create_time",
        render: (time) => {
          const date = new Date(time);
          return <span>{date.toDateString()}</span>;
        },
      },
      {
        title: "Authorization time",
        key: "auth_time",
        dataIndex: "auth_time",
        render: (time) => {
          const date = new Date(time);
          return <span>{date.toDateString()}</span>;
        },
      },
      {
        title: "Authorizer",
        key: "auth_name",
        dataIndex: "auth_name",
      },
    ];

    const getRoles = async () => {
      const result = await reqRoles();
      if (result.status === 0) {
        setRoles(result.data);
      } else {
        message.error("Get roles failed.");
      }
    };

    getRoles();
  }, []);
  return (
    <Card title={title}>
      <Table
        onRow={onRow}
        dataSource={roles}
        columns={columnsRef.current}
        // loading={isLoading}
        rowSelection={rowSelection}
        rowKey='_id'
        bordered
        pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
      ></Table>

      <Modal
        title='Add Role'
        visible={showModalStatus === 1}
        onOk={addRole}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <AddRoleForm ref={formRef} />
      </Modal>

      <Modal
        title='Set Role'
        visible={showModalStatus === 2}
        onOk={updateRole}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <UpdateRoleForm ref={formRef} roleName={role?.name} />
      </Modal>
    </Card>
  );
};

export default Roles;
