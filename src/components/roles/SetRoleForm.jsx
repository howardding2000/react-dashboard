import React, { useRef } from "react";
import { Form, Tree, Input } from "antd";
import menuList from "config/menu-config";

const Item = Form.Item;

const SetRoleForm = React.forwardRef(({ role }, ref) => {
  const [form] = Form.useForm();
  ref.current = form;
  const roleOptionsRef = useRef([
    {
      title: "All",
      key: "all",
      children: menuList,
    },
  ]);
  const checkedKeysRef = useRef(role.menus);

  const checkHandler = (checkedKeys, e) => {
    checkedKeysRef.current = checkedKeys;
    form.setFieldsValue({ roleOptions: checkedKeys });
  };

  return (
    <Form form={form} initialValues={{ roleName: role.name }} preserve={false}>
      <Item name='roleName' label='Role Name'>
        <Input disabled />
      </Item>
      <Item name='roleOptions'>
        <Tree
          checkable
          defaultExpandAll='false'
          defaultCheckedKeys={checkedKeysRef.current}
          onCheck={checkHandler}
          treeData={roleOptionsRef.current}
        />
      </Item>
    </Form>
  );
});
export default SetRoleForm;
