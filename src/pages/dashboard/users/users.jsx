import React, { useState, useRef, useEffect, useCallback } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { PAGE_SIZE } from "utils/constants";
import { formatDate } from "utils/utils";
import LinkButton from "components/ui/LinkButton";
import { reqUsers } from "api";

import "./users.less";

const Users = () => {
  const [showModalStatus, setShowModalStatus] = useState(0);
  const [users, setUsers] = useState([]);
  // const rolesRef = useRef(new Map());
  const [rolesMap, setRolesMap] = useState(new Map());
  const columnsRef = useRef();

  const initRoles = useCallback(
    (roles) => {
      if (rolesMap.size === 0) {
        const rolesMap = roles.reduce(
          (pre, role) => pre.set(role._id, role.name),
          new Map()
        );
        console.log(rolesMap);
        setRolesMap(rolesMap);
      }
    },
    [rolesMap.size]
  );

  const getUsers = useCallback(async () => {
    const result = await reqUsers();
    if (result.status === 0) {
      const { users, roles } = result.data;
      setUsers(users);
      initRoles(roles);
    } else {
      message.error("Failed to get user, please try later.");
    }
  }, [initRoles]);

  // Modal handler
  const openAddModal = () => setShowModalStatus(1);
  const openUpdateModal = () => setShowModalStatus(2);

  const title = (
    <Button type='primary' onClick={openAddModal}>
      Add User
    </Button>
  );

  // handle Modal cancel event
  const handleCancel = () => {
    setShowModalStatus(0);
  };

  const addOrUptateUser = (user) => {
    console.log(user);
  };

  // load Category data and Initialize the Table
  useEffect(() => {
    // Initialize columns of <Table>, and stroe it into a Ref. Because it will remain constant throughout the life of the component
    columnsRef.current = [
      {
        title: "Name",
        dataIndex: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Phone",
        dataIndex: "phone",
      },
      {
        title: "Create Time",
        dataIndex: "create_time",
        render: formatDate,
      },
      {
        title: "Role",
        dataIndex: "role_id",
        render: (roleId) => {
          console.log(rolesMap);
          return rolesMap.get(roleId);
        },
      },
      {
        title: "Option",
        render: (user) => (
          <span>
            <LinkButton onClick={openUpdateModal}>Update</LinkButton>
            {` `}
            <LinkButton>Delete</LinkButton>
          </span>
        ),
      },
    ];
    getUsers();
  }, [getUsers, rolesMap]);

  return (
    <Card title={title}>
      <Table
        dataSource={users}
        columns={columnsRef.current}
        // loading={isLoading}
        rowKey='_id'
        bordered
        pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
      />

      <Modal
        title={showModalStatus === 1 ? "Add User" : "Update User"}
        visible={showModalStatus !== 0}
        onOk={addOrUptateUser}
        onCancel={handleCancel}
        destroyOnClose={true}
        centered
      ></Modal>
    </Card>
  );
};

export default Users;
