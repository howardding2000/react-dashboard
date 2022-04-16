import React, { useRef } from "react";
import { Form, Tree, Input, Button, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import menuList from "config/menu-config";
import { reqUserByRoleId, reqDeleteRole } from "api";

const Item = Form.Item;

const SetRoleForm = React.forwardRef(({ role, onBack }, ref) => {
  const { confirm, error } = Modal;
  const [form] = Form.useForm();
  ref.current = form;
  const roleOptionsRef = useRef([
    {
      title: "All",
      key: "all",
      children: menuList,
    },
  ]);

  const checkHandler = (checkedKeys, e) => {
    form.setFieldsValue({ roleOptions: checkedKeys });
  };

  const showDeleteRole = async (role) => {
    const user = await reqUserByRoleId(role._id);

    if (user.status === 0) {
      console.log(user);

      if (user.data) {
        error({
          title: `Can not delete role : [${role.name}]`,
          content: `Role [${role.name}] has users under it, please delete users under [${role.name}] before delete [${role.name}].`,
        });
      }

      if (!user.data) {
        console.log(role);
        confirm({
          title: "Do you want to delete this role?",
          icon: <ExclamationCircleOutlined />,
          content: "Caution: Once deleted, it CANNOT be recovered!",
          // centered: 'true',
          okType: "danger",
          onOk() {
            deleteRole(role._id);
          },
          onCancel() {
            console.log("Cancel");
          },
        });
      }
    }
  };

  const deleteRole = async (roldId) => {
    const result = await reqDeleteRole(role._id);

    if (result.status === 0) {
      message.success("Delete product successfully!");
      onBack();
    } else {
      console.log(result);
      message.error(`Delete product failed! ${result.msg}`);
    }
  };

  return (
    <Form form={form} initialValues={{ roleName: role.name }} preserve={false}>
      <Item label='Role Name'>
        <Item name='roleName' noStyle>
          <Input disabled style={{ width: "65%", marginRight: "1rem" }} />
        </Item>
        <Button
          type='primary'
          onClick={() => showDeleteRole(role)}
          disabled={!role._id}
        >
          Delete Role
        </Button>
      </Item>
      <Item name='roleOptions'>
        <Tree
          checkable
          defaultExpandAll='false'
          defaultCheckedKeys={role.menus}
          onCheck={checkHandler}
          treeData={roleOptionsRef.current}
        />
      </Item>
    </Form>
  );
});
export default SetRoleForm;
