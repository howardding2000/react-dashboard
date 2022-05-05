import React from "react";
import { Modal, message, Space } from "antd";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { reqDeleteUser } from "api";
import LinkButton from "components/ui/LinkButton";

const UserOption = ({ user,setUsers,openUpdateModal }) => {
  //Show delete confirm Modal. If OK, delete user from database;
  const showDeleteUserConfirm = (user) => {
    Modal.confirm({
      title: `Are you sure delete user: [${user.username}] ?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      destroyOnClose: "true",
      cancelText: "No",
      async onOk() {
        const result = await reqDeleteUser(user._id);
        if (result.status === 0) {
          message.success("User was successfully deleted.");
          setUsers((preUsers) => {
            const index = preUsers.findIndex((item) => item._id === user._id);
            if (index === -1) {
              return preUsers;
            }
            const users = [...preUsers];
            users.splice(index, 1);
            return users;
          });
        } else {
          message.error("Failed to delete user, please try agan.");
        }
      },
      onCancel() {},
    });
  };

  return (
    <Space size='middle' align='center'>
      <LinkButton onClick={() => openUpdateModal(user)}>
        <EditOutlined style={{ fontSize: "1rem" }} />
      </LinkButton>
      <LinkButton onClick={() => showDeleteUserConfirm(user)}>
        <DeleteOutlined style={{ fontSize: "1rem" }} />
      </LinkButton>
    </Space>
  );
};

export default UserOption;
