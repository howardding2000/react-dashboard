import React, { useEffect, useState, useRef, useContext } from "react";
import { Card, Button, Table, message, Modal } from "antd";
import { PAGE_SIZE } from "utils/constants";
import { reqRoles, reqAddRole, reqUpdateRole } from "api";
import AddRoleForm from "components/roles/AddRoleForm";
import SetRoleForm from "components/roles/SetRoleForm";
import { AuthContext } from "store/auth-context";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({});
  // showModalStatus: 1=> add role, 2=> update role
  const [showModalStatus, setShowModalStatus] = useState(0);
  const columnsRef = useRef();
  const formRef = useRef();
  const authCtx = useContext(AuthContext);

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

  const getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      setRoles(result.data);
    } else {
      message.error("Get roles failed.");
    }
  };

  const addRole = () => {
    formRef.current
      .validateFields()
      .then(async (values) => {
        const { roleName } = values;

        const result = await reqAddRole(roleName);

        if (result.status === 0) {
          message.success("Add successfully!");
          //go back to roles
          setShowModalStatus(0);
          setRoles((preRoles) => [...preRoles, result.data]);
        }
      })
      .catch((err) => {});
  };

  const updateRole = () => {
    formRef.current
      .validateFields()
      .then(async (values) => {
        const authName = authCtx.loggedInUser;
        const updatedRole = {
          ...role,
          menus: values.roleOptions,
          auth_name: authName,
        };

        const result = await reqUpdateRole(updatedRole);
        if (result.status === 0) {
          message.success("Update role successfully!");
          //go back to roles
          const newRole = result.data;
          setShowModalStatus(0);
          setRole(newRole);
          setRoles((preRoles) =>
            preRoles.map((role) => (role._id === newRole._id ? newRole : role))
          );
        } else {
          message.success("Update role fialed!");
        }
      })
      .catch((err) => {});
  };

  // handle Modal cancel event
  const modalCancel = () => {
    setShowModalStatus(0);
  };

  const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys, selectedRows) => setRole(selectedRows[0]),
    selectedRowKeys: [role._id],
  };

  const onRow = (role, rowIndex) => {
    return {
      onClick: (event) => {
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
          if (time) {
            const date = new Date(time);
            return <span>{date.toDateString()}</span>;
          } else {
            // Roles who are not yet authorized are shown 'waiting for authorization'
            return <span>Waiting for Authorization</span>;
          }
        },
      },
      {
        title: "Authorizer",
        key: "auth_name",
        dataIndex: "auth_name",
      },
    ];

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
        onCancel={modalCancel}
        destroyOnClose={true}
      >
        <AddRoleForm ref={formRef} />
      </Modal>

      <Modal
        title='Set Role'
        visible={showModalStatus === 2}
        onOk={updateRole}
        onCancel={modalCancel}
        destroyOnClose={true}
      >
        <SetRoleForm ref={formRef} role={role} onBack={() => getRoles()} />
      </Modal>
    </Card>
  );
};

export default Roles;
