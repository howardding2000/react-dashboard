import React from "react";
import { Form, Input } from "antd";
const Item = Form.Item;

const AddRoleForm = React.forwardRef((props, ref) => {
  const [form] = Form.useForm();
  ref.current = form;
  return (
    <Form form={form}>
      <Item
        name='roleName'
        label='Role name'
        required
        rules={[{ required: true, message: "Please enter role name!" }]}
      >
        <Input />
      </Item>
    </Form>
  );
});

export default AddRoleForm;
