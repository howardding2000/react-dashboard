import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Card, Button, Table, Modal, message, Space } from "antd";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { PAGE_SIZE } from "utils/constants";
import { formatDate } from "utils/utils";
import LinkButton from "components/ui/LinkButton";
import { reqUsers, reqDeleteUser, reqAddUser, reqUpdateUser } from "api";
import AddOrUpdateUserForm from "components/users/AddOrUpdateUserForm";
import UserOption from "components/users/UserOption";

const Users = () => {
  const [showModalStatus, setShowModalStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const rolesRef = useRef(new Map());
  const userRef = useRef();
  const columnsRef = useRef();
  const formRef = useRef();

  /**
   * fetch users from database,statue:0=sccusse, status:1=fail
   */
  const getUsers = useCallback(async () => {
    setIsLoading(true);
    const result = await reqUsers();
    setIsLoading(false);
    if (result.status === 0) {
      const { users, roles } = result.data;
      if (rolesRef.current.size === 0) {
        const rolesMap = roles.reduce(
          (pre, role) => pre.set(role._id, role.name),
          new Map()
        );
        // console.log(rolesMap);
        rolesRef.current = rolesMap;
      }
      setUsers(users);
    } else {
      message.error("Failed to get user, please try later.");
    }
  }, []);

  /**
   * Initialize columns of <Table>, and stroe it into a Ref.
   * Because it will remain constant throughout the life of the component
   */
  columnsRef.current = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
        responsive: ["sm"],
      },
      {
        title: "Phone",
        dataIndex: "phone",
        responsive: ["md"],
      },
      {
        title: "Create Time",
        dataIndex: "create_time",
        responsive: ["lg"],
        render: formatDate,
      },
      {
        title: "Role",
        dataIndex: "role_id",
        render: (roleId) => {
          return rolesRef.current.get(roleId);
        },
      },
      {
        title: "Option",
        render: (user) => (
          <UserOption
            user={user}
            setUsers={setUsers}
            openUpdateModal={openUpdateModal}
          />
        ),
      },
    ],
    []
  );

  // Add and update user modal handler
  const openAddModal = () => {
    userRef.current = null;
    setShowModalStatus(1);
  };
  const openUpdateModal = (user) => {
    userRef.current = user;
    setShowModalStatus(2);
  };

  // handle Modal cancel event
  const handleCancel = () => {
    setShowModalStatus(0);
  };
  const onOK = () => {
    formRef.current.submit();
  };

  /**
   * Add or update user to database.
   * If userRef.current has value, it's a update request.
   * If not, it's an add request.
   */
  const addOrUptateUser = async () => {
    console.log(formRef.current.getFieldsValue());

    const user = formRef.current.getFieldsValue();
    if (userRef.current) {
      const updatedUser = { ...userRef.current, ...user };
      const result = await reqUpdateUser(updatedUser);
      if (result.status === 0) {
        message.success("Update user successfully.");
      } else {
        message.error("Update user failed.");
      }
    } else {
      const result = await reqAddUser(user);
      console.log(result);
      if (result.status === 0) {
        message.success("Add user successfully.");
      } else {
        message.error("Add user failed.");
      }
    }
    setShowModalStatus(0);
    getUsers();
  };

  // load Category data and Initialize the Table
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const title = (
    <Button type='primary' onClick={openAddModal}>
      Add User
    </Button>
  );

  return (
    <Card title={title} style={{ height: "100%" }}>
      <Table
        dataSource={users}
        columns={columnsRef.current}
        loading={isLoading}
        rowKey='_id'
        bordered
        pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
      />

      <Modal
        title={showModalStatus === 1 ? "Add User" : "Update User"}
        visible={showModalStatus !== 0}
        onOk={onOK}
        onCancel={handleCancel}
        destroyOnClose={true}
        centered
      >
        <AddOrUpdateUserForm
          user={userRef.current}
          onSubmit={addOrUptateUser}
          rolesMap={rolesRef.current}
          ref={formRef}
        />
      </Modal>
    </Card>
  );
};

export default Users;
